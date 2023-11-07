# General info

- If you checked out this project simply use the following commands in your project root (where package.json is located)
    - `npm install`
    - `npm test`

# Step by step guide to your first test

- Ensure you have node.js installed
- Create a new project folder, you can call it however you want
- Open command prompt inside the folder
- Create initial package.json for dependency management with command `npm init --yes`
- Add typescript dependency with `npm install -D ts-node`
    - The argument "-D" saves the dependency as a dev dependency, see
    - https://typestrong.org/ts-node/docs/installation/
    - https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file
- Initialize typescript with `npx tsc --init`
    - "npx" allows you to run commands from a local package (one that is not installed globally), see
    - https://docs.npmjs.com/cli/v10/commands/npx
- Next we install the jasmine dependencies with `npm install -D jasmine` and `npm install -D @types/jasmine`
    - "jasmine" itself is the framework we will use here, see https://jasmine.github.io/pages/getting_started.html
    - "@types/jasmine" will enable auto-completion of things like "describe", "it", "expect", etc. without the need to actively import jasmine in your spec.ts files
        - TLDR it adds jasmine related stuff to the global namespace in your project
- Initialize jasmine with "npx jasmine init"
- Now you can use an IDE like VSCode or just create the folder structure yourself in the file explorer with the specified file contents
- Create a "src" folder with an subfolder "example", that contains a "calc.ts" and a "calc.spec.ts"
- You should have following folder structure now
    - node_modules
    - spec
        - support
            - jasmine.json
    - src
        - examples
            - calc.ts
            - calc.spec.ts
    - package.json
    - tsconfig.json
- The file src/examples/calc.ts will have the following content
```
export class Calculator {
  sum(x1: number, x2: number): number {
    return x1 + x2;
  }
}
```
- And the relevant test file src/examples/calc.spec.ts will have this content
```
import { Calculator } from './calc';

describe('Calculator', () => {
  it('should add two numbers', () => {
    const calc = new Calculator();
    expect(calc.sum(1, 3)).toEqual(4);
  });

  it('should subtract two numbers', () => {
    const calc = new Calculator();
    expect(calc.sum(1, 3)).toEqual(-2);
  });
});
```
- Now you can update the scripts section in package.json with the following
    - `"test": "jasmine"` 
    - This will allow you to run jasmine with a simple `npm test`
- With everything set up you can execute jasmine with either `npm test` or `npx jasmine`
- If you reached this point you will see "No specs found", this is because jasmine only checks for .js files
- To create .js files out of your .ts files you can use the typescript compiler with `npx tsc --build`
- Running the tests again will result yet again with "No specs found", but this is because jasmine does not know where your files are located
- To solve this you need to modify the spec/support/jasmine.json and change `"spec_dir": "spec"` to `"spec_dir": "src/examples"`
- Now you will see two test results if you run `npm test` again, one successful and one failing
- Once you adapted the .ts files to make the test working you need to compile yet again with `npx tsc --build` to see updated results
    - This extra compilation step can be annoying (and might create unwanted compiled files), but is actually easily solved with the following adaptions
    - Change the content of the scripts section in package.json to the following
       - `"test": "ts-node node_modules/jasmine/bin/jasmine"`
    - Next you need to adapt spec/support/jasmine.json, change the content of `spec_files` array from `"**/*[sS]pec.?(m)js"` to `"**/*[sS]pec.ts"`
    - Now you should be able to run 'npm test' and get updated results without the compilation step
    - Kudos to https://stackoverflow.com/questions/30863565/unit-testing-using-jasmine-and-typescript
- Now we have checked how to test plain typescript files with jasmine
- If you need browser support you need a test-runner like karma, see https://karma-runner.github.io/latest/index.html
    - Please note that frameworks like Angular are shipped with fully configured jasmine + karma integration 
    - See https://angular.io/guide/testing