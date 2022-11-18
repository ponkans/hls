const http = require('http');
const fs = require('fs');
const path = require('path');

http
  .createServer(function (req, res) {
    const fileName = req.url.replace(/\//g, '');
    if (req.method === 'GET' && fileName !== 'favicon.ico') {
      /** 跨域 */
      res.setHeader('Access-Control-Allow-Origin', '*');

      /** 类型 */
      res.setHeader('Content-Type', 'audio/x-mpegurl');

      /** pipe */
      fs.createReadStream(path.resolve(`${__dirname}/m3u8`, fileName)).pipe(res);
    }
  })
  .listen(8888);
