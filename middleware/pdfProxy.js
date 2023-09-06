const { createProxyMiddleware } = require('http-proxy-middleware');

export default function (req, res, next) {
  try {
    console.log(`Incoming request: ${req.method} ${req.url}`);  // Log the incoming request

    // Check if the request URL matches the pattern for PDFs
    if (/^\/.*\.pdf$/.test(req.url)) {
      console.log('PDF pattern matched, setting up proxy');  // Debug statement

      // Create a proxy middleware
      const proxy = createProxyMiddleware({
        target: process.env.PROXY_TARGET || 'http://localhost:3000',  // Use environment variable or default to localhost
        pathRewrite: {
          '^/': '/domains/agency/pages/pitches/',  // Rewrite the URL path
        },
        changeOrigin: true,
        onError(err, req, res) {
          console.error('Proxy error:', err);  // Log any proxy errors
          if (typeof res.status === 'function') {
            res.status(500).send('An error occurred while proxying the request.');
          } else {
            console.error('Cannot set response status');
          }
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
    if (typeof res.status === 'function') {
      res.status(500).send('An unexpected error occurred.');
    } else {
      console.error('Cannot set response status');
    }
  }
}
