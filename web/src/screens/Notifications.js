import { Fragment } from "react";
import { useTranslation } from 'react-i18next';
import NotificationsList from '../components/notifications/NotificationsList';

function Notifications() {
  const { t } = useTranslation()
  return (
    <Fragment className ="mt-5">
         <NotificationsList/>
    </Fragment>
  );
}

export default Notifications;

