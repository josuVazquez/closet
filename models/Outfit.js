const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outfitSchema = new Schema({
    img:
    {
        type: Array
    },
    season: {
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
    },
    uid: {
        type: String
    }
});

module.exports = mongoose.model('outfit', outfitSchema);