
const path = require('path');

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

                        const allowedImports = context.options[0].allowedImports;

                        const importStatementLiteral = node.source.value;
                        const sourceFilePath = context.getFilename();
                        const resolvedImportStatementPath = path.resolve(
                            path.dirname(sourceFilePath),
                            importStatementLiteral
                        );

                        // TODO: Create be a config option to tell the rule where the components live instead of hardcoding it

                        const isAllowed = (i) => allowedImports.filter((e)=>i.startsWith(e)).length > 0;

                        const isComponent = sourceFilePath.includes("/packages/frontend/amp/components/");

                        if(isComponent && importStatementLiteral.startsWith(".")){

                            // relative import

                            if( !resolvedImportStatementPath.startsWith(path.dirname(sourceFilePath))){
                                context.report(node, "DCR Components can only import core libraries, or modules that exist below themselves: " + resolvedImportStatementPath);
                            }
                            
                        } else if(isComponent && importStatementLiteral.startsWith("@") && !isAllowed(importStatementLiteral)) {

                            // @package import

                            const syntheticPath = process.cwd() + importStatementLiteral.replace("@", "/packages/")

                            if( !syntheticPath.startsWith(path.dirname(sourceFilePath))){
                                context.report(node, "DCR Components can only import core libraries, or modules that exist below themselves:" + importStatementLiteral);
                            }

                        } else if(isComponent && !isAllowed(importStatementLiteral)) {

                            // absolute import

                            context.report(node, "DCR Components with non-relative imports must use the @ syntax" + importStatementLiteral);

                        }
                       
                    }
                };
            }           
        }
    }
    
}
