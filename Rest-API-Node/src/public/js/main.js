var map = L.map('map-template').setView([51.505, -0.09], 3);
var cont =0;
const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png' 
const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

const tile = L.tileLayer(tileURL2);

// Socket Io
const socket = io.connect();



// Geolocation
map.locate({enableHighAccuracy: true})
map.on('locationfound', (e) => {
  const coords = [e.latlng.lat, e.latlng.lng];
  const newMarker = L.marker(coords);
  newMarker.bindPopup('You are Here!');
  map.addLayer(newMarker);
  socket.emit('userCoordinates', e.latlng);
});

// socket new User connected
socket.on('newUserCoordinates', (coords) => {
  console.log(coords);
  const userIcon = L.icon({
    iconUrl: '/img/icon.png',
    iconSize: [38, 42],
  })
  const newUserMarker = L.marker([coords.lat + cont, coords.lng +cont], {
    icon: userIcon 
  });
  cont ++
  newUserMarker.bindPopup('New User!');
  map.addLayer(newUserMarker);
}); 

map.addLayer(tile);
