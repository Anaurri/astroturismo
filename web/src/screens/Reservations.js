import { Fragment } from "react";
import { useTranslation } from 'react-i18next';
import ReservationsList from '../components/reservations/ReservationsList';

function Reservations() {
  const { t } = useTranslation()
  return (
    <Fragment>
         <h3 className="mb-3">Tus Reservas</h3>
         <ReservationsList/>
    </Fragment>
  );
}

export default Reservations;

