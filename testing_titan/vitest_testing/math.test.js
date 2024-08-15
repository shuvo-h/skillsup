import { it,expect, test, describe } from "vitest";
import { add } from "./math";

describe("add()",()=>{
    it("should return the correct sum if any array of number is provided",()=>{
        // arrange
        const numbers = [1,2,3];
        const expectedResult = numbers.reduce((acc,curr)=>acc+curr,0)
        const result = add(numbers);
        // action
        // assertion
        expect(result).toBe(expectedResult)
    })
    it("should return NaN if at least one invalid number is provided",()=>{
        // arrange
        const numbers = [1,2,3,'a'];
        const expectedResult = numbers.reduce((acc,curr)=>acc+curr,0)
        const result = add(numbers);
        // action
        // assertion
        expect(result).toBeNaN()
    })
    it("should return correct sum if an array of numeric string is provided",()=>{
        // arrange
        const numbers = [1,2,3,'4'];
        const expectedResult = numbers.reduce((acc,curr)=>acc+ +curr,0)
        const result = add(numbers);
        // action
        // assertion
        expect(result).toBe(expectedResult)
    })

    it("should throw an error if no argument is provided",()=>{
        // arrange
        // action way: 1
        try {
            const result = add();
        } catch (error) {
            // assertion
            expect(error).toBeDefined()
        }

        // action way: 2
        const resultFn = () =>{
            add()
        }
        expect(resultFn).toThrow()
    })

    it("should throw an error if multiple argument is provided",()=>{
        // arrange
        // action
        const resultFn = () =>{
            add(1,2,3)
        }
        expect(resultFn).toThrow(/is not iterable/i)
    })

})
