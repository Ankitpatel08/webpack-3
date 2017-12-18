# webpack-3

Introduced two main feature
1. Scope hoisting
2. Magic comments

* Scope Hoisting
-> In previous releases, Each module wrapped in individual function closure
-> In webpack 3:  there will be one function closure and all modules would be wrapped in it.

Pros: Smaller bundle size
      Faster Execution

* Magic Comments
-> Ability to pass chunkName in dynamic import statement

--------------------------------------------------------

Source Code: App-1 : Dynamic import statement
             App-2 : Scope Hoisting

--------------------------------------------------------
Steps: 
1. Clone repo
2. Run npm install
3. Build App using : npm start --APPS={app-1/app-2}

--------------------------------------------------------
