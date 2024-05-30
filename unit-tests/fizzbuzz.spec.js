const { fizzbuzz } = require('./fizzbuzz');

describe('fizz buzz', function(){

// FizzBuzz is a typical TDD practice exercise. Let create a function that

// should take values from 1 to 100
// should fizz when input value is a multiple of 3
// should buzz when input value is a multiple of 5
// should fizzbuzz when input value is a multiple of 3 and 5
// should display number when input value is neither multiple of 3 or 5


    test('function should exist', function(){
        // prerequesites

        // function under test
        expect(typeof fizzbuzz).toBe('function');
        // validations
    });

    test('should return the value when value is 2', function(){
        expect(fizzbuzz(2)).toBe(2)
    })

    test('should return the value when value is 58', function(){
        expect(fizzbuzz(58)).toBe(58)
    })

    test('should return fizz when input is 3', function(){
        expect(fizzbuzz(3)).toBe('fizz');
    })

    test('should return fizz when input is 27', function(){
        expect(fizzbuzz(27)).toBe('fizz');
    })

    test('should return fizz when input is 5', function(){
        expect(fizzbuzz(5)).toBe('buzz');
    })

    test('should return fizz when input is 25', function(){
        expect(fizzbuzz(25)).toBe('buzz');
    })


        test('should return fizz when input is 15', function(){
        expect(fizzbuzz(15)).toBe('fizzbuzz');
    })

});