var test = require('tape');
var concat = require('./');

test(function (assert) {
  assert.equal(concat([]), '');
  assert.equal(concat(['', '', '']), '//');
  assert.equal(concat(['', '', 'a']), '//a');
  assert.equal(concat(['a', 'b', 'c']), 'a/b/c');
  assert.equal(concat(['a/', 'b', 'c/']), 'a/b/c/');
  assert.equal(concat(['a', 'b/', 'c']), 'a/b/c');
  assert.equal(concat(['a', 'b', 'c'], ':'), 'a:b:c');
  assert.equal(concat(['a', 'b', 'c'], ''), 'abc');

  [
    null,
    undefined,
    {},
    function () {},
    true,
    1,
    /abc/gi,
    'lorem ipsum'
  ].forEach(function (val) {
    assert.throws(function () {
      concat(val);
    }, /Value must be an array./);
  });

  [
    null,
    {},
    function () {},
    true,
    1,
    /abc/gi,
    [1, 2, 3]
  ].forEach(function (val) {

    assert.throws(function () {
      concat([], val);
    }, /Value must be a string./);

    assert.throws(function () {
      concat([val]);
    }, /Value must be a string./);
  });

  assert.end();
});
