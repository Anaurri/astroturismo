import LoginForm from '../components/users/LoginForm';
import { Link } from 'react-router-dom';
// import { socialLoginUrl } from '../services/users-service';

function Login() {
  return (
    <div className="row">
      <div className="col-12 col-sm-4 mx-auto">
        <LoginForm />
        <hr/>
        <div className="d-grid gap-2">
          {/* <a className="btn btn-danger" href={socialLoginUrl}><i className="fa fa-google"></i> Login with Google</a> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
