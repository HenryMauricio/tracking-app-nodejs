const maps=L.map('maps').setView([-0.9319,-78.6161], 9);
const socket=io();
const mapsurl="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
L.tileLayer(mapsurl).addTo(maps);
maps.locate({enableHighAccuracy:true});//localizacion precisa a traves de un evento
//evento
maps.on('locationfound', e =>{
    //crear el marcador
    console.log(e);
    const coords=[e.latlng.lat,e.latlng.lng];
    const marker=L.marker(coords);
    marker.bindPopup('estas aqui');
    maps.addLayer(marker);
    //envia en tiempo real las coordenadas a los usuarios 
    //emitimos un evento mediante socket para escuhe las coordenadas
    socket.emit('userCoordinates', e.latlng);
});

socket.on('newUserCoordinates', coords=>{
    const marker = L.marker([coords.lat+1,coords.lng+1]);
    marker.bindPopup("new user");
    maps.addLayer(marker);
});
//const marker=L.marker([-0.9319,-78.6161]);
//marker.bindPopup('yo');
//maps.addLayer(marker);
//Cálculo de rutas en un mapa 
L.Routing.control({
    waypoints: [
        L.latLng(-0.9319,-78.6161),
        L.latLng(-0.2298500,-78.5249500)
    ]
}).addTo(maps);