import { useState, useEffect } from 'react';
import eventsService from '../../services/events-service';
import { Fragment } from 'react';
import EventItem from './EventItem';
import EventsFilter from './EventsFilter';
import MapScreen from '../../screens/MapScreen';

const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}`

function EventsList({ minSearchChars, showFilter, companyId }) {

  const [state, setState] = useState({
    events: [],
    loading: false,
    locations: [],
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

      const locations = events.map(event => ([event.location[0], event.location[1]]))
      console.log(locations);


      if (!isUnmounted) {
        setState({
          events: events,
          loading: false,
          locations: locations
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
  }, [search, minSearchChars]); // tiene como dependencia el buscador, para que siempre que cambie de valor se ejecute

  const handleSearch = search => setSearch(search);

  const handleDeleteEvent = id => {
    setState(state => ({
      ...state,
      events: state.events.filter(event => (event.id !== id))
    }))

  }

  const handleCreateReservation = id => {
    setState(state => ({
      ...state
    }))
  }

  const { events, loading, locations } = state;




  return (
    <Fragment >
      <div className="container pt-4 pb-5 bg-transparent border-warning  rounded overflow text-center" style={{ height: "420px" }}>
        <MapScreen locations={locations} />
        <div className="container pt-4 pb-5 bg-transparent overflow auto" style={{ height: "800px", overflowY: "scroll" }}>
          {showFilter && (<EventsFilter className="mb-3" onSearch={handleSearch} loading={loading} />)}

          <div className="row row-cols-3">
            {events.map(event => (
              <div key={event.id} className="col mb-4"><EventItem event={event} onDeleteEvent={handleDeleteEvent} onCreateReservation={handleCreateReservation}></EventItem></div>
            ))}
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



