import { Fragment, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthStore';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { update } from '../../services/reservations-service';


const Card = () => {

  const { user, reservation: { _id, numberOfPeople, price, eventName, date, client, event, paymentState }, thereIsReservation, onReservationChange } = useContext(AuthContext);
  const history = useHistory();


  /*Inicio Crear Reserva*/
  const [state, setState] = useState({
    reservationBody: {
      id: _id,
      numberOfPeople: numberOfPeople,
      price: price,
      eventName: eventName,
      date: date,
      client: client,
      event: event,
      paymentState: paymentState
    },
    errors: {},
    message: ''
  });

  /* El CardElement es un input con el icono de la tarjeta, el número de tarjeta y el mm/aay cvc. 
  Para testar q se valida bien la tarjeta vamos stripe en la parte de cards test que tiene simulación de tarjetas  */

  //es un hook q puede acceder a los elementos de stripe

  const stripe = useStripe(); /* Este objeto me da la conexión a stripe*/

  const elements = useElements(); //es un hook q puede acceder a los elementos de stripe

  const handleSubmit = async (e) => {


    // onReservationChange(undefined); /*esta reserva queda cerrada. Ya no queremos tenerla en el storage. Le pasamos un vacio.*/ 
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {

      const { idPay } = paymentMethod

      try {
        setState(state => ({
          ...state,
          reservationBody: {
            ...state.reservationBody,
            paymentState: 'prepaid',
            paymentId: idPay
          }, errors: {},
          message: message
        }))
        const reservationData = {
          ...state.reservationBody,
          paymentState: 'prepaid',
          paymentId: idPay,
        };

        const reservationReturn = await update(reservationData);

        history.push(`/profile`);
      } catch (error) {

        const { message, errors } = error.response?.data || error;
      }
    }
  }

  const { reservationBody, errors, message } = state;

  const totalToPay = Number(reservationBody?.numberOfPeople) * Number(reservationBody?.price)

  return (
    <Fragment>
      {thereIsReservation() && (
        <div>
          <h5>Su reserva se ha realizado con éxito. Puede pagar ahora o más adelante</h5>
          <Link className="link-unstyled card-header text-white my-2" to={`/events`}><h6>Pagar más tarde. Volver a página principal</h6></Link>

          <form onSubmit={handleSubmit} className="card card-body bg-white" style={{ width: "30rem" }}>
            <h5 className ="text-light">Resumen del pago:</h5>
            <p className ="text-light"> Booking    "{reservationBody?.eventName}" x {reservationBody?.numberOfPeople} </p>

            <h5 className ="text-light"> Total:  EUR {totalToPay} </h5>
            <p className ="text-light"> Incluye impuestos (21%) EUR {totalToPay * 0.21} </p>
            <div className="container bg-white text-center text-light pt-4 pb-4" style={{ width: "20rem", heigth: "40rem" }}>
              <div className="form-group ">
                <CardElement claseeName="form-control text-light" />
              </div>
              <button className="btn btn-warning">Buy</button>
            </div>

          </form>

        </div>
      )}
    </Fragment>

  );
};

export default Card