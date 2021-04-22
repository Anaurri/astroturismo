import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'

function Map({ locations }) {
    return (
        <GoogleMap defaultZoom={5} defaultCenter={{ lat:37.020098, lng: -8.999830 }}>
            {locations?.map(location => (
                    <Marker
                        position={{ lat: location[0], lng: location[1] }}
                    />
                 ))
            }
        </GoogleMap>
    )
}
export default withScriptjs(withGoogleMap(Map));


