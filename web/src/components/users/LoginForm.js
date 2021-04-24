import { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { login } from "../../services/users-service"; //otra forma de exportar/importar varios endpoints. Mirar diferencia entre eventservices y usersservices.
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';


function LoginForm() {
  const { onUserChange } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();

  const [state, setState] = useState({
    user: {
      email: location.state?.email || '',
      password: ''
    },
    errors: {}
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(state => ({
      ...state,
      user: {
        ...state.user,
        [name]: value
      },
      errors: {}
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await login(state.user.email, state.user.password);
      onUserChange(user);
      history.push('/');
    } catch (error) {
      const { message, errors } = error.response ? error.response.data : error;
      console.error(message);
      setState(state => ({
        ...state,
        errors: errors
      }))
    }
  }

  const { user, errors } = state;

  return (
    <form className="mt-3 mb-3 pr-3 pt-3 pl-3 bg-white  border-warning rounded text-center" onSubmit={handleSubmit}>

      <div className="input-group mb-2">
        <span className="input-group-text"><i className="fa fa-envelope fa-fw text-warning"></i></span>
        <input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} style={{ color: 'dark !important'}}
          required placeholder="user@example.org" onChange={handleChange} value={user.email} />
        <div className="invalid-feedback">{errors.email}</div>
      </div>

      <div className="input-group mb-4">
        <span className="input-group-text"><i className="fa fa-lock fa-fw  text-warning"></i></span>
        <input type="password" name="password" className="form-control"
          required placeholder="Password" onChange={handleChange} value={user.password} />
      </div>

      <div className="d-grid">
        <button className="btn btn-warning" type="submit" >Login</button>
      </div>
      <Link className="btn btn-link link-unstyled " to={`/register`}><h6 className="text-warning">Aún no tienes cuenta? Regístrate.</h6></Link>

    </form>
  );
}

export default LoginForm;
