const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    name: {
        type: String,
        required: 'An user name is required'
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: 'Company is required'
    },
    description: {
        type: String,
        required: 'An description is required',
        minLength: [10, 'Description needs at least 10 characters']
    },
    tags: [String],

    city: {
        type: String,
    },
    packWithLodge: {
        enum: ['pack', 'nopack']
    },
    lodge: {
        type: Schema.Types.ObjectId,
        ref: 'Lodge',
    },
    location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point'
        },
        coordinates: {
          type: [Number],
          required: 'The location of the event is required',
        }
      },
    date: {
        type: Date,
        required: 'Date is required',
        validate: {
          validator: function (value) {
            return moment().startOf('day').isBefore(moment(value))
          },
          message: props => `Date must not be in the past`
        }    
    },
    duration: {
        type: Number,
        required: 'Approximate duration in minutes',

    },
    capacity: {
        type: Number,
        required: 'Capacity is required',
        min: [1, 'Capacity must be grater than 0']
    },
    price: {
        type: Number,
        default: 0
    }
    // ,
    // // meetingPoint: {
    //     type: {
    //         type: String,
    //         enum: ['Point'],
    //         default: 'Point'
    //       },
    //       coordinates: {
    //         type: [Number],
    //         required: 'The location of the event is required',
    //       }
    // },
} , {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        ret.id = doc.id;
        return ret;
        }
    }
}
)
eventSchema.index({ location: '2dsphere' });
/*Este atributo virtual nos va relacionar las reservas con el evento para saber las plazas que nos quedan. 
(las reservas no son monoplaza, una reserva puede llevar 4 plazas). NO tiene valor como tal. CUando queramos saber las 
plazas que nos quedan , tendremos que contarlas.*/
eventSchema.virtual("reservations", {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'event'
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

