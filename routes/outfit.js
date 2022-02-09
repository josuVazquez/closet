const router = require('express').Router();
const Outfit = require('../models/Outfit');
const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    Outfit.find(req.filterUid)
        .then(outfit => {
            res.json(outfit);
        })
        .catch(error => {
            res.json(error);
    });
});

router.post('/new', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }
    try {
        const newOutfit = await Outfit.create(req.body);
        res.json(newOutfit);
    } catch (error) {
        res.json(error);
    }
});

router.put('/update/:idOutfit', async (req, res) => {
    try {
        const updatedOutfit = await Outfit.findOneAndUpdate({ '_id': req.params.idOutfit, ...req.filterUid }, req.body);
        res.json(updatedOutfit);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.delete('/delete/:idOutfit', (req, res) => {
    Outfit.findOneAndDelete({ '_id': req.params.idOutfit, ...req.filterUid })
        .then(deletedOutfit => {
            res.json(deletedOutfit);
        }).catch(error => {
            res.json({ error: error.message });
        });
});

// /* GET single post. */
router.get('/:idOutfit', function(req, res, next) {
    Outfit.findOne({ '_id': req.params.idOutfit, ...req.filterUid })
        .then(outfit => {
            res.json(outfit);
        })
        .catch(error => {
            res.json({ error: error.message });
        });
});


module.exports = router;