
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