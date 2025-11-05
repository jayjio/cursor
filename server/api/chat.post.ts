import OpenAI from 'openai'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { message, model = 'gpt-4' } = await readBody(event)

  if (!message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message is required'
    })
  }

  if (!config.openaiApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenAI API key is not configured. Please check your .env file.'
    })
  }

  try {
    const openai = new OpenAI({
      apiKey: config.openaiApiKey
    })

    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      stream: false
    })

    return {
      success: true,
      response: completion.choices[0]?.message?.content || 'No response generated',
      model: completion.model,
      usage: completion.usage
    }
  } catch (error: any) {
    console.error('OpenAI API Error:', error)
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.message || 'Failed to get response from OpenAI'
    })
  }
})
