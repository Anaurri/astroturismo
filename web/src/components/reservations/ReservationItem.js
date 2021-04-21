import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { useHistory } from 'react-router';
import { createContext, useState, useCallback } from 'react';


import { Link } from 'react-router-dom';

function ReservationItem({ reservation: { event, numberOfPeople } }) {

    const { user, isAuthenticated, isCompany, onUserChange } = useContext(AuthContext);

    /*El evento se canceló. La reserva sigue pero el evento no*/
    const eventCanceled = useCallback(() => {
        return (event === null);
    }, [])




    const history = useHistory();
    return (
        <div className="card mb-3 " style={{maxWidth: "20rem"}} >
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
                        <h4>{event}</h4>
                        <h4 className="alert-heading">`Tienes una reserva para ${numberOfPeople} persona\s`</h4>
                        <h5 >{event.date}</h5>
                    </div>

                )}
            </div>
        </div>
    )
}

export default ReservationItem;
