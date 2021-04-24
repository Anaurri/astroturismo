import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { useHistory } from 'react-router';

import { Link } from 'react-router-dom';
import eventsService from '../../services/events-service'
import reservationsService from '../../services/reservations-service'


function EventItem({ event: { id, name, description, city, image, company, date, price }, onDeleteEvent }) {

  const { user, isAuthenticated, isCompany, onReservationChange } = useContext(AuthContext);
  const history = useHistory();

  async function handleDeleteEvent(id) {
    await eventsService.remove(id);
    onDeleteEvent(id);
  }


  /*Inicio Crear Reserva*/
  const [state, setState] = useState({
    reservation: {
      event: id,
      client: user?.id,
      date: date,
      numberOfPeople: '1', //más adelante cambio esto y lo pongo como formulario
      price: price
    },
    errors: {},
    message: ''

  })

  const handleBlur = (reservation) => {
    const { name } = reservation.target;
    setState(state => ({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    }));
  }
  const handleChange = (reservation) => {
    const { name, value } = reservation.target;
    setState(state => ({
      ...state,
      reservation: {
        ...state.reservation,
        [name]: value
      },
      errors: {},
      message: message

    }))
  }
  const handleSubmit = async (reservation) => {
    reservation.preventDefault();

    try {
      const reservationData = { ...state.reservation };
      const reservationBody = await reservationsService.create(reservationData);
      onReservationChange(reservationBody)
      history.push('/payment');

    } catch (error) { 
      const { message, errors } = error.response ? error.response.data : error;
      console.error(message);
      setState(state => ({
        ...state,
        errors: errors,
        message: message

      }))
    }
  }

  const { reservation, errors,  message} = state;

  /*Fin Crear Reserva*/

  return (
    <div className="card mb-3">

      <div className="card shadow-sm bg-gray-dark border-warning rounded " style={{ height: "50rem", overflowY: "hide" }} >

        <h5 className="card-title text-white mt-2 ml-3 mr-2" style={{ height: "1rem" }} >{name}, {city}</h5>
        <div className="card-body">
        </div>
        <hr className="bg-warning"></hr>

        <img src={image} className="card-img-top pl-5" alt={name} style={{ height: "15rem", width: "25rem"}} />
        <hr className="bg-warning"></hr>

        <div className="card-body" >
          <p className="card-text " style={{ height: "8rem", overflowY: "scroll" }}>{description}</p>
        </div>
        <div className="card-body" style={{ height: "7rem" }}>
          <span className="fw-lighter text-primary" style={{ fontSize: '10px' }}>{date}</span>
          <h6 className="card-title text-primary">{price}€</h6>
          <h6 className="card-title">{city}</h6>


        </div>
        {/* <button className="btn btn-primary" type="submit" disabled={!isValid()}>Register</button> */}

        <div className="card-footer text-ligth">
          <div>Escribe a la compañía:</div>
          <Link className="link-unstyled card-header" to={`/create-message/${id}`}><h6 className="card-title text-white">{company.email}</h6></Link>
        </div>

        {!isCompany() && isAuthenticated() &&(


          <form onSubmit={handleSubmit}>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <div className="btn-group">

            <input name="numberOfPeople" type="number" className="btn-group btn-group-toggle btn btn-secondary active"
              value={reservation.numberOfPeople} onBlur={handleBlur} onChange={handleChange} />


              </div>
              <button className="btn btn-primary" type="submit">Reserva</button>
              <div className="text-danger"> {message}</div>



            </div>
          </form>

        )}
        {!isAuthenticated() && (
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <Link className="link-unstyled card-header" to={`/login`}><h6 className="card-title text-white">Autentícate para reservar una experiencia!</h6></Link>
          </div>

        )}

        {user?.id === company.id && (

          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <button type="button" className="btn btn-danger" onClick={() => handleDeleteEvent(id)}>Delete</button>

            <label className="btn btn-primary">
              <button type="button" className="btn btn-danger" onClick={() => handleDeleteEvent(id)}>Update</button>
            </label>
          </div>
        )}



      </div>




    </div>
  )
}

export default EventItem;
