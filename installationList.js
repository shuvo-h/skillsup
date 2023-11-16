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


    add in tsconfig.json file
    {
        "include": ["src"], // which files to compile
        "exclude": ["node_modules"], // which files to skip
    }

    // add prettier and eslint(make sure to copy the .eslintrc.json file)
    - npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
    - npx eslint --init                 // create eslint initialized file
            > copy or edit the .eslintrc.json file
            > add .eslintignore file for "node_modules" & "dist"
                > add this script in package.json file
                "scripts": {
                    "lint": "eslint src --ignore-path .eslintignore --ext .js,.ts",
                    "prettier": "prettier --ignore-path .gitignore --write ......................path and files extensions"
                },
    - npm run lint --fix            // it will run the "lint" script from package.json which indicating to fix all .ts .js file from src folder and ignore .eslintignore
    - npm install --save-dev prettier
            > modify .prettierrc.json
    - npx prettier --write src/index.ts    
    - npm install --save-dev eslint-config-prettier
    - npm i -D ts-node-dev                              // run .ts file on development(not production) 
*/