const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema ({
    typeOfNotification: {
        type: String,
        required: 'Type of notification is required',
        enum: ['message', 'notice', 'alert'], //message:una duda , notice:queda un dia para el evento. alert:se ha cancelado/actualizado el evento.
        default: 'message'
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: 'Sender is required'
    },
    recipient: { // va a tener varios
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: 'Recipient is required'
    },
    event: {
        type: Schema.Types.ObjectId,
        ref:'Event',
        require: 'The event related to the notification is required'
    },
    textNotification: {
        type: String,
        required: 'An description is required',
        minLength: [10, 'Description needs at least 10 characters']
    }
})

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;

