const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://carrentalsystem-backend.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // 如果后端接口不是以 /api 开头，可以修改此处
      },
      logLevel: 'debug', // 添加日志级别，以便调试
    })
  );
};
