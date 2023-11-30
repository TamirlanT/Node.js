const express = require('express');
const { checkBody, checkParams } = require('./validation/validator');
const { idScheme, userScheme } = require('./validation/scheme');
const fs = require('fs');
const path = require('path')
const pathToFile = path.join(__dirname, 'users.json')

const app = express();
app.use(express.json())

/**
 * Проверка наличия файла
 */
if (!fs.existsSync(pathToFile)) {
    const users = []
    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2))
}


/**
 * Парсинг файла
 */
const users = JSON.parse(fs.readFileSync(pathToFile, 'utf-8', err => {
    if (err) {
        res.status(404)
        res.send({ users: null })
    }
}));

/**
 * Присваивание  уникального id
 */
let uniqId;
users.length == 0 ? uniqId = 0 : uniqId = users.at(-1).id;

/**
 * Получение всех пользователей
 */

app.get('/users', (req, res) => {
    res.send({ users })
})

/**
 * Получение одного пользователя по id
 *  ,
 */

app.get('/users/:id', checkParams(idScheme), (req, res) => {
    const reqUserId = +req.params.id;
    const user = users.find((user) => user.id === reqUserId);
    if (!user) {
        res.status(404);
        res.send({ user: null })
    } else {
        res.send({ user })
    }
})

/**
 * Создание пользователя
 */

app.post('/users', checkBody(userScheme), (req, res) => {

    uniqId += 1;
    users.push({
        id: uniqId,
        ...req.body
    })
    fs.writeFileSync(pathToFile, JSON.stringify(users, null, 2))
    res.send({ id: uniqId })
})

/**
 * Изменение пользователя
 */

app.put('/users/:id', checkParams(idScheme), checkBody(userScheme), (req, res) => {
    const userId = +req.params.id;
    const user = users.find((user) => user.id === userId)

    if (user) {
        user.firstName = req.body.firstName,
            user.secondName = req.body.secondName,
            user.age = req.body.age,
            user.city = req.body.city

        res.send({ user })

        fs.writeFileSync(pathToFile, JSON.stringify(users, null, 2))
    } else {
        res.status(404);
        res.send({ user: null })
    }
})

/**
 * Удаление пользователя
 */

app.delete('/users/:id', checkParams(idScheme), (req, res) => {
    const userId = +req.params.id;
    const user = users.find((user) => user.id === userId)

    if (user) {
        const userIndex = users.indexOf(user)
        users.splice(userIndex, 1)
        res.send({ user })
        fs.writeFileSync(pathToFile, JSON.stringify(users, null, 2))
    } else {
        res.status(404);
        res.send({ user: null })
    }
})

app.use((req, res) => {
    res.status(404).send({
        message: 'URL not found!'
    })
})



const port = 3000;
app.listen(port);
