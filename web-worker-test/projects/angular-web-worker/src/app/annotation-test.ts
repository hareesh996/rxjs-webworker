import * as ts from 'typescript';

// Create a Program to represent the project, then pull out the
// source file to parse its AST.
const file = './app.component.ts';
let program = ts.createProgram([file], { allowJs: true });
const sourceFile: ts.SourceFile = program.getSourceFile(file);

console.log(sourceFile);