"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(username, email, password) {
    _classCallCheck(this, User);

    this.username = username;
    this.email = email;
    this.password = password;
  }

  _createClass(User, [{
    key: 'register',
    value: function register() {
      console.log(this.username + 'is now registered');
    }
  }]);

  return User;
}();

var bob = new User('Bob', 'bob@bob.com', '12345');
bob.register();