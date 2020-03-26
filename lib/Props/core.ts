import * as ts from 'typescript';
import * as tsdoc from '@microsoft/tsdoc';
import { walkCompilerAstAndFindComments, IFoundComment, getJSDocCommentRanges, parseComment } from './nosense';

export interface PropAnalzye {
  typeName?: string
  name?: string
  comment?: string
}

export function handle(inputBuffer: string) {
  const sourceFile = ts.createSourceFile('foo.ts', inputBuffer, ts.ScriptTarget.ES5, true);
  const comments: IFoundComment[] = [];
  const ret = [];
  walkCompilerAstAndFindComments(sourceFile, '', comments);
  for ( const { compilerNode } of comments) {
    const base: PropAnalzye = {
      typeName: undefined,
      name: undefined,
      comment: undefined,
    }
    // console.log(compilerNode);
    switch(compilerNode.kind) {
      case ts.SyntaxKind.PropertySignature: {
        const f = compilerNode as ts.PropertySignature;
        base.name = f.name.getText();
        base.typeName = f.type?.getFullText();
        break;
      }
      case ts.SyntaxKind.MethodSignature: {
        const f = compilerNode as ts.MethodSignature;
        // console.log(f.getFullText());
        const params = [];
        const i = f.parameters.values();
        let vi = i.next();
        while(!vi.done) {
          const tt = vi.value as ts.ParameterDeclaration;
          vi = i.next();
          if (tt.type === undefined) continue;
          params.push(tt.type.getText())
        }
        base.typeName = `(${params.join(',')}) => ${f.type?.getText()}`
        base.name = f.name.getText();
        break;
      }
    }
    const bstr = compilerNode.getSourceFile().getFullText();
    const locate = getJSDocCommentRanges(compilerNode, bstr)[0];
    const cm = bstr.substring(locate.pos, locate.end);
    base.comment = parseComment(cm);
    ret.push(base);
  }
  return ret;
}