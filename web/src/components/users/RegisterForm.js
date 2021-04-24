
import { Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';



import { register } from '../../services/users-service';

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const validations = {
  name: (value) => {
    let message;
    if (!value) {
      message = 'An user name is required';
    }
    return message;
  },
  email: (value) => {
    let message;
    if (!value) {
      message = 'A valid email is required';
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'the email is invalid';
    }
    return message;
  },
  password: (value) => {
    let message;
    if (!value) {
      message = 'A valid password is required';
    } else if (!PASSWORD_PATTERN.test(value)) {
      message = 'the password is invalid';
    }
    return message;
  }
}

function RegisterForm() {



  const history = useHistory();
  const [state, setState] = useState({
    user: {
      name: '',
      email: '',
      password: '',
      role: 'client'

    },
    errors: {
      name: validations.name(),
      email: validations.email(),
      password: validations.password(),

    },
    touch: {}
  });

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const handleBlur = (event) => {
    const { name } = event.target;
    setState(state => ({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    }));
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(state => ({
      ...state,
      user: {
        ...state.user,
        [name]: value
      },
      errors: {
        ...state.errors,
        [name]: validations[name] && validations[name](value)
      }
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      try {
        const { user } = state;
        await register(user);
        history.push('/login', { email: user.email });
      } catch (error) {
        const { message, errors } = error && error.response ? error.response.data : error;
        console.error(message);
        setState(state => ({
          ...state,
          errors: errors
        }))
      }
    }
  }

  const { user, errors, touch } = state;
  const { t } = useTranslation()


  return (
    <div>
      <h3 className="mb-3 container-fluid ">{t('Events.title')}</h3>
      <h5 className="mb-3 container-fluid">{t('Events.subtitle')}</h5>


      <form className="mt-3 mb-3 pr-3 pt-3 pl-3 bg-white text-center  border-warning rounded " onSubmit={handleSubmit}>

        <div className="input-group mb-2">
          <span className="input-group-text"><i className="fa fa-user fa-fw text-warning"></i></span>
          <input type="text" name="name" className={`form-control ${touch.name && errors.name ? 'is-invalid' : ''}`}
            placeholder="Username" onBlur={handleBlur} onChange={handleChange} value={user.name} />
          <div className="invalid-feedback">{errors.name}</div>
        </div>

        <div className="input-group mb-2">
          <span className="input-group-text"><i className="fa fa-envelope fa-fw text-warning"></i></span>
          <input type="text" name="email" className={`form-control ${touch.email && errors.email ? 'is-invalid' : ''}`}
            placeholder="Email" onBlur={handleBlur} onChange={handleChange} value={user.email} />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text"><i className="fa fa-lock fa-fw text-warning"></i></span>
          <input type="password" name="password" className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`}
            placeholder="Password" onBlur={handleBlur} onChange={handleChange} value={user.password} />
          <div className="invalid-feedback">{errors.password}</div>
        </div>
        <div className="custom-control custom-checkbox mb-4">
          <input type="checkbox" className="custom-control-input color-light " name="role" id="check1" onBlur={handleBlur} onChange={handleChange} value='company' disabled="" />
          <label className="custom-control-label text-light" for="check1">{t('User.textToCompany')}</label>
        </div>

        <div className="d-grid gap-2">
          <button className="btn btn-warning" type="submit" disabled={!isValid()}>Register</button>
        </div>

        <Link className="btn btn-link link-unstyled text-center" to={`/login`}><h6 className="text-warning ">Ya estoy registrado</h6></Link>



      </form>
    </div>
  );
}

export default RegisterForm;
