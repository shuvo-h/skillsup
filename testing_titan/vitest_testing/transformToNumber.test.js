import { describe, expect, it } from "vitest";
import { transformToNumber } from "./transformToNumber";

describe("transformToNumber()",()=>{
    it("should retuen a number if numeric string is provided",()=>{
        const stringNumber = '5';
        const result = transformToNumber(stringNumber)
        expect(result).toBeTypeOf('number')
        expect(isNaN(result)).not.toBe(true)
    })
})
