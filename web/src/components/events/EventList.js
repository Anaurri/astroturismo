import { useState, useEffect } from 'react';
import eventsService from '../../services/events-service';
import { Fragment } from 'react';
import EventItem from './EventItem';
import EventsFilter from './EventsFilter'


function EventsList({ minSearchChars, showFilter, companyId }) {

  const [state, setState] = useState({
    events: [],
    loading: false,
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

      if(companyId){
        events = events.filter(event => (event.company.id === companyId))
      }

      if (!isUnmounted) {
        setState({
          events: events,
          loading: false,
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

  const { events, loading } = state;




  return (
    <Fragment >
      {showFilter &&  (<EventsFilter className="mb-3" onSearch={handleSearch} loading={loading} />)}
      <div className="container pt-4 pb-5 bg-light overflow auto" style={{ height: "900px" , overflowY: "scroll", border:"warning"}}>
        <div className="row row-cols-3">
          {events.map(event => (
            <div key={event.id} className="col mb-4"><EventItem event={event} onDeleteEvent={handleDeleteEvent}></EventItem></div>
          ))}
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



