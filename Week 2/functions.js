function sayHi (name) {
    console.log(`Hello ${name}`)
}

const sayHi2 = (name) => {
    console.log (`Howdy ${name}`)
}

const sayHi3 = (name) => {
    return `Hey ${name}`
}

module.exports = {sayHi, sayHi2, sayHi3}