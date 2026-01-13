// Uses Babel / TS AST to parse RN code

import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";

export interface ParsedRNTree {
  ast: t.File;
  rootJSXElement: t.JSXElement;
}

export function parseRN(code: string): ParsedRNTree {
  try {
    // Parse code into AST
    const ast = parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    let rootJSXElement: t.JSXElement | null = null;

    // Traverse AST to find first returned JSX element
    traverse(ast, {
      ReturnStatement(path) {
        const arg = path.node.argument;
        if (t.isJSXElement(arg)) {
          rootJSXElement = arg;
          path.stop();
        }
      },
    });

    // If no JSX root found, throw explicit error
    if (!rootJSXElement) {
      throw new Error(
        "No root JSX element found. Make sure your component returns JSX."
      );
    }

    return { ast, rootJSXElement };

  } catch (err) {
    // Re-throw with clean message for CLI / caller
    throw new Error(
      `RN Parser Error: ${(err as Error).message}`
    );
  }
}

