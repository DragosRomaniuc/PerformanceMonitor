const os = require('os');
const io = require('socket.io-client');

// import config2 from './config.js';
let socket = io('https://secretserver.frespire.com');

socket.on('connect',()=>{
    // console.log("I connected to the socket server!")

    const nI = os.networkInterfaces();
    // let macA = "XX:XX:XX:XX:XX:XX".replace(/X/g, function() {
    //     return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
    //   });

    //  // FOR TESTING PURPOSES!!!
    //  macA = Math.floor(Math.random() * 3) + 1;
    //  break;
     // FOR TESTING PURPOSES!!!
     
    for(let key in nI){
        if(!nI[key][0].internal){
            macA=nI[key][0].mac;
            break;
        }
    }
   
    // client auth with single key value
    socket.emit('clientAuth','authkey1234authkey')

    performanceData().then(data=>{
        data.macA = macA
        socket.emit('initPerfData',data)
        // console.log('data',data);
    }).catch(err=>{
            
    })

    let perfDataInterval = setInterval(()=>{
        performanceData().then(perfData=>{
            perfData.macA = macA;
            socket.emit('perfData',perfData);
            // console.log('perfData',perfData)
        })
        .catch(err=>{

        })
    },300)
//at every reboot the on.connect is called again and the set interval is set again,
// we need to make sure that the setinterval is closed.
    socket.on('disconnect',()=>{
        clearInterval(perfDataInterval);
    })
})


function performanceData() {
    return new Promise(async (resolve,reject)=>{
// The os.cpus() method returns an array of objects containing information about each logical CPU core.
            const cpus = os.cpus();
// The os.freemem() method returns the amount of free system memory in bytes as an integer.
            const freeMem = os.freemem();
// The os.totalmem() method returns the total amount of system memory in bytes as an integer.
            const totalMem = os.totalmem();
            const usedMem = totalMem - freeMem;
            const memUsage = Math.floor(usedMem/totalMem*100)/100;
// The os.type() method returns a string identifying the operating system name as returned by uname(3). For example, 'Linux' on Linux, 'Darwin' on macOS, and 'Windows_NT' on Windows.
            var osType = os.type();
            if(os.type() == 'Darwin' ) osType = 'Mac';
            if(os.type() == "Windows_NT") osType = 'Windows';
            
// The os.uptime() method returns the system uptime in number of seconds.
            const upTime = os.uptime()
// The os.arch() method returns a string identifying the operating system CPU architecture for which the Node.js binary was compiled.
            const osArch = os.arch();
// CPU INFO
            const cpuModel = cpus[0].model;
            const numCores = cpus.length;
            const cpuSpeed = cpus[0].speed;
            const cpuLoad = await getCpuLoad();
            const isActive = true;
            resolve({
                freeMem,totalMem,usedMem,memUsage,osType,osArch,upTime,isActive,
                cpu:{model:cpuModel,
                    cores:numCores,
                    speed: cpuSpeed,
                    load:cpuLoad},
                    
            })

    })
}

// cpus is all cores. we need the average of all the cores which
// will give us the cpu average
function getCpuAverage(){
    const cpus = os.cpus();
    let idleMs = 0;
    let totalMs = 0;
// loop through each core
    cpus.forEach(core=>{
        // loop through each property of the current core
        for(type in core.times){
            totalMs += core.times[type];
        }
        idleMs += core.times['idle'];

    })
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length
    }
}

// because cpus.times returns data since boot, we will get now times and 100ms from now tmies, compare them and we will get the current load;
function getCpuLoad(){
    return new Promise((resolve,reject)=>{
        const start = getCpuAverage();

        setTimeout(()=>{
            const end = getCpuAverage();
            const idleDifference = end.idle - start.idle;
            const totalDifference = end.total - start.total;
            // console.log(start,end)
             // calc the % of used cpu
             const percentageCpu = 100 - Math.floor(100 * idleDifference / totalDifference);
             resolve(percentageCpu);
        },100);

    })
}
