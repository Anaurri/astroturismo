
import { useHistory } from 'react-router';
import { useCallback } from 'react';

function ReservationItem({ reservation: { event, numberOfPeople, eventName, date, paymentId, paymentState } }) {


    /*El evento se canceló. La reserva sigue pero el evento no*/
    const eventCanceled = useCallback(() => {
        return (event === null);
    }, [])

    const history = useHistory();
    return (
        <div className="card mb-3 " style={{maxWidth: "40rem"}} >
            <div className="card border-success mb-3" >
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                {eventCanceled() && (
                    <div>
                        <h3>El evento se canceló. Revise sus notificaciones</h3>
                        <h4 className="alert-heading">`Tenías una reserva para ${numberOfPeople} persona\s`</h4>
                    </div>

                )}
                {!eventCanceled() && (
                    <div>
                        <p className="alert-heading">`Tienes una reserva para {numberOfPeople} persona\s`</p>
                        <h6 className="alert-heading">{event}</h6>
                        <h6 className="alert-heading">{eventName}</h6>
                        <h6 className="alert-heading">{paymentState}</h6>
                        <h6 className="alert-heading">{paymentId}</h6>

                        <h6 >{date}</h6>
                    </div>

                )}
            </div>
        </div>
    )
}

export default ReservationItem;
