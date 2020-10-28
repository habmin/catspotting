/****************************************
**** Google Maps API Event Listeners ****
****************************************/

/*
Creates two listeners:

1. Listens to a click on a map, places a marker where user clicks, and returns 
co-ordinates and reverse geocode location to respective form fields

2. Geocode submit listener on "Place Pin" button, takes the string value
and places a marker on first geocode result, returns co-ordinates to 
their respective form fields
*/

function mapListeners(map, marker) {
    //Get latitude and longitude HTML fields
    let latDisplay = document.getElementById("lat");
    let lngDisplay = document.getElementById("lng");
    
    //Initialize geocoder
    const geocoder = new google.maps.Geocoder();

    //***Click on map listener***
    map.addListener("click", (mapsMouseEvent) => {
        //Removes previous marker
        marker.setMap(null);
        //New marker with co-ordinates from mouse click
        marker = new google.maps.Marker({
            position: mapsMouseEvent.latLng
        });
        //Sets marker
        marker.setMap(map);
        //Change the values in latitude and longitude text fields
        latDisplay.value = mapsMouseEvent.latLng.toJSON().lat;
        lngDisplay.value = mapsMouseEvent.latLng.toJSON().lng;
        //Reverse geocode click-on location and send result to location text field
        geocoder.geocode({ location: mapsMouseEvent.latLng}, (results, status) => {
            if (status === "OK") {
                if (results[0]) 
                    document.getElementById("location").value = results[0].formatted_address;
            }
            else
                console.log(status);
        });
    });

    //***Geocoder text input listener***
    document.getElementById('address-submit').addEventListener('click', () => {
        //Call geocode function
        geocoder.geocode({address: document.getElementById('location').value}, 
        (results, status) => {
            if (status === 'OK') {
                //Remove marker
                marker.setMap(null);
                //Center and focus map to first result of found location
                map.setCenter(results[0].geometry.location);
                map.setZoom(15);
                //Create and set new marker to location
                marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                });
                marker.setMap(map);
                //Convert results of location results to store in lat and lng text fields
                latDisplay.value = results[0].geometry.location.toJSON().lat;
                lngDisplay.value = results[0].geometry.location.toJSON().lng;
            }
            else
                console.log(status);
        });
    });
};
