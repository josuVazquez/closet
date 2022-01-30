const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    img:
    {
        type: Array
    },
    name: {
        type: String,
    },
    description: {
        type: String
    },
    complements: {
        type: Array
    }
});

module.exports = mongoose.model('item', itemSchema);