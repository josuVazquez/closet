const router = require('express').Router();
const Item = require('../models/Item');
const { check, validationResult } = require('express-validator');
// const { checkAdmin } = require('../middlewares');

router.get('/', (req, res) => {
    Item.find()
        .then(item => {
            res.json(item);
        })
        .catch(error => {
            res.json(error);
    });
});

router.post('/new', [], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }
    try {
        const newItem = await Item.create(req.body);
        res.json(newItem);
    } catch (error) {
        res.json(error);
    }
});

router.put('/update/:idItem', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.idItem, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.delete('/delete/:idItem', (req, res) => {
    Item.findByIdAndRemove(req.params.idItem)
        .then(deletedItem => {
            res.json(deletedItem);
        }).catch(error => {
            res.json({ error: error.message });
        });
});

// /* GET single post. */
router.get('/:idItem', function(req, res, next) {
    Item.findById(req.params.idItem)
        .then(item => {
            res.json(item);
        })
        .catch(error => {
            res.json({ error: error.message });
        });
});

module.exports = router;