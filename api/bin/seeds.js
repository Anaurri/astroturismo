const mongoose = require('mongoose');
const Event = require('../models/event.model');
const User = require('../models/user.model');
const Lodge = require('../models/lodge.model');

const eventsData = require('../data/events.json');
const usersData = require('../data/users.json');
const lodgeData = require('../data/lodge.json');


require('../config/db.config');

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);
  mongoose.connection.db.dropDatabase()
    .then(() => console.log(`- Database dropped`))
    .then(() => User.create(usersData))
    .then(users => {
      console.info(`- Added ${users.length} users`)
      const eventsWithOwnerIds = eventsData.map(event => {
        const userEvent = users.find(user => user.email === event.company);
        event.company = userEvent.id;
        return event;
      })
      return eventsWithOwnerIds
    })
    .then((eventsWithOwnerIds) => {
      return Lodge.create(lodgeData)
        .then((lodges) => {
          return ([lodges, eventsWithOwnerIds])
        })
      // const lodges = new Promise((resolve, reject) => resolve())
      // return ([lodges, eventsWithOwnerIds])
    })
    .then(([lodges, eventsWithOwnerIds]) => {
      console.info(`- Added ${lodges.length} lodges`)
      const eventsWithLodgesIds = eventsWithOwnerIds.map(event => {
        const lodgeEvent = lodges.find(lodge => lodge.urlLodge === event.lodge);
        console.log (lodgeEvent)
        event.lodge = lodgeEvent?.id; //solo si tiene lodgevent el evento.
        return event;
      })
      return Event.create(eventsWithLodgesIds)
    })

    .then(events => console.info(`- Added ${events.length} events`))
    .then(() => console.info(`- All data created!`))
    .catch(error => console.error(error))
    .then(() => process.exit(0))
})

