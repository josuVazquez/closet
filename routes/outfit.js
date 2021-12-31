const router = require('express').Router();
const Outfit = require('../models/Outfit');
const { check, validationResult } = require('express-validator');
// const { checkAdmin } = require('../middlewares');

router.get('/', (req, res) => {
    Outfit.find()
        .then(outfit => {
            res.json(outfit);
        })
        .catch(error => {
            res.json(error);
    });
});

router.post('/new', [
    check('title', 'El campo title es obligatorio').not(),
    check('description', 'El campo text es obligatorio').exists(),
    check('category', 'El campo categoria es obligatorio').exists()
], async (req, res) => {
    // Comprobamos los errores del BODY
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
        const updatedOutfit = await Outfit.findByIdAndUpdate(req.params.idOutfit, req.body, { new: true });
        res.json(updatedOutfit);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.delete('/delete/:idOutfit', (req, res) => {
    Outfit.findByIdAndRemove(req.params.idOutfit)
        .then(deletedOutfit => {
            res.json(deletedOutfit);
        }).catch(error => {
            res.json({ error: error.message });
        });
});

// /* GET single post. */
router.get('/:idOutfit', function(req, res, next) {
    Outfit.findById(req.params.idOutfit)
        .then(outfit => {
            res.json(outfit);
        })
        .catch(error => {
            res.json({ error: error.message });
        });
});

module.exports = router;