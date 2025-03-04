const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Allow CORS for all origins (adjust in production)
app.use(cors({ origin: "*", credentials: true }));

// Separate proxy for OAuth (no /api prefix)
app.use((req, res, next) => {
  console.log(`➡️ Incoming request: ${req.method} ${req.url}`);
  next();
});
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://scimtest.secretservercloud.com",
    changeOrigin: true,
    secure: false,
    logLevel: "debug",
    pathRewrite: { "^/api": "/api/v1" },  // Rewrite "/api" to "/api/v1"
    onProxyReq: (proxyReq, req, res) => {
      console.log(`🔄 Proxying request → ${req.method} ${req.originalUrl}`);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`✅ Response Status: ${proxyRes.statusCode} from ${req.url}`);
    },
  })
);


app.use(
  "/api",
  createProxyMiddleware({
    target: "https://scimtest.secretservercloud.com",
    changeOrigin: true,
    secure: false,
    pathRewrite: { "^/api/oauth2/token": "/oauth2/token" }, // Removes "/api"
    onProxyReq: (proxyReq, req, res) => {
      console.log(`🔄 Proxying request to: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`✅ Response received from: ${req.url} | Status: ${proxyRes.statusCode}`);
    },
  })
);


app.listen(4000, () => {
  console.log("🚀 Proxy server running on http://localhost:4000");
});
