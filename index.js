
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
                        
                        // node.source.value contains the import literal.
                        // filename is the name of the source file

                        var fileName = context.getFilename();

                        if(!fileName !== "<text>" && node.source.value.startsWith(".")){
                            context.report(node, "Do not use relative imports: " + node.source.value);
                        }
                       
                    }
                };
            }           
        }
    }
    
}
