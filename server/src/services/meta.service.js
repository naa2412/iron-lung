const fetch = require('node-fetch');

async function fetchMeta(url) {
  try {
    // Ensure URL has protocol
    let targetUrl = url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; IronLung/1.0)',
      },
      timeout: 10000,
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const html = await response.text();

    // Parse OpenGraph meta tags
    const getMetaContent = (property) => {
      const regex = new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i');
      const altRegex = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`, 'i');
      const nameRegex = new RegExp(`<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i');
      
      const match = html.match(regex) || html.match(altRegex) || html.match(nameRegex);
      return match ? match[1] : null;
    };

    // Get title from og:title or <title>
    let title = getMetaContent('og:title');
    if (!title) {
      const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      title = titleMatch ? titleMatch[1].trim() : null;
    }

    const image = getMetaContent('og:image');
    const description = getMetaContent('og:description') || getMetaContent('description');

    return {
      title: title || null,
      image: image || null,
      description: description || null,
      url: targetUrl,
    };
  } catch (error) {
    throw Object.assign(
      new Error(`Gagal mengambil metadata dari URL: ${error.message}`),
      { statusCode: 400 }
    );
  }
}

module.exports = { fetchMeta };
