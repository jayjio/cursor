# OpenAI API Setup Guide

This guide will help you set up your OpenAI API key to use the AI features in this application.

## Step 1: Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in to your account (or create one if you don't have one)
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click on **"Create new secret key"**
5. Give your key a name (e.g., "Nuxt App")
6. Copy the generated API key (you won't be able to see it again!)

**Important:** Keep your API key secret and never commit it to version control.

## Step 2: Configure Your Environment

1. In the root of your project, create a `.env` file (if it doesn't exist):
   ```bash
   touch .env
   ```

2. Open the `.env` file and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
   ```
   Replace `sk-proj-xxxxxxxxxxxxxxxxxxxxx` with your actual API key from Step 1.

3. Make sure `.env` is in your `.gitignore` file (it should already be there).

## Step 3: Restart Your Development Server

After adding the API key, restart your development server for the changes to take effect:

```bash
# Stop the current server (Ctrl+C)
# Then restart it:
npm run dev
```

## Step 4: Test the Integration

1. Open your browser to `http://localhost:3000`
2. Select an AI model from the dropdown (e.g., GPT-4, GPT-3.5 Turbo)
3. Enter a question in the text field
4. Click "Ask AI" or press Enter
5. You should see the AI response appear below the input field

## Available AI Models

The application supports the following OpenAI models:

- **GPT-4**: Most capable model, best for complex tasks
- **GPT-4 Turbo**: Faster version of GPT-4 with good performance
- **GPT-3.5 Turbo**: Fast and cost-effective for simpler tasks
- **O1 Preview**: OpenAI's reasoning model (preview)
- **O1 Mini**: Smaller reasoning model for faster responses

## Troubleshooting

### Error: "OpenAI API key is not configured"

- Make sure you created the `.env` file in the project root
- Verify the API key is correctly formatted: `OPENAI_API_KEY=sk-...`
- Restart your development server after adding the key

### Error: "Invalid API key"

- Double-check that you copied the entire API key from OpenAI
- Make sure there are no extra spaces before or after the key
- Verify your OpenAI account has API access enabled

### Error: "Rate limit exceeded"

- You've made too many requests in a short time
- Wait a few moments and try again
- Consider upgrading your OpenAI plan for higher rate limits

### Error: "Insufficient credits"

- Your OpenAI account may not have billing set up
- Go to [OpenAI Billing](https://platform.openai.com/account/billing) to add payment method
- Add credits to your account

## API Usage and Costs

OpenAI charges based on the number of tokens processed. Different models have different pricing:

- **GPT-4**: Higher cost, best quality
- **GPT-3.5 Turbo**: Lower cost, good for most tasks
- **O1 Models**: Pricing may vary

Check [OpenAI Pricing](https://openai.com/pricing) for current rates.

## Security Best Practices

1. **Never commit your `.env` file** to version control
2. **Never share your API key** publicly
3. **Rotate your API keys** periodically
4. **Set usage limits** in your OpenAI dashboard to prevent unexpected charges
5. **Monitor your API usage** regularly in the OpenAI dashboard

## Need Help?

- [OpenAI Documentation](https://platform.openai.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [OpenAI Community Forum](https://community.openai.com/)
