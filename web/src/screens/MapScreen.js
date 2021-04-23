import { Fragment } from "react";
import { useTranslation } from 'react-i18next';
import Map from '../components/map/Map'


const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}`

function MapScreen({locations}) {

  const { t } = useTranslation()
  return (
    <Fragment>
         <Map className="text-center"
            googleMapURL= {mapUrl}
            containerElement= {<div className ="border-warning" style={{height: '21rem' ,width: '33rem'}}/>} 
            mapElement=  {<div style={{height: '100%'}}/>}
            loadingElement= {<p>cargando...</p>}
            locations={locations} >  </Map>
    </Fragment>
  );
}

export default MapScreen;




