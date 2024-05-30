

module.exports = {
    fizzbuzz: (input) => {
        let output = '';
        if (input % 3 === 0){
            output = 'fizz';
        }
        if(input % 5 === 0){
            output += 'buzz';
        }
        if (output !== ''){
            return output;
        }
        return input;
    }
}

