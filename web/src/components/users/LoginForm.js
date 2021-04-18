import { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { login } from "../../services/users-service";
import { AuthContext } from '../../contexts/AuthStore';

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
    <form className="mt-3 mb-3" onSubmit={handleSubmit}>

      <div className="input-group mb-2">
        <span className="input-group-text"><i className="fa fa-envelope fa-fw"></i></span>
        <input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          required placeholder="user@example.org" onChange={handleChange} value={user.email} />
        <div className="invalid-feedback">{errors.email}</div>
      </div>

      <div className="input-group mb-2">
        <span className="input-group-text"><i className="fa fa-lock fa-fw"></i></span>
        <input type="password" name="password" className="form-control"
          required placeholder="Password" onChange={handleChange} value={user.password} />
      </div>

      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="submit" >Login</button>
      </div>
      
    </form>
  );
}

export default LoginForm;
