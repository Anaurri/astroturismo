import RegisterForm from '../components/users/RegisterForm';
import { useTranslation } from 'react-i18next';



import { Link } from 'react-router-dom';
// import { socialLoginUrl } from '../services/users-service';

function Register() {
  const { t } = useTranslation()

  return (
    <div className="row">
      <div className="col-12 col-sm-4 mx-auto">
        <RegisterForm />
        
        <hr />
        <div className="d-grid gap-2">
          <Link className="btn btn-secondary" type="button" to="/register">{t('Navbar.register')}</Link>
          {/* <a className="btn btn-danger" href={socialLoginUrl}><i className="fa fa-google"></i> Login with Google</a> */}
        </div>

      </div>
    </div>
  );
}

export default Register;
