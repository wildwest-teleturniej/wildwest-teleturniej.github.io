module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        config: "./build/webpack.dev.js",
      }
    }
  },
  rules: {
    "import/no-commonjs": ["error", "always"],
    "import/prefer-default-export": 0,

    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/href-no-hash": 0,
    "jsx-a11y/media-has-caption": 0,

    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-no-bind": 0,
    "react/no-danger": 0,
    "react/prefer-stateless-function": 0,
    "react/no-deprecated": 0,
    "react/prop-types": 0,
    "react/jsx-curly-spacing": [2, {"when": "always", "allowMultiline": false}],

    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }],

    "one-var": ["error", "never"],
    "semi": ["error", "always"],
    "array-bracket-spacing": ["error", "always"],
    "quotes": ["error", "double"],
    "no-console": 0,
    "space-in-parens": ["error", "always"],
    "prefer-template": "warn",
    "eol-last": 0,
    "quote-props": ["error", "as-needed"],
    "indent": ["error", 2, { "SwitchCase": 1, "MemberExpression": 1 }],
    "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-trailing-spaces": 0,
    "func-names": 0,
    "linebreak-style": 0,
    "no-plusplus": 0,
    "computed-property-spacing": ["error", "always"],
    "template-curly-spacing": ["error", "always"],
    "no-mixed-operators": ["error", {"allowSamePrecedence": true}]
  }
}
