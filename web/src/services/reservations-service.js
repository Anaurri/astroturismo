import http from './base-api-service';

const list = (reservations) => http.get('/reservations')
const detail = (id) => http.get(`/reservations/${id}`)

// const create = (reservation) => {
//   console.log(reservation);
//   const data = new FormData()

//   console.log("en el service, el data")

//   console.log(data)

//   Object.keys(reservation).forEach(key => {
//     if (Array.isArray(reservation[key])) {
//         reservation[key].forEach(value => data.append(`${key}[]`, value))
//     } else data.append(key, reservation[key])
//   })
//   console.log("en el service, el data")

//   console.log(data)

//   return http.post(`/events/${reservation.event}/reservations`, data)
// }
export const create = (reservation) => http.post(`/events/${reservation.event}/reservations`, reservation)

const remove = (id) => http.delete(`/reservations/${id}`)


const service = {
  detail,
  create,
  list,
  remove
}

export default service;
