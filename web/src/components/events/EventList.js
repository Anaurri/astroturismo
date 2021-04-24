import { useState, useEffect } from 'react';
import eventsService from '../../services/events-service';
import { Fragment } from 'react';
import EventItem from './EventItem';
import EventsFilter from './EventsFilter';
import Map from '../map/Map'
const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}`

function EventsList({ minSearchChars, showFilter, companyId }) {

  const [state, setState] = useState({
    events: [],
    loading: false,
    markers: [],
    selectedMarker: '',
    eventMarker: '',
    listEvents: true
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    // componentDidMount

    async function fetchEvents() {
      console.log('Fetching events...');
      setState(state => ({
        ...state,
        loading: true,
      }))
      let events = await eventsService.list(search);

      if (companyId) {
        events = events.filter(event => (event.company.id === companyId))
      }
      /* Marks para google maps */
      const markers = events.map(event => ([event.id, event.location[0], event.location[1]]))

      if (!isUnmounted) {
        setState({
          events: events,
          loading: false,
          markers: markers,
          selectedMarker: '',
          eventMarker: '',
          listEvents: true
        })
      }
    }

    let isUnmounted = false;

    if (search.length >= minSearchChars || search.length === 0) {
      fetchEvents();
    }

    return () => {
      // componentWillUnmount
      isUnmounted = true;
    }
  }, [search, minSearchChars, companyId]); // tiene como dependencia el buscador, para que siempre que cambie de valor se ejecute

  const handleSearch = search => setSearch(search);

  const handleDeleteEvent = id => {
    setState(state => ({
      ...state,
      events: state.events.filter(event => (event.id !== id))
    }))

  }

  const handleMarkerClick = (marker) => {
    console.log("entroaqui")
    console.log(marker)
    const evento = state.events.filter(event => (event.id == marker[0]))
    console.log(evento)

    console.log(marker[0])
    setState({
      ...state,
      selectedMarker: marker,
      listEvents: false,
      eventMarker:  state.events.find(event => (event.id == marker[0]))
    })
  }
    const handleListEvents = () => {

      setState({
        ...state,
        selectedMarker: '',
        listEvents: true

        })
      }
  const { events, loading, markers, selectedMarker, marker, listEvents, eventMarker } = state;
  return (
    <Fragment >
      <div className="container pt-4 pb-5 bg-transparent border-warning  rounded overflow" style={{ height: "420px" }}>
        <div>
          <Map className="text-center"
            selectedMarker={selectedMarker}
            markers={markers}

            onClickMarker={handleMarkerClick}

            googleMapURL={mapUrl}
            loadingElement={<p>cargando...</p>}
            containerElement={<div className="border-warning" style={{ height: '21rem', width: '33rem' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />

          <label className="btn btn-primary">
            <button type="button" className="btn btn-danger" onClick={() => handleListEvents()}>Mostrar listado de experiencias</button>
          </label>
        </div>
        <div className="container pt-4 pb-5 bg-transparent overflow auto" style={{ height: "800px", overflowY: "scroll" }}>
          {showFilter && (<EventsFilter className="mb-3" onSearch={handleSearch} loading={loading} />)}

          <div className="row row-cols-1">
            {listEvents && events.map(event => (
              <div key={event.id} className="col mb-4"><EventItem event={event} onDeleteEvent={handleDeleteEvent}></EventItem></div>
            ))}

            {!listEvents && (
                <div className="col mb-4"><EventItem event={eventMarker} onDeleteEvent={handleDeleteEvent}></EventItem></div>
            )}
          </div>
        </div>
      </div>
    </Fragment>

  )
}

EventsList.defaultProps = {
  minSearchChars: 4,
  showFilter: true
}
export default EventsList;



