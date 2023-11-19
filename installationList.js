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



    // (M8_project-structure) command sequence before push to git
    - npm run lint                      // fix if any error found
    - npm run prettier                  // check if formatting is correct

*/


/*

Portfolio Github README.MD file details
Over the last year, I’ve transformed from a no-code Shopify developer to a full-stack developer, focusing on building businesses from scratch.

I aim to inspire others by solving problems with my code, building valuable stuff on the Internet and creating content while documenting my journey and learnings.

I have expertise in creating React-based applications, growth hacking, and experimentation to build and scale things.

Keeping up with the changes in the market from AI tools to no-code tools. I can research the market, understand what is required and help to build and sell it.

→ Author of "The Ultimate Job Seeker's Handbook," a 97-page eBook providing job seekers with tools and strategies for finding their dream job.

I'm open to working as a JS / React based Full stack / Frontend engineer /developer at the moment

If you want to work together or hire me to help you build and scale

→ MAIL ME @ manageanirudh@gmail.com

*/