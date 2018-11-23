module.exports = io =>{
    io.on('connection',(socket)=>{
        console.log('new user connect');
        //eschuchamos el evento desde el servidor
        socket.on('userCoordinates', coords => {
            console.log(coords);
            //esta parte es donde se coje las coordenadas para almacenar en la db

            socket.broadcast.emit('newUserCoordinates', coords);//renvio a los usuario mediante los socket
        });
    });
}