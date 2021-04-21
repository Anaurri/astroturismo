
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
// import { usersService } from '../../services/users-service'



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

function ProfileForm({ user: userToEdit = {} }) {



  const history = useHistory();
  const [state, setState] = useState({
    user: {
      name: '',
      city: '',
      avatar: '',
      phoneNumber: '',
      ...userToEdit



    },
    errors: {
      name: validations.name(userToEdit.name),
      // password: validations.password(),
      // password2: validations.password2(),

    },
    touch: {}
  });

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const handleBlur = (user) => {
    const { name } = user.target;
    setState(state => ({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    }));
  }

  const handleChange = (user) => {
    let { name, value } = user.target;

    if (user.target.files) {
      value = URL.createObjectURL(user.target.files[0])
    }

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
  const handleSubmit = async (user) => {
    user.preventDefault();

    if (isValid()) {
      try {
        const userData = { ...state.user };
        await update(userData)
        history.push(`/profile`, { id: user.id });
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
  const { user, errors, touch } = state;
  const { t } = useTranslation()


  return (
    <div className="row row-cols-1 pl-5 pr-5">
      <div className="col text-center mb-2">
        <img className="img-fluid img-thumbnail bg-white border-warning text-warning"  style={{height: "15rem"}} src={user.avatar} alt={user.name} onError={(user) => user.target.src = 'https://res.cloudinary.com/djzlb3fzs/image/upload/v1618507467/astroturismo/logo_pack2_4_hs7qxd.png'} />
      </div>
      <div className="col">

      <form onSubmit={handleSubmit}>

      <div className="input-group mb-2">


          <span className="input-group-text bg-light border-warning text-warning"><i className="fa fa-user fa-fw"></i></span>
          <input type="text" name="name" className={`form-control border-warning bg-light text-white  ${touch.name && errors.name ? 'is-invalid' : ''}`}
            placeholder="Username" onBlur={handleBlur} onChange={handleChange} value={user.name} />
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
            placeholder="City" onBlur={handleBlur} onChange={handleChange} value={user.city} />
          <div className="invalid-feedback">{errors.city}</div>

          <span className="input-group-text bg-light border-warning text-warning"><i className="fa fa-phone fa-fw"></i></span>
          <input type="number" name="phoneNumber" className={`form-control border-warning bg-light text-white ${(touch.phoneNumber && errors.phoneNumber) ? 'is-invalid' : ''}`} placeholder="Company phoneNumber..."
            onBlur={handleBlur} onChange={handleChange} />
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
