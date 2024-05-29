


function calcultation(a, b, c){
    if (this[`${a}-${b}-${c}`]){
        console.log('already in cache')
        return this[`${a}-${b}-${c}`];
    }

    this[`${a}-${b}-${c}`] = 2 * a * a + b * 3 + c; 
    return this[`${a}-${b}-${c}`];
}

console.log(calcultation(321, 4324, 5435));
console.log(calcultation(321, 4324, 5435));