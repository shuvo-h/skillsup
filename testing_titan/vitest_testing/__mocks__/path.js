import { vi } from "vitest";

// mock the path module globally
const path = {
    join: vi.fn((...args)=>args[args.length - 1])
}

export default path;