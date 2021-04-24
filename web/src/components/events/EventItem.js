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

  const { reservation, errors, message } = state;

  /*Fin Crear Reserva*/

  return (
    <div className="card mb-3">

      <div className="card shadow-sm border-warning rounded  bg-white" style={{ color: "#171721" }} >
        
        
        <h6 className="fw-lighter mt-3 ml-3 " style={{ fontSize: '12px' }}>{date.slice(0,10)}</h6>
        <h5 className="card-title mt-1 ml-3 mr-2" >{name}, {city}</h5>

        <img src={image} className="card-img-top" alt={name} style={{ height: "20rem" }} />
        <div className="card-body" >
          <p className="card-text ">{description}</p>
        </div>

        {!isCompany() && isAuthenticated() && (


          <form onSubmit={handleSubmit}>

            <div className="btn-group ml-4 mr-4 mb-4 d-flex justify-content-center" style= {{ borderStyle: "solid" , borderWidth: '1px' , borderColor: '#000000'}} >
            <span className="input-group-text bg-white text-light"> {price}€/person </span>         

              <span className="input-group-text bg-white"> <i className="fa fa-user fa-fw" style={{ color: "#171721" }}></i></span>
              <input name="numberOfPeople" type="number" className="input-group-text bg-white text-light" style={{ width: "80px" }}
                value={reservation.numberOfPeople} onBlur={handleBlur} onChange={handleChange} />
            <Link className="mt-2 d-flex align-items-center" to={{ pathname: `mail://${company.email}`}} target="_blank"><h6 className="card-title text-ligth">{company.email}</h6></Link>

            </div>
            <div className="d-grid">
              <button className="btn btn-warning " type="submit">Reserva</button>
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

            <label className="btn btn-warning">
              <button type="button" className="btn btn-warning" onClick={() => handleDeleteEvent(id)}>Update</button>
            </label>
          </div>
        )}



      </div>




    </div>
  )
}

export default EventItem;
