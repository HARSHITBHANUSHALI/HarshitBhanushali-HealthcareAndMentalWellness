// MapComponent.jsx
import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    // Google Maps API Script
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB29AzocMxnxp1-fRoqn-5LMjbNZHdntpU&libraries=places";
    script.async = true;
    script.onload = () => {
      initialise(); // Initialize Google Map after script loads
    };
    document.body.appendChild(script);

    const initialise = () => {
      const pyrmont = new google.maps.LatLng(23.223351, 72.647713);

      const map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15,
      });

      const input = document.getElementById('searchTextField');
      let autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);

      let marker = new google.maps.Marker({
        map: map,
      });

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        let place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        let request = {
          location: place.geometry.location,
          radius: '500',
          type: ['hospital'],
        };

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
      });

      const callback = (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          results.forEach((place) => {
            let marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location,
            });

            let infowindow = new google.maps.InfoWindow({
              content: place.name,
            });

            marker.addListener('click', () => {
              infowindow.open(map, marker);
            });
          });
        }
      };
    };

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 bg-white rounded-lg shadow-md transition-transform duration-300 transform hover:translate-y-1 hover:shadow-lg">
      <input
        id="searchTextField"
        type="text"
        placeholder="Search nearby hospitals"
        className="w-full p-3 text-base border-2 border-gray-300 rounded-md mb-6 outline-none transition-all duration-300 focus:border-blue-300"
      />
      <div
        id="map"
        style={{ width: '100%', height: '500px', borderRadius: '10px' }}
        className="transition-shadow duration-300 hover:shadow-xl"
      />
    </div>
  );
};

export default MapComponent;
