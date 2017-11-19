var http = require('http');
var fs = require('fs');

const IP = '127.0.0.1';
const PORT = 8080;

console.log('\nStarting Server...');
http.createServer(function(req, res){
    console.log('Request was made:' + req.url);
    if (req.url === '/' || req.url === '/index' || req.url === '/home') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname+'/index.html').pipe(res);
    } 
    else if (req.url.indexOf('.css') !== -1) {
        res.writeHead(200, {'Content-Type':'text/css'});
        fs.createReadStream(__dirname + req.url ).pipe(res);
    }
    else if (req.url.indexOf('.js') !== -1) {
        res.writeHead(200, {'Content-Type':'text/javascript'});
        fs.createReadStream(__dirname + req.url ).pipe(res);
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname+'/404.html').pipe(res);
    }

}).listen(PORT);
console.log('Server running at http://'+ IP + ':' + PORT);
