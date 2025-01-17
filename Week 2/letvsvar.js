for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i)
    }, 1000);
}

console.log ('var: ')

for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i)
    }, 1000);
}