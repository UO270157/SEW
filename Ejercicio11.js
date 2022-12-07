class GeoLocalizacion {
    constructor (){
    }
    getMapaDinamicoUbicacion(){
        var centro = {lat: Number(document.getElementsByTagName("input")[0].value), lng: Number(document.getElementsByTagName("input")[1].value)};
        var mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName("main")[0],{
            zoom: 8,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
        var marcador = new google.maps.Marker({position:centro,map:mapaGeoposicionado});
        mapaGeoposicionado.setCenter(centro);
    }
}
var localizacion = new GeoLocalizacion();