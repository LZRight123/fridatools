

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
