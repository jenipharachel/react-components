#!/usr/bin/env node

/**
 * This example script expects a JSON blob generated by react-docgen as input,
 * e.g. react-docgen components/* | buildDocs.sh
 */

var fs = require('fs');
var reactDocs = require('react-docgen');
var generateMarkdown = require('./generateMarkdown');
var path = require('path');

var paths = [
  // 'background-dimmer/BackgroundDimmer',
  // 'dropdown/Dropdown',
  // 'loading-spinner/LoadingSpinner',
  // 'mobile-detector/MobileDetector',
  ['flex','FlexView']
];

function getComponentName(filepath) {
  var name = path.basename(filepath);
  var ext;
  while ((ext = path.extname(name))) {
    name = name.substring(0, name.length - ext.length);
  }
  return name;
}

paths.forEach(function(p) {
  var folderpath = path.resolve(__dirname, '../src', p[0]);
  var filepath = path.resolve(folderpath, p[1] + '.js');
  var component = fs.readFileSync(filepath, 'utf8');

  var name = getComponentName(filepath);
  var docs = reactDocs.parse(component);
  var markdown = generateMarkdown(name, docs);

  fs.writeFileSync(path.resolve(folderpath, 'README.md'), markdown);
  process.stdout.write(folderpath + ' -> ' + 'README.md\n');
});
