const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        require: 'Event is required'
    },
    eventName: {
        type: String,
        required: 'A title is required',
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: 'Client is required'
    },
    date: {
        type: Date,
        // required: 'Date is required',
        validate: {
            validator: function (value) {
                return moment().startOf('day').isBefore(moment(value))
            },
            message: props => `Date must not be in the past`
        }
    },
    numberOfPeople: {
        type: Number,
        required: 'Number of people is required'
    },
    price: {
        type: Number,
    },
    paymentState: {
        type: String,
        requied: 'Required',
        enum: ['prepaid', 'due'],
        default: 'due'
    },
    paymentId: {

    }
}
)

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;

