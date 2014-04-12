var test = require('tap').test;
var check = require('../index.js')();
var domain = require('domain');

test("unexpected errors still throw", function (t) {
  var d = domain.create();
  d.on('error', function(){
    t.end();
  })
  d.run(function() {
    check(function () {
      throw check.Error('exit', 'bad exit')
    })
  })
})

test("expected errors are handled", function (t) {
  check(function () {
    throw check.Error('exit', 'bad exit')
  })
  .on('exit', function () {
    t.end();
  })
})

test("can do multiple handlers", function (t) {
  check(function () {
    throw check.Error('exit', 'bad exit')
  })
  .on('fail', function () {
    //
  })
  .on('exit', function () {
    t.end();
  })
})
