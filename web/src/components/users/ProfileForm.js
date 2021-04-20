
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';



import { update } from '../../services/users-service';

const PASSWORD_PATTERN = /^.{8,}$/;

const validations = {
  name: (value) => {
    let message;
    if (!value) {
      message = 'An user name is required';
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
  },
  password2: (value) => {
    let message;
    if (!value) {
      message = 'A valid password is required';
    } else if (!PASSWORD_PATTERN.test(value)) {
      message = 'the password is invalid';
    }
    return message;
  }
}

function ProfileForm() {



  const history = useHistory();
  const [state, setState] = useState({
    user: {
      name: '',
      city: ''


    },
    errors: {
      name: validations.name(),
      password: validations.password(),
      password2: validations.password2(),

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
        await update();
        history.push('/profile');
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
    <div className="row row-cols-1">

    <div className="col text-center mb-2">
    <img className="img-fluid img-thumbnail" src={user.avatar} alt={user.name} onError={(user) => user.target.src = user.avatar} />
  </div>

    <form className="mt-3 mb-3" onSubmit={handleSubmit}>



      <div className="input-group mb-2">
        <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
        <input type="text" name="name" className={`form-control ${touch.name && errors.name ? 'is-invalid' : ''}`}
          placeholder="Username" onBlur={handleBlur} onChange={handleChange} value={user.name} />
        <div className="invalid-feedback">{errors.name}</div>
      </div>



      {/* <div className="input-group mb-2">
        <span className="input-group-text"><i className="fa fa-lock fa-fw"></i></span>
        <input type="password" name="password" className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`}
          placeholder="Password" onBlur={handleBlur} onChange={handleChange} value={user.password} />
        <div className="invalid-feedback">{errors.password}</div>

        {/* <input type="password2" name="password2" className={`form-control ${touch.password2 && errors.password2 ? 'is-invalid' : ''}`}
          placeholder="New Password" onBlur={handleBlur} onChange={handleChange} value={user.password2} />
        <div className="invalid-feedback">{errors.password2}</div> */}
      {/* </div> */} 


      <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-picture-o fa-fw"></i></span>
            <input type="file" name="image" className={`form-control ${(touch.image && errors.image) ? 'is-invalid' : ''}`} placeholder="Company image..."
              onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.image}</div>
        </div>


        <div className="input-group mb-2">
        <span className="input-group-text"><i className="fa fa-building fa-fw"></i></span>
        <input type="text" name="city" className={`form-control ${touch.city && errors.city ? 'is-invalid' : ''}`} 
          placeholder="City" onBlur={handleBlur} onChange={handleChange} value={user.city} />
        <div className="invalid-feedback">{errors.city}</div>
      </div>

      <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-phone fa-fw"></i></span>
            <input type="number" name="phoneNumber" className={`form-control ${(touch.phoneNumber && errors.phoneNumber) ? 'is-invalid' : ''}`} placeholder="Company phoneNumber..."
              onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.phoneNumber}</div>
        </div>


      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="submit" disabled={!isValid()}>Update Profile</button>
      </div>


    </form>
    </div>

  );
}

export default ProfileForm;
