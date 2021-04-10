const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lodgeSchema = new Schema ({
    name: {
        type: String,
        required: 'An user name is required'
    },
    description: {
      type: String,
      required: 'An description is required',
      minLength: [10, 'Description needs at least 10 characters']
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: void 0,
        required: 'The location of the hotel is required',
        validate: {
          validator: function([lng, LAT]) {
            return isFinite(lng) && isFinite(lat) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
          },
          message: props => `Invalid location coordinates`
        }
      }
    },
    urlLodge: {
      type: String,
      validate: {
       validator: function (value) {
         try {
           const url = new URL(value);
           return url.protocol === 'http:' || url.protocol === 'https:'
         } catch (error) {
           return false;
         }
       },
       message: props => `Invalid image URL`
     }   
   }
} , {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        ret.id = doc.id;
        ret.location = ret.location.coordinates;
        return ret;
        }
    }
}
)
lodgeSchema.index({ location: '2dsphere' });

const Lodge = mongoose.model('Lodge', lodgeSchema);
module.exports = Lodge;

