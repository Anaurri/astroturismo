import { Fragment } from "react";
import EventsList from '../components/events/EventsList';

function Events() {
  return (
    <Fragment>
      <h3 className="mb-3">Eventos</h3>
      <EventsList />
    </Fragment>
  );
}

export default Events;
