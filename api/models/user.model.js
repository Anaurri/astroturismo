const mongoose = require('mongoose');
const totp = require("totp-generator");
const Schema = mongoose.Schema
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: 'An user name is required'
    },
    email: {
        unique: true,
        type: String,
        required: 'A valid email is required',
        match: [EMAIL_PATTERN, 'the email is invalid']
    },
    description: { /*Solo habrá description si el role===company*/ 
        type: String,
    },
    phoneNumber: { /*Solo habrá phoneNumber si el role===company*/ 
        type: String,
    },
    contactEmail: { /*Solo habrá contactEmail si el role===company*/ 
        unique: true, 
        type: String,
        required: 'A valid email is required',
        match: [EMAIL_PATTERN, 'the email is invalid']
    },
    city: { /*Solo habrá city si el role===company*/ 
        type: String,
    },
    totpSecret: {
        type: String,
        required: true,
        default: () =>
            (Math.random().toString(36).substr(2) +
            Math.random().toString(36).substr(2) +
            Math.random().toString(36).substr(2)).slice(0, 16)
    },
    password: {
        type: String,
        required: 'A valid password is required',
        match: [PASSWORD_PATTERN, 'the password is invalid']
    },
    role: {
        type: String,
        required: 'Are you a company?',
        enum: ['admin', 'client', 'company'],
        default: 'client'
    },
    avatar: {
        type: String,
        default: `https://res.cloudinary.com/anthillweb/image/upload/v1613921232/users-avatars/Flik_gyce2o.png`
      }
}, {
    timestamps: true,

    /*Para el postman: son métodos de la clase Hash para poder usar el postman y que no falle*/
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.totpSecret;
            return ret
        }
    },
    toObject: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.totpSecret;
            return ret
        }
    }
})

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        next();
        });
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

userSchema.methods.getTOTPQR = function () {
  return `otpauth://totp/Iron%20Events:${this.email}?secret=${this.totpSecret}&issuer=Iron%20Events`
};

userSchema.methods.checkTOTP = function (code) {
  return totp(this.totpSecret)
};

const User = mongoose.model('User', userSchema);
module.exports = User;
