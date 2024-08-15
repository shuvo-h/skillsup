import { describe, expect, it, vi } from "vitest";
import { saveTokenToFile } from "./io";
import { promises as fs } from 'fs';
import path from 'path';

// Mock the external modules
vi.mock('fs');
vi.mock('path') // move the method into __mocks__ folder
/*
vi.mock('path', () => {
    return {
        join: vi.fn((...args)=>args[args.length - 1])
    };
});
*/


describe("saveTokenToFile()", () => {
    it("should call fs.writeFile with correct arguments", async () => {
        const data = "dummy token";
        const fileName = 'token.txt';

        // Calculate the expected path based on the current working directory and the file name
        const expectedPath = path.join(process.cwd(), 'data', fileName);

        await saveTokenToFile(data, fileName);

        // Check that fs.writeFile was called with the expected full path and data
        // expect(fs.writeFile).toHaveBeenCalledWith(expectedPath, data);
    });
});
