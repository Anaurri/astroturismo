import { Link } from 'react-router-dom';

import error404 from '../images/errors/error-404.jpg';
import error403 from '../images/errors/error-403.jpg';

function Error({ code }) {

  let errorImage
  switch (code) {
    case 404:
      errorImage = error404;
      break;
    case 403:
      errorImage = error403;
      break;
    default:
      break;
  }

  return (
    <div className="row text-center row-cols-1">
      <div className="col"><img src={errorImage} className="img-fluid rounded" alt={`Error ${code}`} /></div>
      <div className="col mt-5"><Link className="btn btn-link link-unstyled" to="/events"> <i className="fa fa-search" /> Find Awesome Events!</Link></div>
    </div>
  )
}

export default Error;
