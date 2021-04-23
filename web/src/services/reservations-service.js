import http from './base-api-service';

const list = (reservations) => http.get('/reservations')
// const detail = (id) => http.get(`/reservations/${id}`)
export const create = (reservation) => http.post(`/events/${reservation.event}/reservations`, reservation)

const remove = (id) => http.delete(`/reservations/${id}`)

export const update = (reservation) => {
   http.patch(`/reservation/update`, reservation)
}

const service = {
  // detail,
  create,
  list,
  update,
  remove
}

export default service;
