'use strict';

var domain = require('domain');

function Checked(func) {
  if (!(this instanceof Checked)) return new Checked(func);
  var self = this;

  this.handlers = {};
  process.nextTick(function(){
    run(self, func);
  });
}

Checked.Error = function(code, message) {
  var err = new Error(message);

  err._check = code;

  return err;
};

function run(check, func) {
  var dom = domain.create();
  dom.on('error', function(e) {
    var _check = e._check;
    if (!_check) throw e;

    var handle = check.handlers[_check];
    if (!handle) throw e;

    handle(e);
  });
  dom.run(func);
}

Checked.prototype.on = function (key, handler) {
  this.handlers[key] = handler;

  return this; // allow chaining
};

module.exports = function () {
  return Checked;
};
