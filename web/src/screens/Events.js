import { Fragment, useContext } from "react";
import { useTranslation } from 'react-i18next';
import EventsList from '../components/events/EventList';  
import AuthContext from '../contexts/AuthStore';  

function Events() {
  const { t } = useTranslation()

  return (
    <Fragment>


         <EventsList ProfileView="false" />

    </Fragment>
  );
}

export default Events;

