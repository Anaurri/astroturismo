
import { useState } from 'react';
import { useHistory } from 'react-router';


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
      password: ''
    },
    errors: {
      name: validations.name(),
      email: validations.email(),
      password: validations.password()
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

  return (
    <form className="mt-3 mb-3" onSubmit={handleSubmit}>
      
      <div className="input-group mb-2">
        <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
        <input type="text" name="name" className={`form-control ${touch.name && errors.name ? 'is-invalid' : ''}`}
          placeholder="Username" onBlur={handleBlur} onChange={handleChange} value={user.name} />
        <div className="invalid-feedback">{errors.name}</div>
      </div>

      <div className="input-group mb-2">
        <span className="input-group-text"><i className="fa fa-envelope fa-fw"></i></span>
        <input type="text" name="email" className={`form-control ${touch.email && errors.email ? 'is-invalid' : ''}`}
          placeholder="Email" onBlur={handleBlur} onChange={handleChange} value={user.email} />
        <div className="invalid-feedback">{errors.email}</div>
      </div>

      <div className="input-group mb-2">
        <span className="input-group-text"><i className="fa fa-lock fa-fw"></i></span>
        <input type="password" name="password" className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`}
          placeholder="Password" onBlur={handleBlur} onChange={handleChange} value={user.password} />
        <div className="invalid-feedback">{errors.password}</div>
      </div>

      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="submit" disabled={!isValid()}>Register</button>
      </div>

    </form>
  );
}

export default RegisterForm;
