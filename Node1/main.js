const http = require('http');
let counter = 0;
function incrementCounter() {
    counter++;
}


const server = http.createServer((req, res) => {

    if (req.url === '/home') {
        incrementCounter();
        res.writeHead(200, { 'Content-Type': 'text/html ; charset=UTF-8' });
        res.end(`<a href="about">Перейти на страницу About</a>\n<a href=404>Page 404</a>\n<p id="counter">${counter}</p>`);
    }
    else if (req.url === '/about') {
        incrementCounter();
        res.writeHead(200, { 'Content-Type': 'text/html ; charset=UTF-8' });
        res.end(`<a href="/home">Перейти на страницу Main</a> \n <p id="counter">${counter}</p>`);
    }
    else {
        incrementCounter();
        res.writeHead(200, { 'Content-Type': 'text/html ; charset=UTF-8' });
        res.end(`<h1>Page 404 </h1>\n <p id="counter">${counter}</p><a href="/home">Перейти на страницу Main</a> `)
    }
})

const port = '3000';

server.listen(port);