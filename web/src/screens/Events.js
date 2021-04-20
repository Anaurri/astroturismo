import { Fragment } from "react";
import { useTranslation } from 'react-i18next';
import EventsList from '../components/events/EventList';

function Events() {
  const { t } = useTranslation()
  return (
    <Fragment>
         <h3 className="mb-3">{t('Events.title')}</h3>
         <h5 className="mb-3">{t('Events.subtitle')}</h5>

         <EventsList ProfileView="false" />
    </Fragment>
  );
}

export default Events;

