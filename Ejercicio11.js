class GeoLocalizacion {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
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
    verPosicion(){
        document.write('<p>'+ this.mensaje +'</p>'); 
        document.write('<p>Longitud: '+this.longitud +' grados</p>'); 
        document.write('<p>Latitud: '+this.latitud +' grados</p>');
        document.write('<p>Precisión de la latitud y longitud: '+ this.precision +' metros</p>');
        document.write('<p>Altitud: '+ this.altitude +' metros</p>');
        document.write('<p>Precisión de la altitud: '+ this.precisionAltitud +' metros</p>'); 
        document.write('<p>Rumbo: '+ this.rumbo +' grados</p>'); 
        document.write('<p>Velocidad: '+ this.velocidad +' metros/segundo</p>');
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
    getMapaEstaticoGoogle(){
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        document.write("<img src='"+this.imagenMapa+"' alt='mapa estático google' />");
    }
    getMapaDinamico(){
        var oviedo = {lat: 43.3672702, lng: -5.8502461};
        var mapaOviedo = new google.maps.Map(document.getElementsByTagName("main")[0],{zoom: 8,center:oviedo});
        var marcador = new google.maps.Marker({position:oviedo,map:mapaOviedo});
    }
}
var localizacion = new GeoLocalizacion();