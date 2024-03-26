import React from 'react';
import GoogleMapReact from 'google-map-react';


const GoogleMap: React.FC = () => {


  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'YOUR_API_KEY' }} // Replace with your actual Google Maps API key
        defaultCenter={{ lat: 59.95, lng: 30.33 }} // Default center of the map
        defaultZoom={11} // Default zoom level
      >
        {/* You can add markers, polygons, etc. here */}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
