/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWVvbmluY29kZSIsImEiOiJja2tiZHlhMHIwMWliMm5xc3BjOWQ0a285In0.oc3DriXTZ7kFOu-MnLiqKg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/aeonincode/ckkbepsiw0nqb17ps59w8deia',
  scrollZoom: false,
  //center: [-118.303089, 34.064741],
  //zoom: 10,
  //interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add Popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
