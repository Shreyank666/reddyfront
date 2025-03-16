const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://zplay1.in/sports/api/v1/events',
      changeOrigin: true,
      pathRewrite: {
        '^/api/matches/inplay': '/matches/inplay',
        '^/api/matches/([^/]+)': '/matches/$1',
        '^/api/match/([^/]+)': '/match/$1',
        '^/api/sports': '/sports'
      },
      onProxyReq: (proxyReq, req, res) => {
        // Add any required headers here
        proxyReq.setHeader('Accept', 'application/json');
      },
      onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.writeHead(500, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ 
          success: false, 
          message: 'Proxy error', 
          error: err.message 
        }));
      }
    })
  );
}; 