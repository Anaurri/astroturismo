const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema ({
    name: {
        type: String,
        required: 'An user name is required'
    },
    description: {
        type: String,
        required: 'An description is required',
        minLength: [10, 'Description needs at least 10 characters']
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    capacity: {
        type: Number,
        required: 'Capacity is required',
        min: [1, 'Capacity must be grater than 0']
    },
    booking: {
      type: Number,
    },
    city: {
        type: String,
        required: 'The city where is the experience is required',

    },
    date: {
        type: Date,
        required: 'Start date is required',
        validate: {
          validator: function (value) {
            return moment().startOf('day').isBefore(moment(value))
          },
          message: props => `Starting must not be in the past`
        }    
    },
    duration: {
        type: Number,
    },
    price: {
        type: Number,
        default: 0
    }
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

