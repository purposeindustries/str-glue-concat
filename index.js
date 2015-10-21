'use strict';

var lastChar = require('last-char');
var assert = require('assert');

function assertString(value) {
  assert(typeof value === 'string', 'Value must be a string.');
}

function assertArray(value) {
  assert(Array.isArray(value), 'Value must be an array.');
}

module.exports = function concat(strings, glue) {

  assertArray(strings);

  if (typeof glue == 'undefined') {
    glue = '/';
  }

  assertString(glue);

  if (glue === '') {
    return strings.join('');
  }

  return (strings).reduce(function (prev, current, i, arr) {
    assertString(current);
    prev += current + (
      (i < arr.length - 1 && lastChar(current) !== glue) ?
        glue :
        ''
    );
    return prev;
  }, '');
};
