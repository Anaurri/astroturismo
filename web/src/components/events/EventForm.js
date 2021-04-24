import { useState } from 'react';
import { useHistory } from 'react-router';
import eventsService from '../../services/events-service';


const validations = {
  name: (value) => {
    let message;
    if (!value) {
      message = 'Title is required';
    } else if (value && value.length < 5) {
      message = 'Title needs at least 5 characters'
    }
    return message;
  },
  description: (value) => {
    let message;
    if (!value) {
      message = 'Description is required';
    } else if (value && value.length < 10) {
      message = 'Description needs at least 10 characters'
    }
    return message;
  },
  image: (value) => {
    let message;
    if (!value) {
      message = 'Image is required';
    }
    return message;
  },
  latitude: (value) => {
    let message;
    if (!value) {
      message = 'Latitude is required';
    } else if (Math.abs(Number(value)) > 90) {
      message = 'Latitude must be between -90 and 90';
    }
    return message;
  },
  longitude: (value) => {
    let message;
    if (!value) {
      message = 'Longitude is required';
    } else if (Math.abs(Number(value)) > 180) {
      message = 'Longitude must be between -180 and 180';
    }
    return message;
  },
  date: (value) => {
    let message;
    if (!value) {
      message = 'Date is required';
    }
    return message;
  },
  duration: (value) => {
    let message;
    if (!value) {
      message = 'duration is required';
    } else if (value && Number(value) <= 0) {
      message = 'duration must be grater than 0';
    }
    return message;
  },
  capacity: (value) => {
    let message;
    if (!value) {
      message = 'Capacity is required';
    } else if (value && Number(value) <= 0) {
      message = 'Capacity must be grater than 0';
    }
    return message;
  }
}

function EventForm({ event: eventToEdit = {} }) {
  const history = useHistory();
  const [state, setState] = useState({
    event: {
      name: '',
      description: '',
      image: '',
      tags: '',
      city: '',
      latitude: '',
      longitude: '',
      date: '',
      duration: '',
      capacity: '',
      price: '',
      ...eventToEdit
    },
    errors: {
      name: validations.name(eventToEdit.name),
      description: validations.description(eventToEdit.description),
      image: validations.image(eventToEdit.image),
      capacity: validations.capacity(eventToEdit.capacity),
      date: validations.date(eventToEdit.date),
      duration: validations.duration(eventToEdit.duration),
      latitude: validations.latitude(eventToEdit.latitude),
      longitude: validations.longitude(eventToEdit.longitude)

    },
    preview: '',
    touch: {}
  });

  const handleChange = (event) => {
    let preview;
    let { name, value } = event.target;

    if (event.target.files) {
      value = event.target.files[0]
      if (event.target.files[0]) preview = URL.createObjectURL(event.target.files[0])
    }

    setState(state => {
      return {
        ...state,
        event: {
          ...state.event,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: validations[name] && validations[name](value),
        },
        preview: preview,
      }
    });
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

  const handleSubmit = async (event) => {
    event.preventDefault();



    if (isValid()) {
      try {

        const eventData = { ...state.event };

        eventData.location = [Number(eventData.longitude), Number(eventData.latitude)];
        eventData.tags = eventData.tags.split(',').map(tag => tag.trim()) || [];


        const event = eventData.id ? await eventsService.update(eventData) : await eventsService.create(eventData);
        history.push(`/events/${event.id}`);
      } catch (error) {
        const { message, errors } = error.response?.data || error;

        if (errors?.location) {
          errors.latitude = errors.location;
          errors.longitude = errors.location;
          delete errors.location;
        }

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

  const isValid = () => {


    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const { event, errors, touch } = state;

  return (
    <div className="row row-cols-1 pl-5 pr-5">
      <div className="col text-center mb-2">
        <img className="img-fluid img-thumbnail bg-white border-warning text-warning" style={{ height: "15rem" }} src={event.image && URL.createObjectURL(event.image) } alt={event.title} onError={(event) => event.target.src = 'https://res.cloudinary.com/djzlb3fzs/image/upload/v1618507467/astroturismo/logo_pack2_5_vfyuwg.png'} />


      </div>
      <div className="col">
        <form onSubmit={handleSubmit}>

          <div className="input-group mb-2">
            <span className="input-group-text bg-white border-warning text-warning"><i className="fa fa-tag fa-fw"></i></span>
            <input type="text" name="name" className={`form-control border-warning bg-white text-white ${(touch.name && errors.name) ? 'is-invalid' : ''}`} placeholder="Event name..."
              value={event.name} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.name}</div>
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text  bg-white border-warning text-warning"><i className="fa fa-edit fa-fw"></i></span>
            <textarea name="description" className={`form-control border-warning bg-white text-white ${(touch.description && errors.description) ? 'is-invalid' : ''}`} placeholder="Event description..."
              value={event.description} onBlur={handleBlur} onChange={handleChange}></textarea>
            <div className="invalid-feedback">{errors.description}</div>
          </div>


          <div className="input-group mb-2">
            <span className="input-group-text bg-white border-warning text-warning"><i className="fa fa-picture-o fa-fw"></i></span>
            <input type="file" name="image" className={`form-control border-warning bg-white text-white${(touch.image && errors.image) ? 'is-invalid' : ''}`} placeholder="Event image..."
              onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.image}</div>
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text bg-white border-warning text-warning "><i className="fa fa-map-marker fa-fw"></i></span>

            <span className="input-group-text  bg-white border-warning text-light">Latitude</span>
            <input name="latitude" type="number" className={`form-control border-warning bg-white text-white ${(touch.latitude && errors.latitude) ? 'is-invalid' : ''}`}
              value={event.latitude} onBlur={handleBlur} onChange={handleChange} />

            <span className="input-group-text  bg-white border-warning text-light">Longitude</span>
            <input name="longitude" type="number" className={`form-control border-warning bg-white text-white ${(touch.longitude && errors.longitude) ? 'is-invalid' : ''}`}
              value={event.longitude} onBlur={handleBlur} onChange={handleChange} />

            {touch.latitude && errors.latitude && <div className="invalid-feedback">{errors.latitude}</div>}
            {touch.longitude && errors.longitude && <div className="invalid-feedback">{errors.longitude}</div>}

            <span className="input-group-text  bg-white border-warning text-warning"><i className="fa fa-building fa-fw"></i></span>
            <input type="text" name="city" className={`form-control border-warning bg-white text-white${(touch.city && errors.city) ? 'is-invalid' : ''}`} placeholder="Event city..."
              value={event.city} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.city}</div>

          </div>

          <div className="input-group mb-2">
            <span className="input-group-text  bg-white border-warning text-warning"><i className="fa fa-clock-o fa-fw"></i></span>

            <span className="input-group-text  bg-white border-warning text-light">Date</span>
            <input type="datetime-local" name="date" className={`form-control border-warning bg-white text-white ${(touch.date && errors.date) ? 'is-invalid' : ''}`} placeholder="dd/mm/yyyy hh:mm"
              value={event.date} onBlur={handleBlur} onChange={handleChange} />

            <span className="input-group-text  bg-white border-warning text-light">Duration</span>
            <input name="duration" type="number" className={`form-control border-warning bg-white text-white ${(touch.duration && errors.duration) ? 'is-invalid' : ''}`} placeholder="Duration aprox of the event in minutes..."
              value={event.duration} onBlur={handleBlur} onChange={handleChange} />

            {touch.date && errors.date && <div className="invalid-feedback">{errors.date}</div>}
            {touch.duration && errors.duration && <div className="invalid-feedback">{errors.duration}</div>}


            <span className="input-group-text  bg-white border-warning text-warning"><i className="fa fa-users fa-fw"></i></span>
            <input type="number" name="capacity" className={`form-control  border-warning bg-white text-white ${(touch.capacity && errors.capacity) ? 'is-invalid' : ''}`} placeholder="Event capacity..."
              value={event.capacity} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.capacity}</div>

            <span className="input-group-text   bg-white border-warning text-warning"><i className="fa fa-eur fa-fw"></i></span>
            <input type="number" name="price" className={`form-control border-warning bg-white text-white ${(touch.price && errors.price) ? 'is-invalid' : ''}`} placeholder="Event price per person..."
              value={event.price} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.price}</div>
          </div>
          <div className="input-group mb-2">
            <span className="input-group-text   bg-white border-warning text-warning"><i className="fa fa-tag fa-fw"></i></span>
            <input type="text" name="tags" className={`form-control border-warning bg-white text-white ${(touch.tags && errors.tags) ? 'is-invalid' : ''}`} placeholder="Coma separated event tags..."
              value={event.tags} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.tags}</div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-warning" disabled={!isValid()}>
              {event.id && <span>Update Event</span>}
              {!event.id && <span>Create Event</span>}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default EventForm;
