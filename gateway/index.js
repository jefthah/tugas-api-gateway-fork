const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware"); 
const app = express();
const port = 3000;

// http://localhost:3000/students => http://localhost:3001/
app.use("/students", createProxyMiddleware({
    target: `http://localhost:3001`,
    pathRewrite: {
        '^/students': ''
    }
}));

// http://localhost:3000/subjects => http://localhost:3002/
app.use("/subjects", createProxyMiddleware({
    target: `http://localhost:3002`,
    pathRewrite: {
        '^/subjects': ''
    }
}));

app.listen(port, () => {
    console.log(`API Gateway service listening on port ${port}`);
});
