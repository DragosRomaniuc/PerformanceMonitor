var NwBuilder = require('nw-builder');

var nw = new NwBuilder({
    files: 'D:\\Adi\\NodeJs\\Workspaces\\PerformanceLoad\\nodeClient', // use the glob format
    platforms: ['osx64', 'win64'],
    version: '0.1.2'
});
 
// Log stuff you want
nw.on('log',  console.log);
 
nw.build().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});