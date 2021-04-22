
import { useState , useContext } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../contexts/AuthStore';

// import { usersService } from '../../services/users-service'



import { update } from '../../services/users-service';

const PASSWORD_PATTERN = /^.{8,}$/;

const validations = {
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

function ProfileForm({ userBody: userToEdit = {} }) {

  const { user, isAuthenticated, onUserChange } = useContext(AuthContext);

  let preview

  const history = useHistory();
  const [state, setState] = useState({
    userBody: {
      name: user.name,
      city: user.city,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      ...userToEdit



    },
    errors: {
      // password: validations.password(),
      // password2: validations.password2(),

    },
    touch: {}
  });

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const handleBlur = (userBody) => {
    const { name } = userBody.target;
    setState(state => ({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    }));
  }

  const handleChange = (userBody) => {
    let { name, value } = userBody.target;

    if (userBody.target.files && userBody.target.files[0]) {
      value = userBody.target.files[0]
      preview = URL.createObjectURL(userBody.target.files[0])

    }

    setState(state => ({
      ...state,
      userBody: {
        ...state.userBody,
        [name]: value
      },
      errors: {
        ...state.errors,
        [name]: validations[name] && validations[name](value)
      }
    }));
  }
  const handleSubmit = async (userBody) => {
    userBody.preventDefault();

    if (isValid()) {
      try {
        const userData = { ...state.userBody };
        await update(userData);
        // onUserChange(userBody);

        history.push(`/profile`, { id: userBody.id });
      } catch (error) {
        const { message, errors } = error.response?.data || error;

        setState(state => ({
          ...state,
          errors: {
            ...errors,
            title: !errors && message
          },
          touch: {
            ...errors,
            title: !errors && message
          }
        }));
      }
    }
  }
  const { userBody, errors, touch } = state;
  const { t } = useTranslation()


  return (
    <div className="row row-cols-1 pl-5 pr-5">
      <h3>Actualiza el perfil</h3>
      {/* <div className="col text-center mb-2">
        <img className="img-fluid img-thumbnail bg-white border-warning text-warning"  style={{height: "15rem"}} src={userBody.avatar} alt={userBody.name} onError={(userBody) => user.target.src = user.avatar} />
      </div> */}
      <div className="col">

      <form onSubmit={handleSubmit}>

      <div className="input-group mb-2">


          <span className="input-group-text bg-light border-warning text-warning"><i className="fa fa-user fa-fw"></i></span>
          <input type="text" name="name" className={`form-control border-warning bg-light text-white  ${touch.name && errors.name ? 'is-invalid' : ''}`}
            placeholder="Username" onBlur={handleBlur} onChange={handleChange} value={userBody.name} />
          <div className="invalid-feedback">{errors.name}</div>

          <span className="input-group-text bg-light border-warning text-warning"><i className="fa fa-picture-o fa-fw"></i></span>
          <input type="file" name="avatar" className={`form-control border-warning bg-light text-white ${(touch.avatar && errors.avatar) ? 'is-invalid' : ''}`} placeholder="User avatar..."
            onBlur={handleBlur} onChange={handleChange} />
          <div className="invalid-feedback">{errors.avatar}</div>
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


          <span className="input-group-text bg-light border-warning text-warning"><i className="fa fa-building fa-fw"></i></span>
          <input type="text" name="city" className={`form-control border-warning bg-light text-white ${touch.city && errors.city ? 'is-invalid' : ''}`}
            placeholder="City" onBlur={handleBlur} onChange={handleChange} value={userBody.city} />
          <div className="invalid-feedback">{errors.city}</div>

          <span className="input-group-text bg-light border-warning text-warning"><i className="fa fa-phone fa-fw"></i></span>
          <input type="number" name="phoneNumber" className={`form-control border-warning bg-light text-white ${(touch.phoneNumber && errors.phoneNumber) ? 'is-invalid' : ''}`} placeholder="Company phoneNumber..."
            onBlur={handleBlur} onChange={handleChange} value={userBody.phoneNumber} />
          <div className="invalid-feedback">{errors.phoneNumber}</div>
        </div>


        <div className="d-grid">
          <button className="btn btn-primary" type="submit" disabled={!isValid()}>Update Profile</button>
        </div>


      </form>
    </div>
    </div>

  );
}

export default ProfileForm;
