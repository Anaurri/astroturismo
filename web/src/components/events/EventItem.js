import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { useHistory } from 'react-router';

import { Link } from 'react-router-dom';
import eventsService from '../../services/events-service'
import reservationsService from '../../services/reservations-service'


function EventItem({ event: { id, name, description, city, image, company, date, price }, onDeleteEvent, onCreateReservation }) {

  const { user, isAuthenticated, isCompany, onUserChange } = useContext(AuthContext);

  const history = useHistory();



  // const handleDeleteEvent = async (id) => {
  //   console.log (id)
  //   await eventsService.remove(id);
  //   // history.push('/events');
  // }

  async function handleDeleteEvent(id) {
    await eventsService.remove(id);
    onDeleteEvent(id);
  }

  async function handleCreateReservation(id, numberOfPeople) {
    const reservationData = {
      event: id,
      client: user.id,
      date: date,
      numberOfPeople: numberOfPeople, //más adelante cambio esto y lo pongo como formulario
    }

    console.log("en el handle reservationData")

    console.log(reservationData)
    await reservationsService.create(reservationData);
    // onCreateReservation(id);
  }

  return (
    <div className="card mb-3">

      <div className="card shadow-sm bg-gray-dark border-warning rounded " style={{ height: "60rem", overflowY: "hide" }} >

        <h5 className="card-title text-white mt-2 ml-3 mr-2" style={{ height: "2rem" }} >{name}, {city}</h5>
        <div className="card-body">
          <h6 className="card-subtitle text-muted"></h6>
        </div>
        <hr className="bg-warning"></hr>

        <img src={image} className="card-img-top " alt={name} style={{ height: "15rem" }} />
        <hr className="bg-warning"></hr>

        <div className="card-body" >
          <h6 className="card-title text-warning mt-2" style={{ height: "6rem" }}>{name}</h6>
          <hr className="bg-warning"></hr>
          <p className="card-text " style={{ height: "12rem", overflowY: "scroll" }}>{description}</p>
        </div>
        <div className="card-body" style={{ height: "7rem" }}>
          <span className="fw-lighter text-primary" style={{ fontSize: '16px' }}>{date}</span>
          <h6 className="card-title text-primary">{price}€</h6>
          <h6 className="card-title">{city}</h6>


        </div>
        {/* <button className="btn btn-primary" type="submit" disabled={!isValid()}>Register</button> */}

        <div className="card-footer text-ligth">
          <div>Escribe a la compañía:</div>
          <Link className="link-unstyled card-header" to={`/create-message/${id}`}><h6 className="card-title text-white">{company.email}</h6></Link>
        </div>
        {!isCompany() && (
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <button type="button" className="btn btn-primary" onClick={() => handleCreateReservation(id, numberOfPeople)}>Reserva</button>


            <form onSubmit={handleCreateReservation}>
              <div class="btn-group">
                <select class="btn-group btn-group-toggle btn btn-secondary active">
                  <option type="number" name="numberOfPeople" selected="1">1</option>
                  <option type="number" name="numberOfPeople" value="2">2</option>
                  <option type="number" name="numberOfPeople" value="3">3</option>
                  <option type="number" name="numberOfPeople" value="4">4</option>
                  <option type="number" name="numberOfPeople" value="5">5</option>
                  <option type="number" name="numberOfPeople" value="6">6</option>
                  <option type="number" name="numberOfPeople" value="7">7</option>
                  <option type="number" name="numberOfPeople" value="8">8</option>
                </select>
              </div>
            </form>

          </div>
        )}

        {user?.id === company.id && (

          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <button type="button" className="btn btn-danger" onClick={() => handleDeleteEvent(id)}>Delete</button>

            <label class="btn btn-primary">
              <a href="#" className="text-white" type="checkbox" autocomplete="off">Update</a>
            </label>
          </div>
        )}



      </div>




    </div>
  )
}

export default EventItem;
