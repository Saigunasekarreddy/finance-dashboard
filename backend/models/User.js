// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 100
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         validate: {
//             validator: function(v) {
//                 return /\S+@\S+\.\S+/.test(v);
//             },
//             message: props => `${props.value} is not a valid email!`
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 6
//     }
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        default: 'User'  // Set default role if not provided
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
