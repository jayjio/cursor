// Serve widget files from .output/public/widget/
// This route serves the widget files that are copied to .output/public/widget/ during build
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineEventHandler((event) => {
  const file = getRouterParam(event, '_')
  
  // Only allow specific widget files for security
  if (!file || !file.match(/^(jeremy-chat-widget\.iife\.js|nuxt-app\.css)$/)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found'
    })
  }

  try {
    // Calculate paths - server code is in .output/server/chunks/routes/widget/
    // Public files are in .output/public/widget/
    // So we need to go up from server to .output, then into public
    const routesDir = dirname(__dirname) // .output/server/chunks/routes
    const chunksDir = dirname(routesDir) // .output/server/chunks
    const serverDir = dirname(chunksDir) // .output/server
    const outputDir = dirname(serverDir) // .output
    const publicDir = join(outputDir, 'public')
    const widgetDir = join(publicDir, 'widget')
    const filePath = join(widgetDir, file)
    
    // Try the calculated path first
    if (!existsSync(filePath)) {
      // Fallback: try relative to process.cwd() (might be different on Vercel)
      const altPaths = [
        join(process.cwd(), '.output', 'public', 'widget', file),
        join(process.cwd(), 'public', 'widget', file),
        join('/var/task', '.output', 'public', 'widget', file), // Vercel Lambda path
        join('/var/task', 'public', 'widget', file),
      ]
      
      let found = false
      for (const altPath of altPaths) {
        if (existsSync(altPath)) {
          const fileContent = readFileSync(altPath)
          setHeaders(event, file, fileContent)
          return fileContent
        }
      }
      
      throw new Error(`File not found. Tried: ${filePath} and ${altPaths.join(', ')}`)
    }
    
    const fileContent = readFileSync(filePath)
    setHeaders(event, file, fileContent)
    return fileContent
  } catch (error: any) {
    console.error('Error serving widget file:', error.message)
    console.error('File requested:', file)
    console.error('Current working directory:', process.cwd())
    console.error('__dirname:', __dirname)
    throw createError({
      statusCode: 404,
      statusMessage: `File not found: ${file}`
    })
  }
})

function setHeaders(event: any, file: string, content: Buffer) {
  const contentType = file.endsWith('.js') 
    ? 'application/javascript; charset=utf-8' 
    : 'text/css; charset=utf-8'
  
  setHeader(event, 'Content-Type', contentType)
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  setHeader(event, 'Access-Control-Allow-Origin', '*')
}
