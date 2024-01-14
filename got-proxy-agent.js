const http = require("http");
const net = require("net");
const url = require("url");

const port = 8080; // The port on which the proxy server will run

const proxyServer = http.createServer((req, res) => {
  console.log(`Proxying request to: ${req.url}`); // Log the request URL

  const urlObj = url.parse(req.url);
  const options = {
    hostname: urlObj.hostname,
    port: urlObj.port || 80,
    path: urlObj.path,
    method: req.method,
    headers: req.headers,
  };

  const proxy = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxy, { end: true });
});

proxyServer.on("connect", (req, clientSocket, head) => {
  const { port, hostname } = url.parse(`//${req.url}`, false, true);
  console.log(`Proxying CONNECT request to: ${hostname}:${port}`); // Log CONNECT requests

  const serverSocket = net.connect(port || 80, hostname, () => {
    clientSocket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });

  serverSocket.on("error", (err) => {
    console.error(err);
    clientSocket.end();
  });

  clientSocket.on("error", (err) => {
    console.error(err);
    serverSocket.end();
  });
});

proxyServer.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
