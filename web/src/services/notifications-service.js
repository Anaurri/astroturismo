import http from './base-api-service';

const list = (notifications) => http.get('/notifications/me')
const create = (notification) => {
  const data = new FormData()

  Object.keys(notification).forEach(key => {
    if (Array.isArray(notification[key])) {
        notification[key].forEach(value => data.append(`${key}[]`, value))
    } else data.append(key, notification[key])
  })

  return http.post(`/notifications/me`, data)
}

const service = {
  create,
  list
}

export default service;
