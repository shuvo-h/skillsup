/*
    - npm install typescript --save-dev
    - npm install -g typescript                 // globally install
    - npx tsc
    - tsc -v                                    // version check
    - npx tsc --init                            // create tsconfig.json file in node.js
    - npx tsc                                   // convert ths ts files into js files using tsconfig.json setting
    - npx tsc -w                                // in development, keep watching ts file when chage for auto convert to .js file
    - npm install rimraf --save-dev              // to delete the dist or build folder  by script  "compile": "rimraf dist && npx tsc"

    
    in package.json to compile and run
    "scripts": {
        "compile":  "rimraf dist && npx tsc && nodemon dist/server.js",
        "watch":    "npx tsc -w"
    },

*/