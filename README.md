> Note: this repository is archived since [we stopped using it in DCR](https://github.com/guardian/dotcom-rendering/pull/4979)

# Dotcom-Rendering Lint Rules

Eslint plugins and rules for dotcom rendering components. Currently supports the following rules

## only-import-from-below

Only allows react components to import code from our core utils, or from beneith themselves.

```
    rules: {
        'dcr/only-import-below': [
            'warn',            
            {
                allowedImports: [
                    "react",
                    "emotion",
                    "jsdom",
                    "curlyquotes",
                    "react-dom",
                    "@guardian/pasteup",
                    "@frontend/lib/"
                ]
            }
        ]

```
