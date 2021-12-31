const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outfitSchema = new Schema({
    img:
    {
        data: Buffer,
        contentType: String
    },
    title: {
        type: String,
        required: [true, 'Title is obligatory']
    },
    category: {
        type: String,
        required: [true, 'Category is obligatory']
    },
    description: {
        type: String,
        required: [true, 'Description is obligatory']
    },
});

module.exports = mongoose.model('outfit', outfitSchema);