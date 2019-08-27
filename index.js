
const path = require('path');

const M_BAD_IMPORT = "DCR Components can only import core libraries, or modules that exist below themselves"
const M_NO_AMPR = "DCR Components with non-relative imports must use the @ syntax"

const checkImportNode = (node, context) => {

    const importStatementLiteral = node.source.value;
    const sourceFilePath = context.getFilename();
    const resolvedImportStatementPath = path.resolve(
        path.dirname(sourceFilePath),
        importStatementLiteral
    );

    const isAllowed = (i) => context.options[0].allowedImports.filter((e)=>i.startsWith(e)).length > 0

    const isComponent = sourceFilePath.includes("/packages/frontend/amp/components/");

    if(isComponent && importStatementLiteral.startsWith(".")){

        // relative import

        if( !resolvedImportStatementPath.startsWith(path.dirname(sourceFilePath))){
            context.report(node, `${M_BAD_IMPORT}: ${resolvedImportStatementPath}`);
        }
        
    } else if(isComponent && importStatementLiteral.startsWith("@") && !isAllowed(importStatementLiteral)) {

        // @package import

        const syntheticPath = process.cwd() + importStatementLiteral.replace("@", "/packages/")

        if( !syntheticPath.startsWith(path.dirname(sourceFilePath))){
            context.report(node, `${M_BAD_IMPORT}: ${importStatementLiteral}`);
        }

    } else if(isComponent && !isAllowed(importStatementLiteral)) {

        // absolute import

        context.report(node, `${M_NO_AMPR}: ${importStatementLiteral}`);

    }

};

module.exports = {

    rules: {

        "only-import-below": {
            meta: {
                type: "suggestion",
                docs: {
                    description: "Only allow imports from below components"
                }
            },
            create: function(context) {
                return {
                    ImportDeclaration(node) {
                        checkImportNode(node, context);
                    }
                };
            }           
        }
    }
    
}
