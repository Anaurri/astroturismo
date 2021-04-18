import RegisterForm from '../components/users/RegisterForm';
import { Link } from 'react-router-dom';
// import { socialLoginUrl } from '../services/users-service';

function Register() {
  return (
    <div className="row">
      <div className="col-12 col-sm-4 mx-auto">
        <RegisterForm />
        <hr/>
        <div className="d-grid gap-2">
          <Link className="btn btn-secondary" type="button" to="/login">Login</Link>
          {/* <a className="btn btn-danger" href={socialLoginUrl}><i className="fa fa-google"></i> Login with Google</a> */}
        </div>
      </div>
    </div>
  );
}

export default Register;
