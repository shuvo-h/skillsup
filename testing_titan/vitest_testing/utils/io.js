import {promises as fs} from 'fs'
import path from 'path'

export function saveTokenToFile(data,fileName) {
    const storagePath = path.join(process.cwd(),'data',fileName);
    return fs.writeFile(storagePath,data)
}