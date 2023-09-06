const { createProxyMiddleware } = require('http-proxy-middleware');

export default function (req, res, next) {
  try {
    console.log(`Incoming request: ${req.method} ${req.url}`);  // Log the incoming request

    // Check if the request URL matches the pattern for PDFs
    if (/^\/.*\.pdf$/.test(req.url)) {
      console.log('PDF pattern matched, setting up proxy');  // Debug statement

      // Create a proxy middleware
      const proxy = createProxyMiddleware({
        target: 'http://localhost:3000',  // Your server URL
        pathRewrite: {
          '^/': '/domains/agency/pages/pitches/',  // Rewrite the URL path
        },
        changeOrigin: true,
        onError(err, req, res) {
          console.error('Proxy error:', err);  // Log any proxy errors
          res.status(500).send('An error occurred while proxying the request.');
        },
      });

      console.log('Proxying request');  // Debug statement

      // Use the proxy to forward the request
      return proxy(req, res, next);
    }

    console.log('No PDF pattern matched, moving to next middleware');  // Debug statement

    // Continue with the next middleware for other routes
    next();
  } catch (error) {
    console.error('An error occurred in the middleware:', error);  // Log any unexpected errors
    res.status(500).send('An unexpected error occurred.');
  }
}
