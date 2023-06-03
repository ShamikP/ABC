const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create an Express server
const app = express();

// Define the proxy middleware
const apiProxy = createProxyMiddleware({
  target: 'https://blog-43e2f-default-rtdb.firebaseio.com', // Replace with your actual API URL
  changeOrigin: true,
});

// Proxy requests starting with '/api'
app.use('/api', apiProxy);

// Start the server on port 3001 (or any other port you prefer)
app.listen(3001, () => {
  console.log('Proxy server listening on port 3001');
});
