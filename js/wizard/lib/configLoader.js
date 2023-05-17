const os = require('os');
const yaml = require('yaml');
const readSource = require('./readSource');
const transform = require('./transform');
const renderSass = require('./renderSass');
const renderJs = require('./renderJs');

const sassComment = `// stylelint-disable
// DO NOT EDIT THIS FILE.  This is a gitignored artifact created by Webpack.
// Design tokens should be edited in components/00-config/theme-settings.yml`;

const jsComment = `/* eslint-disable */
// DO NOT EDIT THIS FILE.  This is a gitignored artifact created by Webpack.
// Design tokens should be edited in components/00-config/theme-settings.yml`;

module.exports = function (source) {
  const callback = this.async();
  try {
    readSource(source)
      .then(transform)
      .then((transformed) => {
        const sass = sassComment + os.EOL + renderSass(transformed.data);
        const js = jsComment + os.EOL + renderJs(transformed.data);
        this.emitFile('../components/00-config/_theme-settings.artifact.scss', sass);
        this.emitFile('../components/00-config/_theme-settings.es6.js', js);
        callback(null, yaml.stringify(transformed.data));
      });
    return source;
  } catch (err) {
    return callback(err);
  }
};
