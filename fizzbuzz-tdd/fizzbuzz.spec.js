import {fizzbuzz} from "./fizzbuzz.js";

describe('fizzbuzz', ()=> {
    it('fizzbuzz should be defined', ()=> {
        expect(typeof fizzbuzz).toBe('function')
    })

    it('should return fizz if multiple of 3',() => {
        expect(fizzbuzz(12)).toBe('fizz');
    })
    it('should return buzz if multiple of 5',() => {
        expect(fizzbuzz(10)).toBe('buzz');
    })
    it('should return fizzbuzz if multiple of 5 and 3',() => {
        expect(fizzbuzz(15)).toBe('fizzbuzz');
    })
})