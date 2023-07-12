import path from "path";
import fs from "fs";
import * as url from "url";
const dirname = path.dirname;
const sep = path.sep
let __dirname = dirname(url.fileURLToPath(import.meta.url));
let isInitialized = false;

function findRootFolder () {
    // search for package.json
    let currentDir = __dirname;
    let found = false;
    while(!found){
        let files = fs.readdirSync(currentDir);
        let folder = currentDir.split("/").at(-1)
        if(files.includes("package.json") && !folder.includes("sigma-logger")){
            found = true;
        } else {
            currentDir = path.join(currentDir,"..");
        }
    }
    return currentDir;
}
async function init(){
    // Check if the logs folder exists
    // If it doesn't, create it
    let logsDir = `${__dirname}${sep}logs`;
    if(!fs.existsSync(logsDir)){
        fs.mkdirSync(logsDir);
    }
    isInitialized = true;
}

class Logger {
    constructor(dirName) {
        this.useTime = false;
        this.useConsole = false;
    }
    static omitTime(){
        this.usesTime = true;
        return this;
    }
    static omitConsole(){
        this.logToConsole = true;
        return this;
    }
    static log(message){
        if(!isInitialized) {
            init().then(()=>this.#createLog(message));
            return;
        }
        this.#createLog(message);
    }
    static #createLog=(message)=>{
        // This is an internal function ONLY.
        let date = new Date().toLocaleDateString().split("/").join("-");
        let timeString = new Date().toLocaleTimeString() + " : "
        let msg = `${!this.useTime ? timeString  : ""} ${message}\n`;
        let filePath = `${__dirname}${sep}logs${sep}${date}-log.log`;
        let options = {flag:"a"};
        if(!this.useConsole){
            console.log(message);
        }
        fs.writeFileSync(filePath,msg,options);
    }
}
__dirname = findRootFolder();
Logger.log("Root folder found.");
export default Logger;
