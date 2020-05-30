module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        "airbnb",
        "plugin:react/recommended",
        "prettier",
        "prettier/react"
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true,
            experimentalObjectRestSpread: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: ["react", "jsx-a11y", "import", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
    }
};
