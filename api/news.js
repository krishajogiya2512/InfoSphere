export default async function handler(req, res) {
  // Add CORS headers so we can access it from our frontend if necessary
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { q = 'technology' } = req.query;
  const apiKey = "9a9509e9e70b8766f3f8bcda8621237a";
  // Max 10 to limit results
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=en&max=10&token=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error fetching from GNews API:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
