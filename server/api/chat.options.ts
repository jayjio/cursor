// Separate OPTIONS handler for CORS preflight
export default defineEventHandler((event) => {
  // Get origin from header
  const origin = getHeader(event, 'origin') || getHeader(event, 'referer')?.replace(/\/$/, '').split('/').slice(0, 3).join('/') || '*'
  
  // Set CORS headers - MUST be set before returning
  setHeader(event, 'Access-Control-Allow-Origin', origin)
  setHeader(event, 'Access-Control-Allow-Methods', 'POST, OPTIONS, GET')
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  setHeader(event, 'Access-Control-Max-Age', '86400')
  setHeader(event, 'Vary', 'Origin')
  
  // Only set credentials if we have a specific origin (not wildcard)
  if (origin !== '*') {
    setHeader(event, 'Access-Control-Allow-Credentials', 'true')
  }
  
  // Return 204 No Content for OPTIONS preflight
  event.node.res.statusCode = 204
  event.node.res.statusMessage = 'No Content'
  return null
})
