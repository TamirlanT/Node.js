const express = require('express');
const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'data.json')



const app = express();

const data = JSON.parse(fs.readFileSync(pathToFile))

app.get('/', (req, res) => {
    data.home += 1
    res.send(`<h1>Home Page</h1><a href='/about'>About</a><p>Visit's on home ${data.home}</p>`)
    fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2))

})

app.get('/about', (req, res) => {
    data.about += 1
    res.send(`<h1>About</h1><a href='/'>Home</a><p>Visit's on About - ${data.about}</p>`)
    fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2))
})

const port = 3000;

app.listen(port)