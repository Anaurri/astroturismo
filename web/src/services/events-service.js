import http from './base-api-service';

const list = (events) => http.get('/events')
const detail = (id) => http.get(`/events/${id}`)
const create = (event) => {
  console.log(event);
  const data = new FormData()

  Object.keys(event).forEach(key => {
    if (Array.isArray(event[key])) {
      event[key].forEach(value => data.append(`${key}[]`, value))
    } else data.append(key, event[key])
  })

  return http.post(`/events`, data)
}
const update = (event) => http.patch(`/events/${event.id}`, event)
const remove = (id) => http.delete(`/events/${id}`)


const service = {
  create,
  update,
  remove,
  list,
  detail
}

export default service;
