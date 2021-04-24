
import { useHistory } from 'react-router';
import { useCallback } from 'react';

function ReservationItem({ reservation: { event, numberOfPeople, eventName, date, paymentId, paymentState } }) {


    /*El evento se canceló. La reserva sigue pero el evento no*/
    const eventCanceled = useCallback(() => {
        return (event === null);
    }, [])

    const history = useHistory();
    return (
        <div className="card p-2 border-warning  bg-white text-light " >
            {eventCanceled() && (
                <div>
                    <h3>El evento se canceló. Revise sus notificaciones</h3>
                    <h4 className="alert-heading">`Tenías una reserva para ${numberOfPeople} persona\s`</h4>
                </div>
            )}
            {!eventCanceled() && (
                <div>
                    <p className="alert-heading font-weight-bold">Tienes una reserva para {numberOfPeople} persona\s</p>
                    <p className="alert-heading">{eventName}</p>
                    <p >{date.slice(0, 10)}</p>

                </div>
            )}
        </div>
    )
}

export default ReservationItem;
