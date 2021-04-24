import LoginForm from '../components/users/LoginForm';
// import { socialLoginUrl } from '../services/users-service';

function Login() {
  return (
    <div className="row mt-5" style={{height: 'device-height' , width:"100%"}} >
      <div className="col-12 col-sm-4 mx-auto">
        <LoginForm />
        <div className="d-grid gap-2">
          {/* <a className="btn btn-danger" href={socialLoginUrl}><i className="fa fa-google"></i> Login with Google</a> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
