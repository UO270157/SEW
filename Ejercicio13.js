class Ejercicio13 {
    constructor (){
    }
    cargarArchivo(files){
        var centro = {lat: 43.3672702, lng: -5.8502461};
        var mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName("main")[0],{
            zoom: 8,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
        mapaGeoposicionado.setCenter(centro);

        var archivo = files[0];
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
                       map: mapaGeoposicionado
                });
            });  
        }      
        lector.readAsText(archivo);
    }
}
var ejercicio = new Ejercicio13();