const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outfitSchema = new Schema({
    img:
    {
        type: Array
    },
    temporada: {
        type: String,
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

module.exports = mongoose.model('outfit', outfitSchema);