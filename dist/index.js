(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const o = new ApiResolver("objc");

function t(t, e, n) {
  o.enumerateMatches(t).forEach((o => {
    console.log(`attach: ${o.name}`), Interceptor.attach(o.address, {
      onEnter(t) {
        try {
          console.log(`${o.name}`), "function" == typeof e && e(t);
        } catch (o) {}
      },
      onLeave(o) {
        try {
          "function" == typeof n && n(o);
        } catch (o) {}
      }
    });
  }));
}

function e(o, t, e) {
  var c = n(o - 4294967296);
  console.log(`attach address: ${c}`), Interceptor.attach(ptr(c), {
    onEnter: function(o) {
      try {
        "function" == typeof t && t(o);
      } catch (o) {}
    },
    onLeave: function(o) {
      try {
        "function" == typeof e && e(o);
      } catch (o) {}
    }
  });
}

function n(o) {
  return c("wework", o);
}

function c(o, t) {
  return Module.findBaseAddress(o).add(t);
}

function r(o) {
  console.log(hexdump(ptr(o), {
    length: 16,
    header: !0,
    ansi: !0
  }));
}

module.exports = {
  hook_ocMethod: t,
  hook_sub_address: e,
  get_func_addr: n,
  get_func_addr_for_module: c,
  logHexPtr: r
};

},{}],2:[function(require,module,exports){
"use strict";

require("./main.js");

},{"./main.js":4}],3:[function(require,module,exports){
(function (global){(function (){
global.nickname = "liangze", console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nrestart");

var n = require("../common/hooktools");

function o(n, o, e) {
  Stalker.follow(n, {
    transform: function(n) {
      var l = n.next();
      const a = l.address;
      var r = a.compare(o) >= 0 && a.compare(o.add(e)) < 0;
      do {
        r && console.log(l.address + ":" + l), n.keep();
      } while (null !== (l = n.next()));
    }
  });
}

n.hook_sub_address(4350944728, (n => {
  console.log("onEnter");
  var o = n[0], e = n[1];
  console.log("num1: " + o), console.log("num2: " + e);
}), (n => {
  console.log("onLeave: ", n);
}));

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../common/hooktools":1}],4:[function(require,module,exports){
require("./logout/logoutoc");

},{"./logout/logoutoc":3}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tbW9uL2hvb2t0b29scy5qcyIsInNyYy9pbmRleC50cyIsInNyYy9sb2dvdXQvbG9nb3V0b2MuanMiLCJzcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDM0RBLFFBQVE7Ozs7QUNBUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN6QkE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIifQ==
