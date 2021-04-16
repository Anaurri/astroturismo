import { useState, useEffect } from 'react';

import eventsService from '../../services/events-service';
import { Fragment } from 'react';

function EventsList({ minSearchChars }) {

  const [state, setState] = useState({
    events: [],
    loading: false
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    // componentDidMount

    async function fetchEvents() {
      console.log('Fetching events...');
      setState(state => ({
        ...state,
        loading: true
      }))
      const events = await eventsService.list(search);
      if (!isUnmounted) {
        setState({
          events: events,
          loading: false
        })
      }
    }

    let isUnmounted = false;

    if (search.length >= minSearchChars || search.length === 0) {
      fetchEvents();
    }

    return () => {
      // componentWillUnmount
      isUnmounted =  true;
    }
  }, [search, minSearchChars]); // tiene como dependencia el buscador, para que siempre que cambie de valor se ejecute

  const handleSearch = search => setSearch(search);
  
  const { events, loading } = state;

  return (
    <Fragment>
      <div className="row row-cols-4">
        {events.map(event => (
          <div key={event.id} className="col mb-4">{event.name}</div>
        ))}
      </div>
    </Fragment>
    
  )
}

EventsList.defaultProps = {
  minSearchChars: 4
}

export default EventsList;
