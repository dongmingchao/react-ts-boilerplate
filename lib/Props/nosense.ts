import * as ts from 'typescript';
import * as tsdoc from '@microsoft/tsdoc';

export interface IFoundComment {
  compilerNode: ts.Node;
  textRange: tsdoc.TextRange;
}

function isDeclarationKind(kind: ts.SyntaxKind): boolean {
  return kind === ts.SyntaxKind.ArrowFunction
    || kind === ts.SyntaxKind.BindingElement
    || kind === ts.SyntaxKind.ClassDeclaration
    || kind === ts.SyntaxKind.ClassExpression
    || kind === ts.SyntaxKind.Constructor
    || kind === ts.SyntaxKind.EnumDeclaration
    || kind === ts.SyntaxKind.EnumMember
    || kind === ts.SyntaxKind.ExportSpecifier
    || kind === ts.SyntaxKind.FunctionDeclaration
    || kind === ts.SyntaxKind.FunctionExpression
    || kind === ts.SyntaxKind.GetAccessor
    || kind === ts.SyntaxKind.ImportClause
    || kind === ts.SyntaxKind.ImportEqualsDeclaration
    || kind === ts.SyntaxKind.ImportSpecifier
    || kind === ts.SyntaxKind.InterfaceDeclaration
    || kind === ts.SyntaxKind.JsxAttribute
    || kind === ts.SyntaxKind.MethodDeclaration
    || kind === ts.SyntaxKind.MethodSignature
    || kind === ts.SyntaxKind.ModuleDeclaration
    || kind === ts.SyntaxKind.NamespaceExportDeclaration
    || kind === ts.SyntaxKind.NamespaceImport
    || kind === ts.SyntaxKind.Parameter
    || kind === ts.SyntaxKind.PropertyAssignment
    || kind === ts.SyntaxKind.PropertyDeclaration
    || kind === ts.SyntaxKind.PropertySignature
    || kind === ts.SyntaxKind.SetAccessor
    || kind === ts.SyntaxKind.ShorthandPropertyAssignment
    || kind === ts.SyntaxKind.TypeAliasDeclaration
    || kind === ts.SyntaxKind.TypeParameter
    || kind === ts.SyntaxKind.VariableDeclaration
    || kind === ts.SyntaxKind.JSDocTypedefTag
    || kind === ts.SyntaxKind.JSDocCallbackTag
    || kind === ts.SyntaxKind.JSDocPropertyTag;
}

export function getJSDocCommentRanges(node: ts.Node, text: string): ts.CommentRange[] {
  const commentRanges: ts.CommentRange[] = [];

  switch (node.kind) {
    case ts.SyntaxKind.Parameter:
    case ts.SyntaxKind.TypeParameter:
    case ts.SyntaxKind.FunctionExpression:
    case ts.SyntaxKind.ArrowFunction:
    case ts.SyntaxKind.ParenthesizedExpression:
      commentRanges.push(...ts.getTrailingCommentRanges(text, node.pos) || []);
      break;
  }
  commentRanges.push(...ts.getLeadingCommentRanges(text, node.pos) || []);

  // True if the comment starts with '/**' but not if it is '/**/'
  return commentRanges.filter((comment) =>
    text.charCodeAt(comment.pos + 1) === 0x2A /* ts.CharacterCodes.asterisk */ &&
    text.charCodeAt(comment.pos + 2) === 0x2A /* ts.CharacterCodes.asterisk */ &&
    text.charCodeAt(comment.pos + 3) !== 0x2F /* ts.CharacterCodes.slash */);
}

export function walkCompilerAstAndFindComments(node: ts.Node, indent: string, foundComments: IFoundComment[]): void {
  // The TypeScript AST doesn't store code comments directly.  If you want to find *every* comment,
  // you would need to rescan the SourceFile tokens similar to how tsutils.forEachComment() works:
  // https://github.com/ajafff/tsutils/blob/v3.0.0/util/util.ts#L453
  //
  // However, for this demo we are modeling a tool that discovers declarations and then analyzes their doc comments,
  // so we only care about TSDoc that would conventionally be associated with an interesting AST node.

  let foundCommentsSuffix: string = '';
  const buffer: string = node.getSourceFile().getFullText(); // don't use getText() here!

  // Only consider nodes that are part of a declaration form.  Without this, we could discover
  // the same comment twice (e.g. for a MethodDeclaration and its PublicKeyword).
  if (isDeclarationKind(node.kind)) {
    // Find "/** */" style comments associated with this node.
    // Note that this reinvokes the compiler's scanner -- the result is not cached.
    const comments: ts.CommentRange[] = getJSDocCommentRanges(node, buffer);

    if (comments.length > 0) {
      if (comments.length === 1) {
        foundCommentsSuffix = `  (FOUND 1 COMMENT)`;
      } else {
        foundCommentsSuffix = `  (FOUND ${comments.length} COMMENTS)`;
      }

      for (const comment of comments) {
        foundComments.push({
          compilerNode: node,
          textRange: tsdoc.TextRange.fromStringRange(buffer, comment.pos, comment.end)
        });
      }
    }
  }

  // console.log(`${indent}- ${ts.SyntaxKind[node.kind]}${foundCommentsSuffix}`);

  return node.forEachChild(child => walkCompilerAstAndFindComments(child, indent + '  ', foundComments));
}

export function obtainComments(comments: IFoundComment[]) {
  for(const cms of comments) {

  }
}

const tsdocParser: tsdoc.TSDocParser = new tsdoc.TSDocParser();

export function parseComment(shortComment: string) {
  const parserContext: tsdoc.ParserContext = tsdocParser.parseRange(
    tsdoc.TextRange.fromStringRange(shortComment, 0, shortComment.length)
  );
  for (const nodes of parserContext.docComment.summarySection.getChildNodes()){
    // console.log(nodes);
    switch(nodes.kind) {
      case 'Paragraph':
        for (const sub of nodes.getChildNodes()) {
          // console.log('sub', sub);
          switch(sub.kind) {
            case 'PlainText': 
              const n = sub as tsdoc.DocPlainText;
              return n.text;
              // break;
          }
        }
        break;
    }
  }
}
