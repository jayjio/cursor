import { readFile } from 'fs/promises'
import { join } from 'path'

// Serve widget files from /widget/ path
// This is a fallback in case static file serving doesn't work on Vercel
export default defineEventHandler(async (event) => {
  const file = getRouterParam(event, '_')
  
  // Only allow specific widget files for security
  if (!file || !file.match(/^(jeremy-chat-widget\.iife\.js|nuxt-app\.css)$/)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found'
    })
  }

  try {
    // Try multiple possible locations for the file
    const possiblePaths = [
      join(process.cwd(), 'public', 'widget', file), // Development
      join(process.cwd(), '.output', 'public', 'widget', file), // Production build
      join(process.cwd(), 'dist', 'widget', file), // Direct build output
    ]
    
    let fileContent
    let found = false
    
    for (const filePath of possiblePaths) {
      try {
        fileContent = await readFile(filePath)
        found = true
        break
      } catch (e) {
        // Try next path
        continue
      }
    }
    
    if (!found) {
      throw new Error('File not found in any expected location')
    }
    
    // Set appropriate headers
    const contentType = file.endsWith('.js') 
      ? 'application/javascript; charset=utf-8' 
      : 'text/css; charset=utf-8'
    
    setHeader(event, 'Content-Type', contentType)
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
    setHeader(event, 'Access-Control-Allow-Origin', '*')
    
    return fileContent
  } catch (error) {
    console.error('Error serving widget file:', error)
    throw createError({
      statusCode: 404,
      statusMessage: `File not found: ${file}`
    })
  }
})
