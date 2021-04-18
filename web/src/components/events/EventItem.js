import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';

function EventItem({ event: { id, name, description, city, image, owner, date, price } }) {

  const { user } = useContext(AuthContext);

  return (
    <div className="card mb-3">

    <div className={`card shadow-sm border-warning rounded`}>

<Link className="stretched-link link-unstyled card-header" to={`/events/${id}`}><h5 className="card-title text-warning mt-2">{name}</h5></Link>
  <div className="card-body">
    <h7 className="card-subtitle text-muted">Support card subtitle</h7>
  </div>

      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
    <p className="card-text">{description}</p>
  </div>
      <div className="card-body">
        <span className="fw-lighter" style={{ color: '#d1410c', fontSize: '12px' }}>{date}</span>
        <h6 className="card-title">{price}€</h6>
        <h6 className="card-title">{city}</h6>


      </div>
      {/* <button className="btn btn-primary" type="submit" disabled={!isValid()}>Register</button> */}

      <div className="card-footer text-muted">Contacto de la compañía</div>

    </div>
    </div>
  )
}

export default EventItem;

