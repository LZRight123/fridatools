(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


const resolver = new ApiResolver('objc'); //API查找器 1.ApiResolver('objc')查找OC方法 2.ApiResolver('module') 查找c方法


function hook_ocMethod(oc_method, onEnter, onLeave) {
    let matches = resolver.enumerateMatches(oc_method);
    matches.forEach(f => {
        console.log(`attach: ${f.name}`)
        Interceptor.attach(f.address, {
            onEnter(args) {
                try {
                    console.log(`${f.name}`)
                    if (typeof onEnter == "function") {
                        onEnter(args)
                    }
                } catch (err) {
                }
            },
            onLeave(retval) {
                try {
                    if (typeof onLeave == "function") {
                        onLeave(retval)
                    }
                } catch (err) {
                };
            }
        })
    })
};


function hook_sub_address(ida_addresss, onEnter, onLeave) {
    var _file_offset = get_func_addr(ida_addresss - 0x100000000);
    // var sub_offset = new NativeFunction(_file_offset, 'int', ['int']);
    // Interceptor.replace(sub_offset, new NativeCallback(function(num1) {
    //    // 调用原函数
    //    return 0;
    // //    return sub_offset(num1);
    // }, 'int', ['int']));
    console.log(`attach address: ${_file_offset}`)
    Interceptor.attach(ptr(_file_offset), {
        onEnter: function (args) {
            try {
                if (typeof onEnter == "function") {
                    onEnter(args)
                }
            } catch (err) {
            }
        },
        onLeave: function (retval) {
            try {
                if (typeof onLeave == "function") {
                    onLeave(retval)
                }
            } catch (err) {
            };
        }
    });
}

function get_func_addr(file_address) {
    return get_func_addr_for_module('wework', file_address);
}

function get_func_addr_for_module(module, offset) {
    var base_addr = Module.findBaseAddress(module);
    // console.log("base_addr: " + base_addr);
    var func_addr = base_addr.add(offset);
    return func_addr;
    // if (Process.arch == 'arm')
        // return func_addr.add(1);  //如果是32位地址+1        
}

function logHexPtr(func_addr) {
    console.log(hexdump(ptr(func_addr), {
        length: 16,
        header: true,
        ansi: true
    }))
}

module.exports = {
    hook_ocMethod,
    hook_sub_address,
    get_func_addr,
    get_func_addr_for_module,
    logHexPtr
};

},{}],2:[function(require,module,exports){
"use strict";
require("./main.js");

},{"./main.js":4}],3:[function(require,module,exports){
(function (global){(function (){

global.nickname = "liangze"
console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nrestart");
var zyb = require("../common/hooktools")

// zyb.hook_ocMethod("-[WWKTeamUIManager *]", args => {
    
// })

zyb.hook_sub_address(0x1035625D8, args => {
    console.log("onEnter");
    var num1 = args[0];
    var num2 = args[1];


    console.log("num1: " + num1);
    console.log("num2: " + num2);
}, retval => {
    console.log("onLeave: ", retval);
});



function start_stalker(mainThreadId, start, size){
    Stalker.follow(mainThreadId, {
          transform: function (iterator) {
              var instruction = iterator.next();
              const startAddress = instruction.address;
              var isModule = startAddress.compare(start) >= 0 && startAddress.compare(start.add(size)) < 0;
              do{
                if (isModule){
                  console.log(instruction.address + ":" + instruction);
                }
                iterator.keep();
             } while ((instruction = iterator.next()) !== null);
          }
        });
}
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../common/hooktools":1}],4:[function(require,module,exports){

// require("./test.js");


require("./logout/logoutoc")

},{"./logout/logoutoc":3}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tbW9uL2hvb2t0b29scy5qcyIsInNyYy9pbmRleC50cyIsInNyYy9sb2dvdXQvbG9nb3V0b2MuanMiLCJzcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDekZBLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7OztBQ0FyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIn0=
