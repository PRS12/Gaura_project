import { Writable } from 'stream';

// This is a proxy to bypass CORS issues when uploading to a Dropbox File Request.
// The browser sends the file to this API route, which then forwards it to Dropbox.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const dropboxFileRequestUrl = 'https://www.dropbox.com/request/pTk7YIk8a3hUrZcGS9b1';

  try {
    const dropboxResponse = await fetch(dropboxFileRequestUrl, {
      method: 'POST',
      headers: {
        // Add a standard User-Agent and forward the Content-Type
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        'Content-Type': req.headers['content-type'],
      },
      body: req, // Pass the raw request stream
      // @ts-ignore
      duplex: 'half', // This is required to stream bodies in Node.js
    });

    if (dropboxResponse.ok) {
      res.status(200).json({ message: 'File uploaded successfully' });
    } else {
      const errorText = await dropboxResponse.text();
      res.status(dropboxResponse.status).json({ error: 'Dropbox upload failed', details: errorText });
    }
  } catch (error) {
    console.error('Error proxying to Dropbox:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// We need to disable the default body parser for file uploads to work correctly.
export const config = {
  api: {
    bodyParser: false,
  },
};
