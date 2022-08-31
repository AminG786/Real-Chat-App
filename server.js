const express = require("express");
const app = express();
const http = require("http").createServer(app);

const PORT = 3159

//listen
http.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
});

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

//setup socket


const io = require("socket.io")(http)//passing server as http
//kam kis server py krnsa ha
io.on('connection',(socket)=>{
    console.log('connceted');
    socket.on('message',(msg)=>{
       socket.broadcast.emit('message',msg)
    })
})
