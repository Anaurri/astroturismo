import { useState, useEffect } from 'react';
import reservationsService from '../../services/reservations-service';
import { Fragment } from 'react';
import ReservationItem from './ReservationItem';

function ReservationsList() {

  const [state, setState] = useState({
    reservations: [],
    loading: false,
  });
  useEffect(() => {
    // componentDidMount

    async function fetchReservations() {
      console.log('Fetching reservations...');
      setState(state => ({
        ...state,
        loading: true,
      }))
      let reservations = await reservationsService.list();

      if (!isUnmounted) {
        setState({
          reservations: reservations,
          loading: false,
        })
      }
    }

    let isUnmounted = false;

    fetchReservations();

    return () => {
      // componentWillUnmount
      isUnmounted = true;
    }
  }, []);
  const { reservations, loading } = state;

  return (
    <Fragment >
      {reservations.length != 0 && (
        <div>
          <h5 className="text-warning text-center" >Tus reservas</h5>
          <div className="container pt-4 pb-5  overflow auto">
            <div className="row row-cols-2 col-sm-">
              {reservations.map(reservation => (
                <div className="col mb-4 "><ReservationItem reservation={reservation}></ReservationItem></div>
              ))}
            </div>
          </div>
        </div>

      )}
    </Fragment>

  )
}
export default ReservationsList;



