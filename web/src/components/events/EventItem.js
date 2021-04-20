import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { useHistory } from 'react-router';

import { Link } from 'react-router-dom';
import eventsService from '../../services/events-service'

function EventItem({ event: { id, name, description, city, image, company, date, price }, onDeleteEvent }) {

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

  return (
    <div className="card mb-3 " >

      <div className="card shadow-sm border-warning rounded" >

        <Link className=" link-unstyled card-header" to={`/events/${id}`}><h5 className="card-title text-white mt-2">{name}, {city}</h5></Link>
        <div className="card-body">
          <h7 className="card-subtitle text-muted"></h7>
        </div>
        <hr className= "bg-warning"></hr>

        <img src={image} className="card-img-top " alt={name} />
        <hr className= "bg-warning"></hr>

        <div className="card-body">
        <h7 className="card-title text-warning mt-2">{name}</h7>
        <hr className= "bg-warning"></hr>
          <p className="card-text">{description}</p>
        </div>
        <div className="card-body">
          <span className="fw-lighter text-primary" style={{ fontSize: '16px' }}>{date}</span>
          <h6 className="card-title text-primary">{price}€</h6>
          <h6 className="card-title">{city}</h6>


        </div>
        {/* <button className="btn btn-primary" type="submit" disabled={!isValid()}>Register</button> */}

        <div className="card-footer text-ligth">
          <div>Escribe a la compañía:</div>
          <Link className="link-unstyled card-header" to={`/create-message/${id}`}><h8 className="card-title text-white">{company.email}</h8></Link>
        </div>
        {!isCompany() && (

          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-primary active">
              <a href="#" className="text-white" type="checkbox" autocomplete="off" >Reserva</a>
            </label>
          </div>
         )}  

        {user?.id === company.id && (

          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <button type="button" className="btn btn-danger" onClick={()=> handleDeleteEvent(id)}>Delete</button>

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
