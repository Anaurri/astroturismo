import { Fragment } from "react";
import { useTranslation } from 'react-i18next';
import NotificationsList from '../components/notifications/NotificationsList';

function Notifications() {
  const { t } = useTranslation()
  return (
    <Fragment>
         <h3 className="mb-3">Notificaciones</h3>
         <NotificationsList/>
    </Fragment>
  );
}

export default Notifications;

