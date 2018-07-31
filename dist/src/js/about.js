import './general';

export function initMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: -41, lng: 173}
        });
        const marker = new google.maps.Marker({
        map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {lat: -41, lng: 173}
        });
        marker.addListener('click', () => {
        infowindow.open(map,marker);
        });
        const infowindow = new google.maps.InfoWindow({
        content: `<h3>Event Location</h3><p>Event Address with all the contact
        details</p>`
        });
        infowindow.open(map,marker);
        
};
  
  
  window.addEventListener("load", () => {
    const $script = document.createElement('script');
    $script.src = `https://maps.googleapis.com/maps/api/js?key=${GMAP_KEY}&callback=bundle.initMap`;
    document.querySelector('body').appendChild($script);
  });
  