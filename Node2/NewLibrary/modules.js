// Библиотека для генерации случайных данных, таких как имена, адреса, даты, 
// числа и т.д. Это может быть полезно для тестирования или
// создания заглушек данных.

const userNames = ['Aden', 'Alen', 'Glory', 'Min', 'Rodrigo', 'Markus', 'Ken']
const userSecondNames = ['Smith', 'Gordon', 'Kendred', 'Twist', 'Morphius']

function generateRandomName() {
    let name = Math.floor(Math.random() * userNames.length)
    return userNames[name]
}

function geterateRandomSecondName() {
    let secondName = Math.floor(Math.random() * userSecondNames.length)
    return userSecondNames[secondName]
}

module.exports = { generateRandomName, geterateRandomSecondName }