const { createProxyMiddleware } = require('http-proxy-middleware');

export default function (req, res, next) {
  // Check if the request URL matches the pattern for PDFs
  if (/^\/.*\.pdf$/.test(req.url)) {
    // Create a proxy middleware
    const proxy = createProxyMiddleware({
      target: 'http://localhost:3000',  // Your server URL
      pathRewrite: {
        '^/': '/domains/agency/pages/pitches/',  // Rewrite the URL path
      },
      changeOrigin: true,
    });

    // Use the proxy to forward the request
    return proxy(req, res, next);
  }

  // Continue with the next middleware for other routes
  next();
}
