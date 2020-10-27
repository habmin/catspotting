function initMap() {
    //Google Map initializer
    const myLatlng = { lat: 39.34, lng: -99.14 };
    const map = new google.maps.Map(document.getElementById("map"), {
        gestureHandling: "greedy",
        zoom: 4,
        center: myLatlng
    });
    let latDisplay = document.getElementById("lat");
    let lngDisplay = document.getElementById("lng");
    
    let marker = new google.maps.Marker({
        position: myLatlng
    })
    marker.setMap(map);
    const geocoder = new google.maps.Geocoder();

    //Click on map listener
    map.addListener("click", (mapsMouseEvent) => {
        marker.setMap(null);
        marker = new google.maps.Marker({
            position: mapsMouseEvent.latLng
        });
        marker.setMap(map);
        latDisplay.value = mapsMouseEvent.latLng.toJSON().lat;
        lngDisplay.value = mapsMouseEvent.latLng.toJSON().lng;
            geocoder.geocode({ location: mapsMouseEvent.latLng}, (results, status) => {
                if (status === "OK") {
                    if (results[0]) {
                        console.log(results[0]);
                        document.getElementById("location").value = results[0].formatted_address;
                    }
                }
            });
        
    });

    //Geocoder text input listener
    document.getElementById('address-submit').addEventListener('click', () => {
        geocodeAddress(geocoder, map);
    });
    
    const geocodeAddress = (geocoder, resultsMap) => {
        const address = document.getElementById('location').value;
        geocoder.geocode({address: address}, (results, status) => {
            if (status === 'OK') {
                marker.setMap(null);
                resultsMap.setCenter(results[0].geometry.location);
                resultsMap.setZoom(15);
                marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                });
                marker.setMap(map);
                latDisplay.value = results[0].geometry.location.toJSON().lat;
                lngDisplay.value = results[0].geometry.location.toJSON().lng;
            }      
        });
    };
};
