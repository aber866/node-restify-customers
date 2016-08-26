"use strict";

const
    MAX_COMPLEXITY = 6,
    INDENT_SPACES = 4,
    MAX_LENGTH = 120,
    TAB_SIZE = INDENT_SPACES,
    MAX_DEPTH = 4,
    MAX_NESTED_CALLBACKS = 4,
    MAX_PARAMS = 6,
    MAX_STATEMENTS = 15,
    NAME_EXCEPTIONS = ["i", "j", "x", "y", "z", "r", "id", "e", "ex",
        "to", "db", "os", "fs", "fn", "cb", "vm", "$q"];


module.exports = {
    "root": true,
    "rules": {

        // Posible errors

        "no-empty": 2, // TODO this rule will catch empty functions in version 2
        "no-console": 2,
        "no-unexpected-multiline": 2,


        // Best Practices

        "block-scoped-var": 2,
        "complexity": [2, MAX_COMPLEXITY],
        "consistent-return": 2,
        "curly": [2, "multi-line"],
        "default-case": 2,
        "dot-location": [2, "property"],
        "dot-notation": 2,
        "eqeqeq": 2,
        "guard-for-in": 2,
        "no-alert": 2,
        "no-caller": 2,
        "no-case-declarations": 2,
        "no-div-regex": 2,
        "no-else-return": 2,
        "no-empty-label": 2,
        "no-eval": 2,
        "no-extend-native": 2,
        "no-extra-bind": 2,
        "no-floating-decimal": 2,
        "no-implicit-coercion": 2,
        "no-implied-eval": 2,
        "no-invalid-this": 2,
        "no-iterator": 2,
        "no-labels": 2,
        "no-lone-blocks": 2,
        "no-loop-func": 2,
        "no-magic-numbers": [2, { "ignore": [-1, 0, 1, 2] }],
        "no-multi-spaces": 2,
        "no-multi-str": 2,
        "no-native-reassign": 2,
        "no-new-func": 2,
        "no-new-wrappers": 2,
        "no-new": 2,
        "no-octal-escape": 2,
        "no-param-reassign": [1, { "props": true }],
        "no-process-env": 2,
        "no-proto": 2,
        "no-redeclare": [2, { "builtinGlobals": true }],
        "no-return-assign": 2,
        "no-script-url": 2,
        "no-self-compare": 2,
        "no-sequences": 2,
        "no-throw-literal": 2,
        "no-unused-expressions": 2,
        "no-useless-call": 2,
        "no-useless-concat": 2,
        "no-void": 2,
        "no-warning-comments": 1,
        "no-with": 2,
        "radix": [2, "as-needed"],
        "vars-on-top": 2,
        "wrap-iife": [2, "outside"],
        "yoda": [2, "never"],


        // Strict Mode

        "strict": [2, "global"],


        // Variables

        "init-declarations": [0, "always"], // TODO needs evaluation
        "no-catch-shadow": 2,
        "no-label-var": 2,
        "no-shadow-restricted-names": 2,

        // TODO Connect later
        "no-shadow": [1, { "builtinGlobals": true, "hoist": "all", "allow": [] }],
        "no-undef-init": 2,
        "no-undef": [2, { typeof: true }],
        "no-undefined": 1,
        "no-unused-vars": 2,
        "no-use-before-define": 2,


        // Node.js and CommonJS

        "callback-return": 2,
        "global-require": 1,
        "handle-callback-err": 2,
        "no-mixed-requires": 0,
        "no-new-require": 2,
        "no-path-concat": 2,
        "no-process-exit": 2,
        "no-sync": 2,

        // Stylistic Issues

        "array-bracket-spacing": [1, "never"],
        "block-spacing": [2, "always"],
        "brace-style": 2,
        "camelcase": 2,
        "comma-spacing": [2, { "before": false, "after": true }],
        "comma-style": [2, "last"],
        "computed-property-spacing": [2, "never"],
        "consistent-this": [1, "self"],
        "eol-last": 2,
        "func-names": 0,
        "func-style": [2, "declaration"],
        "id-length": [1, { "min": 3, "max": 25, "properties": "never", "exceptions": NAME_EXCEPTIONS }],
        "id-match": 0,
        "indent": [2, INDENT_SPACES, { "VariableDeclarator": 1 }],
        "jsx-quotes": [0, "prefer-double"],
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        "linebreak-style": [2, "unix"],
        "lines-around-comment": [1, { "beforeBlockComment": true, "beforeLineComment": true }],
        "max-depth": [2, MAX_DEPTH],
        "max-len": [2, MAX_LENGTH, TAB_SIZE],
        "max-nested-callbacks": [2, MAX_NESTED_CALLBACKS],
        "max-params": [1, MAX_PARAMS],
        "max-statements": [1, MAX_STATEMENTS],
        "new-cap": [2, { "capIsNewExceptions": ["express.Router"] }],
        "new-parens": 2,
        "newline-after-var": [0, "always"], // TODO need eval.
        "no-array-constructor": 2,
        "no-bitwise": 2,
        "no-continue": 2,
        "no-inline-comments": 0,
        "no-lonely-if": 2,
        "no-mixed-spaces-and-tabs": 2,
        "no-multiple-empty-lines": [2, { "max": 3, "maxEOF": 1 }],
        "no-nested-ternary": 2,
        "no-new-object": 2,
        "no-plusplus": 2,
        "no-restricted-syntax": 0,
        "no-spaced-func": 2,
        "no-ternary": 0,
        "no-trailing-spaces": [2, { "skipBlankLines": false }],
        "no-underscore-dangle": [2, { "allow": ["_id"] }], // Allow mongo _id
        "no-unneeded-ternary": [2, { "defaultAssignment": true }],
        "object-curly-spacing": [1, "always"], // TODO enable after migration
        "one-var": [2, "always"],
        "operator-assignment": [2, "always"],
        "operator-linebreak": [2, "after"],
        "padded-blocks": [0, "always"], // TODO Needs evaluation
        "quote-props": [2, "as-needed", { "unnecessary": false }],
        "quotes": [2, "double"],
        "require-jsdoc": 0, // TODO In evaluation
        "semi-spacing": [2, { "before": false, "after": true }],
        "semi": [2, "always"],
        "sort-vars": 0,
        "space-after-keywords": [2, "always"],
        "space-before-blocks": [2, "always"],
        "space-before-function-paren": [1, "always"], // TODO enable after migration
        "space-before-keywords": [2, "always"],
        "space-in-parens": [2, "never"],
        "space-infix-ops": [2, { "int32Hint": false }],
        "space-return-throw-case": 2,
        "space-unary-ops": [2, { "words": true, "nonwords": false }],
        "spaced-comment": [1, "always"],
        "wrap-regex": 2,


        // ECMAScript 6

        "arrow-body-style": [2, "as-needed"],
        "arrow-parens": [2, "always"],
        "arrow-spacing": [2, { "before": true, "after": true }],
        "constructor-super": 2,
        "generator-star-spacing": [2, { "before": false, "after": true }],
        "no-arrow-condition": 2,
        "no-class-assign": 2,
        "no-const-assign": 2,
        "no-dupe-class-members": 2,
        "no-this-before-super": 2,
        "no-var": 1,
        "object-shorthand": [1, "always"],
        "prefer-arrow-callback": 0,
        "prefer-const": 1,
        "prefer-reflect": 0, // Not available in node 4 or 5
        "prefer-spread": 0, // Not available
        "prefer-template": 0, // TODO needs performance considaration
        "require-yield": 2

    },
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended"
};
