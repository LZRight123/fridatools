console.log("interceptor start: ")
const resolver = new ApiResolver('objc'); //API查找器 1.ApiResolver('objc')查找OC方法 2.ApiResolver('module') 查找c方法

// hookCreateProtobufEvent();
// hookProtobufCGIWrap();
// hookWCFinderUploadTask();

// hookWWKConversationViewControllerSendMessage();
hookWCFinderUploadTask();
// hookWCFinderUploadTask1();


function hookWCFinderUploadTask() {
    let matches = resolver.enumerateMatches('-[_TtC11RingtonesV219RCVipViewController *]:');
    //调用 enumerateMatches 枚举函数，每次枚举到一个函数会调用一次 onMatch
    //，回调参数 match 包含 name 和 address 两个属性，分别代表名称和地址
    matches.forEach(f =>{
        log(`attach: ${f.name}`)
        Interceptor.attach(f.address, {
            onEnter(args) {
                try {
                    log(`${f.name}`)
                    // console.log(args[2])
                    // console.log(args[3])
                    // let param1 = args[2];
                    // log(`-[${clazzName} ${methodName} ${param1}] Thread id: ${ctx.threadId}----------------------`);
                    // let objc = new ObjC.Object(param1);
                    // printObjTree(objc);
                //   let params = [args[0]]
                //     printObjcParamFuncs('dismissIfNecessaryWithResponse', params)

                    // log(`trace ---- ${Thread.backtrace(this.context, Backtracer.ACCURATE)
                    //     .map(DebugSymbol.fromAddress)
                    //     .join('\n')} \n ----`);
                } catch (err) {
                    // log(err.stack)
                }
            },
            onLeave(retval) {
                
                // console.log(args[3])
                // log(`return ${retval}`)
                // log(`${f.name} Thread id: ${this.threadId} ----------------------\n\n`)
            }
        })
    })
}

function hookWCFinderUploadTask1() {
    let matches = resolver.enumerateMatches('-[WWKUserInfoDataSource *]:');
    //调用 enumerateMatches 枚举函数，每次枚举到一个函数会调用一次 onMatch
    //，回调参数 match 包含 name 和 address 两个属性，分别代表名称和地址
    matches.forEach(f =>{
        log(`attach: ${f.name}`)
        Interceptor.attach(f.address, {
            onEnter(args) {
                try {
                    log(`${f.name}`)
                    console.log(args[2].readUtf8String())
                //   let params = [args[0]]
                //     printObjcParamFuncs('dismissIfNecessaryWithResponse', params)

                    // log(`trace ---- ${Thread.backtrace(this.context, Backtracer.ACCURATE)
                    //     .map(DebugSymbol.fromAddress)
                    //     .join('\n')} \n ----`);
                } catch (err) {
                    log(err.stack)
                }
            },
            onLeave(retval) {
                // log(`return ${retval}`)
                // log(`${f.name} Thread id: ${this.threadId} ----------------------\n\n`)
            }
        })
    })
}
function hookWWKConversationViewControllerSendMessage() {
    let objcParamFuncs = [
        "-[WWKConversationViewController sm_sendTextMessage:]",
        "-[WWKConversationViewController sm_sendLocation:]",
        "-[WWKConversationViewController sm_sendMessage:]",
        "-[WWKConversationViewController sm_sendVoiceMessage:duration:]",
        "-[WWKConversationViewController sm_sendFile:withFileName:]",
        "-[WWKConversationViewController sm_sendFilePath:withFileName:]",
        "-[WWKConversationViewController sm_sendImage:isHD:completionBlk:]",
        "-[WWKConversationViewController sm_sendImage:isHD:]",
        "-[WWKConversationViewController sm_sendImageWithData:isHD:]",
        "-[WWKConversationViewController sm_sendImageWithData:isHD:completionBlk:]",
        "-[WWKConversationViewController sm_sendEmotionWithData:height:width:isDynamic:]",
        "-[WWKConversationViewController sm_sendMessage:completion:]"
    ]
    // let numberParamsFuncs = [
    //     "-[ProtobufCGIWrap setM_uiChannelType:]",
    //     "-[ProtobufCGIWrap setM_uiScene:]",
    //     "-[ProtobufCGIWrap setM_uiCgi:]",
    //     "-[ProtobufCGIWrap setM_uiRequestEncryptType:]"
    // ]
    // let noParamsFuncs = [
    //     // "-[ProtobufCGIWrap m_pbRequest]"
    // ]
    let matches = resolver.enumerateMatches('-[WWKConversationViewController *]:');

    matches
    .filter(f => objcParamFuncs.includes(f.name))
    .forEach(f => {
        log(`attach: ${f.name}`)
        Interceptor.attach(f.address, {
            onEnter(args) {
                try {
                    let interceptorCtx = this;
                    let clazzName = 'WWKConversationViewController';
                    printObjcParamFuncs(clazzName, args, interceptorCtx)
                } catch(err) {
                    log(err.stack)
                }
            },
            onLeave(retval) {
                log(`return ${retval}`)
                log(`${f.name} Thread id: ${this.threadId} ----------------------\n\n`)
            }
        })
    });
}


// hookUploadVedio();

function hookUploadVedio() {
    console.log("11111");
    resolver.enumerateMatches('-[WCFinderUploadTask *]:',{
    onMatch: function (match) {
        const mtdname = match['name'];
        const imp = match['address'];
        console.log(mtdname + ":" + imp);
    },
    // onLeave(retval){},//函数返回需要执行的代码retval 是返回的参数

});
}

//WWKConversationViewController textView:shouldChangeTextInRange:replacementText:




function hookProtobufCGIWrap() {
    let objcParamFuncs = [
        "-[ProtobufCGIWrap setM_nsCgiName:]",
        "-[ProtobufCGIWrap setM_nsUri:]",
        "-[ProtobufCGIWrap setM_dtResponseDecryptKey:]",
        "-[ProtobufCGIWrap setM_pbRequest:]",
        "-[ProtobufCGIWrap setM_pbResponse:]"
    ]
    let numberParamsFuncs = [
        "-[ProtobufCGIWrap setM_uiChannelType:]",
        "-[ProtobufCGIWrap setM_uiScene:]",
        "-[ProtobufCGIWrap setM_uiCgi:]",
        "-[ProtobufCGIWrap setM_uiRequestEncryptType:]"
    ]
    let noParamsFuncs = [
        // "-[ProtobufCGIWrap m_pbRequest]"
    ]
    let matches = resolver.enumerateMatches('-[ProtobufCGIWrap *]:');

    matches
    .filter(f => objcParamFuncs.includes(f.name) || numberParamsFuncs.includes(f.name) || noParamsFuncs.includes(f.name))
    .forEach(f => {
        log(`attach: ${f.name}`)
        Interceptor.attach(f.address, {
            onEnter(args) {
                try {
                    let interceptorCtx = this;
                    let clazzName = 'ProtobufCGIWrap';
                    if (numberParamsFuncs.includes(f.name)) {
                        printNumberParamFuncs(clazzName, args, interceptorCtx)
                    } else if (noParamsFuncs.includes(f.name)) {
                        printNoParamFuncs(clazzName, args, interceptorCtx)
                    } else {
                        printObjcParamFuncs(clazzName, args, interceptorCtx)
                    }
                } catch(err) {
                    log(err.stack)
                }
            },
            onLeave(retval) {
                log(`return ${retval}`)
                log(`${f.name} Thread id: ${this.threadId} ----------------------\n\n`)
            }
        })
    });
}

function hookCreateProtobufEvent(){
    resolver.enumerateMatches('-[EventService internalCreateProtobufEvent:Flag:EventType:]:')
    .forEach(f => {
        log(`attach: ${f.name}`)
        Interceptor.attach(f.address, {
            onEnter(args) {
                try {
                    let ctx = this;
                    // let params = [args[0], args[1], args[2].m_pbRequest]
                    // printObjcParamFuncs('EventService', params, ctx)
                    let objcArg2 = new ObjC.Object(args[2]);
                    let m_pbRequest = objcArg2['- m_pbRequest']();
                    // let methods = listObjMethods(objcArg2)
                    // log(methods)

                    printObjTree(m_pbRequest);
                } catch(err) {
                    log(err.stack)
                }
            },
            onLeave(retval) {
                log(`return ${retval}`)
                log(`${f.name} Thread id: ${this.threadId} ----------------------\n\n`)
            }
        })
    })
}



function printNumberParamFuncs(clazzName, args, ctx) {
    let methodName = args[1].readUtf8String();
    let param1 = args[2];
    log(`-[${clazzName} ${methodName} ${param1}] Thread id: ${ctx.threadId}----------------------`);
}

function printNoParamFuncs(clazzName, args, ctx) {
    let methodName = args[1].readUtf8String();
    log(`-[${clazzName} ${methodName}] Thread id: ${ctx.threadId}----------------------`);
    log(`trace ---- ${Thread.backtrace(ctx.context, Backtracer.ACCURATE)
        .map(DebugSymbol.fromAddress)
        .join('\n')} \n ----`);
}

function printObjcParamFuncs(clazzName, args, ctx) {
    let methodName = args[1].readUtf8String();
    let param1 = args[2];
    log(`-[${clazzName} ${methodName} ${param1}] Thread id: ${ctx.threadId}----------------------`);
    let objc = new ObjC.Object(param1);
    printObjTree(objc);
}

function log(s) {
    console.log(s)
}

function listObjMethods(obj) {
    // console.log(obj.$ownMethods)
    return obj.$ownMethods
    .filter(method => !method.startsWith('+'))
    .filter(method => !method.startsWith('- set'))
    .filter(method => typeof obj[method] == 'function')
    // .filter(method => !method.startsWith('unarchiveWithWCTValue'))
}

function isNsClass(name, word) {
    return name.includes("NS") && name.includes(word)
}

function isSKBuiltin(name) {
    return name.includes("SKBuiltin")
}

function isObjInstance(obj) {
    return obj != null && obj.$kind != undefined && obj.$kind == 'instance'
}

function printSKBuiltinObj(prefix, key, currentObj) {
    switch(currentObj.$className) {
      case 'SKBuiltinBuffer_t':
        let skBufferLen = currentObj['iLen']();
        if (key == '- objectDesc') {
            log(`${prefix}${key}: ${currentObj.$className} = Buffer(${skBufferLen}) xml ---`)
            let data = currentObj['buffer']()
            let xmlStr = data.bytes().readUtf8String(data.length());
            log(`${prefix} ${xmlStr}`)
            log(`${prefix} --- xml`)
        } else {
            log(`${prefix}${key}: ${currentObj.$className} = Buffer(${skBufferLen})`)
        }
        break;
      case 'SKBuiltinInt32_t':
      case 'SKBuiltinChar_t':
      case 'SKBuiltinInt8_t':
      case 'SKBuiltinInt16_t':
        log(`${prefix}${key}: ${currentObj.$className} = ${currentObj['iVal']()}`);
        break;
      case 'SKBuiltinUint32_t':
      case 'SKBuiltinUchar_t':
      case 'SKBuiltinUint8_t':
      case 'SKBuiltinUint16_t':
        log(`${prefix}${key}: ${currentObj.$className} = ${currentObj['uiVal']()}`);
        break;
      case 'SKBuiltinInt64_t':
        log(`${prefix}${key}: ${currentObj.$className} = ${currentObj['llVal']()}`);
        break;
      case 'SKBuiltinUint64_t':
        log(`${prefix}${key}: ${currentObj.$className} = ${currentObj['ullVal']()}`);
        break;
      case 'SKBuiltinFloat32_t':
        log(`${prefix}${key}: ${currentObj.$className} = ${currentObj['fVal']()}`);
        break;
      case 'SKBuiltinDouble64_t':
        log(`${prefix}${key}: ${currentObj.$className} = ${currentObj['dVal']()}`);
        break;
      case 'SKBuiltinString_t':
        log(`${prefix}${key}: ${currentObj.$className} = ${currentObj['string']()}`);
        break;
    }
  }

function printObjTree(obj) {
    let stack = [];
    stack.push(['', obj, '']);
    while (stack.length > 0) {
        let params = stack.pop();
        let key = params[0];
        let currentObj = params[1];
        let prefix = params[2];

        if (isObjInstance(currentObj)) {
            if (isSKBuiltin(currentObj.$className)) {
                printSKBuiltinObj(prefix, key, currentObj)
            } else if (isNsClass(currentObj.$className, 'Data')) {
                log(`${prefix}${key}: ${currentObj.$className} = Data(${currentObj.length()})`)
            } else if (isNsClass(currentObj.$className, 'Number')) {
                log(`${prefix}${key}: ${currentObj.$className} = ${currentObj}`)
            } else if (isNsClass(currentObj.$className, 'Integer')) {
                log(`${prefix}${key}: ${currentObj.$className} = ${currentObj}`)
            } else if (isNsClass(currentObj.$className, 'Decimal')) {
                log(`${prefix}${key}: ${currentObj.$className} = ${currentObj}`)
            } else if (isNsClass(currentObj.$className, 'String')) {
                log(`${prefix}${key}: ${currentObj.$className} = ${currentObj.UTF8String()}`)
            } else if (isNsClass(currentObj.$className, 'Array')) {
                let arrayLength = currentObj.count().valueOf();
                log(`${prefix}${key}: ${currentObj.$className}(${arrayLength})`)
                for (var i = 0; i < arrayLength; i++) {
                let e = currentObj.objectAtIndex_(i);
                stack.push([key, e, prefix + '\t']);
                }
            } else if (isNsClass(currentObj.$className, 'Set')) {
                let setLength = currentObj.count().valueOf();
                log(`${prefix}${key}: ${currentObj.$className}(${setLength})`)
                let enumerator = currentObj.objectEnumerator();
                var e;
                while ((e = enumerator.nextObject()) !== null) {
                stack.push([key, e, prefix + '\t']);
                }
            } else if (isNsClass(currentObj.$className, 'Dict')) {
                let dictLength = currentObj.count().valueOf();
                log(`${prefix}${key}: ${currentObj.$className}(${dictLength})`)
                let enumerator = currentObj.keyEnumerator();
                var dictKey;
                while ((dictKey = enumerator.nextObject()) !== null) {
                var dictValue = currentObj.objectForKey_(dictKey);
                stack.push([dictKey, dictValue, prefix + '\t']);
                }
            } else {
                if (currentObj.$moduleName.includes('WeChat')){
                let methods = listObjMethods(currentObj);
                log(`${prefix}${key}: ${currentObj.$className} (${methods.length})`)

                methods.forEach(method => {
                    let property = currentObj[method]();
                    stack.push([method, property, prefix + '\t']);
                })
                } else {
                log(`${prefix}${key}: ${currentObj.$className} ${currentObj.$moduleName} = ${currentObj}`)
                }
            }

        } else {
            log(`${prefix}${key}: ${typeof currentObj} = ${currentObj}`)
        }
    }
}