/* eslint-disable @typescript-eslint/no-var-requires */
// Adapter: convert legacy .eslintrc.json to flat config using FlatCompat
const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

const compat = new FlatCompat({ baseDirectory: __dirname });
const legacy = require(path.join(__dirname, '.eslintrc.json'));

module.exports = compat.config(legacy);
