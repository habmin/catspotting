/*************************************
**** Google Maps API Initializers ****
*************************************/

//Initializer for posts/new.ejs
function newMap() {
    const initLatLng = { lat: 39.34, lng: -99.14 };
    const map = new google.maps.Map(document.getElementById('map'), {
        gestureHandling: "greedy",
        zoom: 4,
        center: initLatLng
    });
    let marker = new google.maps.Marker({
        position: initLatLng
    })
    marker.setMap(map);
    mapListeners(map, marker);
};

//Initializer for posts/show.ejs
function showMap() {
    const initLatlng = { lat: parseFloat($('#hidden').attr('lat')), lng: parseFloat($('#hidden').attr('lng')) };
    const map = new google.maps.Map(document.getElementById("show-map"), {
        gestureHandling: "none",
        zoom: 13,
        center: initLatlng
    });
    let marker = new google.maps.Marker({
        position: initLatlng
    })
    marker.setMap(map);
};

//Initializer for posts/edit.ejs
function editMap() {
    let initLatlng;
    let initialZoom;
    //If there's no value, go to default zoom 
    if ($('#lat').attr('value') === "") {
        initLatlng = { lat: 39.34, lng: -99.14 };
        initialZoom = 3;
    }
    //Otherwise place zoom to set location
    else {
        initLatlng = { lat: parseFloat($('#lat').attr('value')), lng: parseFloat($('#lng').attr('value')) };
        initialZoom = 13;
    }
    const map = new google.maps.Map(document.getElementById("map"), {
        gestureHandling: "greedy",
        zoom: initialZoom,
        center: initLatlng
    });
    let marker = new google.maps.Marker({
        position: initLatlng
    })
    marker.setMap(map);
    mapListeners(map, marker);
};

//Initializer for posts/map.ejs
function fullMap() {
    const map = new google.maps.Map(document.getElementById("full-map"), {
        gestureHandling: "greedy",
        zoom: 3,
    });
    let infoWindow = new google.maps.InfoWindow();
    let bounds = new google.maps.LatLngBounds();
    let $newMarkers = $('.locations');
    for (let i = 0; i < $newMarkers.length; i++) {
        let marker = new google.maps.Marker({
            position: {lat: parseFloat($($newMarkers[i]).attr('lat')), lng: parseFloat($($newMarkers[i]).attr('lng'))},
        });
        marker.setTitle($($newMarkers[i]).attr('id'));
        bounds.extend(marker.getPosition());
        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.close();
            console.log(marker.getTitle());
            infoWindow = new google.maps.InfoWindow({
                maxWidth: 300,
                content: `<a href="/catspotting/${marker.getTitle()}"><h2>${$(`#${marker.getTitle()}`).attr('title')}</h3>
                        <img class="map-cat" src="${$(`#${marker.getTitle()}`).attr('img')}"/></a>`
            });
            infoWindow.open(map, marker);
        });
        marker.setMap(map);
    }
    map.fitBounds(bounds);
};
