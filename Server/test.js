const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();

const app = express();
const port = 3000;

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');

const azureStorageConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'images';

app.post('/upload', uploadStrategy, async (req, res) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(azureStorageConnectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(req.file.originalname);

    const uploadResponse = await blobClient.upload(req.file.buffer, req.file.size);

    res.status(200).send(`File uploaded to Azure Blob storage as blob: ${req.file.originalname}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
