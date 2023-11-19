const http = require('http');

const server = http.createServer((req, res) => {
    // res.writeHead(200,
    //     { 'Content-Type': 'text/html; charset=utf-8' })
    // res.end('<h1>Go</h1>')


    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html ; charset=UTF-8' });
        res.end('<a href="about">Перейти на страницу About  </a> <a href=404> Page 404</a>');
    }
    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html ; charset=UTF-8' });
        res.end('<a href="/">Перейти на страницу Main  </a>');
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html ; charset=UTF-8' });
        res.end('<h1>Page 404 </h1>')
    }
})

const port = '3000';

server.listen(port);