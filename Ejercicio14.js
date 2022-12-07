class Ejercicio14 {
    constructor (){
    }
    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud = posicion.coords.longitude; 
        this.latitud = posicion.coords.latitude;  
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;       
    }
    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }
    cargarArchivo(archivo){
        var centro = {lat: 43.3672702, lng: -5.8502461};
        var mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName("main")[0],{
            zoom: 8,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
        mapaGeoposicionado.setCenter(centro);

        var lector = new FileReader();
        lector.onload = function (evento) {
            var xml = $.parseXML(lector.result),
            $xml = $(xml),
            $placemarks = $xml.find("Placemark");
        
            $.each($placemarks, function() {
                var name=$(this).children("name").text();
                var coordinatesTXT=$(this).children("Point").children("coordinates").text();
                var coordinates = { lat: Number.parseFloat(coordinatesTXT.split(",")[1]), lng: Number.parseFloat(coordinatesTXT.split(",")[0])};
                
                var marker = new google.maps.Marker({
                    position: coordinates,
                    map: mapaGeoposicionado,
                    label: {
                    text: name,
                    color: "black",
                    fontWeight: "bold"
                    },
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });
            });  
        }      
        lector.readAsText(archivo);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              var marcador = new google.maps.Marker({
                position:pos,
                map:mapaGeoposicionado,
                label: {
                    text: "TU",
                    color: "black",
                    fontWeight: "bold"
                    },
                });
              mapaGeoposicionado.setCenter(pos);
            });
      }
    }

    dragOverHandler(event) {
        event.preventDefault();
    }
      
    dropHandler(event) {
        event.preventDefault();  
        this.cargarArchivo(event.dataTransfer.items[0].getAsFile());
    }
}
var ejercicio = new Ejercicio14();