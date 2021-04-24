import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'

function Map({ markers , onClickMarker}) {

    return (
        <GoogleMap defaultZoom={5} defaultCenter={{ lat: 37.020098, lng: -8.999830 }}>
            {markers?.map((marker) => (
                <Marker key={marker[0]}  //en el marker[0] hemos metido el id del evento
                    position={{ lat: marker[1], lng: marker[2] }}
                    onClick={() => onClickMarker(marker)}>

                    {markers.selectedMarker === marker && (
                        <InfoWindow>
                            <div>
                                {marker.shelter}
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            ))
            }
        </GoogleMap >
    )
}
export default withScriptjs(withGoogleMap(Map));


