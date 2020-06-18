// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverageFrom: [
    "src/pages/**/*.tsx",
    "src/components/**/*.tsx",
    "src/hooks/*.tsx",
    "!src/hooks/index.tsx",
  ],
};
