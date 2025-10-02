// Vercel serverless function to proxy Claude API requests
// This keeps your API key secure on the backend

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the prompt from the request body
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Check for API key in environment variables
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    
    // Return just the text content
    return res.status(200).json({ 
      reading: data.content[0].text 
    });

  } catch (error) {
    console.error('Error calling Claude API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
