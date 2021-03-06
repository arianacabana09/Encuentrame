// Google Maps
function initMap(){
  var laboratoriaLima = {lat: -12.119127, lng: -77.0349046};
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: laboratoriaLima
  });

  var markadorLaboratoria = new google.maps.Marker({
    position: laboratoriaLima,
    map: map
  });

  function buscar(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(functionExito, functionError);
    }
  }

  var latitud, longitud;
  var functionExito = function(position){
    latitud=position.coords.latitude;
    longitud=position.coords.longitude;

    map.setZoom(18);
    map.setCenter({lat:latitud, lng:longitud});

    var miUbicacion =  new google.maps.Marker({
      position:{lat: latitud, lng: longitud}, map: map
    });
  }

  var functionError = function(error){
    alert("Tenemos un problema con encontrar tu ubicacion");
  }

  document.getElementById("encuentrame").addEventListener("click",buscar);

  //input 4 4 2 2
  var inputPartida = document.getElementById("input-partida");
  var inputDestino = document.getElementById("input-destino");

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var tarifa = document.getElementById("tarifa");
  var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING',
    }, function(response, status){
      if (status === 'OK') {
        var distancia = Number((response.routes[0].legs[0].distance.text.replace("km","")).replace(",","."));
        tarifa.classList.remove("none");
        console.log((response.routes[0].legs[0].distance.text));
        var costo = distancia*1.75;
        if (costo < 4) {
          tarifa.innerHTML = "S/. 4";
        }
        // console.log(costo);

        tarifa.innerHTML = "S/. " + parseInt(costo);
        directionsDisplay.setDirections(response);
        // miUbicacion.setMap(null);
      } else {
        window.alert("No encontramos una ruta.");
      }
    });
  }

  directionsDisplay.setMap(map);
  var trazarRuta = function(){
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  document.getElementById("trazar-ruta").addEventListener("click", trazarRuta);
}
