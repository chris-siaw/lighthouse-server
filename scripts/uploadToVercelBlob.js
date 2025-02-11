const { put } = require('@vercel/blob');
const fs = require('fs').promises;
const path = require('path');

async function uploadFile(filePath) {
  try {
    const fileName = path.basename(filePath);
    const fileContent = await fs.readFile(filePath);

    // Upload the file to Vercel Blob.
    const result = await put(fileName, fileContent, {
      access: 'public',
      token: process.env.VERCEL_BLOB_TOKEN,
    });

    // Write only the public URL as JSON to stdout.
    process.stdout.write(JSON.stringify({ url: result.url }));
  } catch (error) {
    console.error('Error uploading file:', error);
    process.exit(1);
  }
}

const filePath = process.argv[2];
if (!filePath) {
  console.error('Error: No file path provided');
  process.exit(1);
}

uploadFile(filePath);
