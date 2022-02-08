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

router.post('/new', [], async (req, res) => {
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
        const updatedOutfit = await Outfit.findByIdAndUpdate(req.params.idOutfit, { ...req.body });
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

// router.post(
//     "/upload",
//     upload.single("file" /* name attribute of <file> element in your form */),
//     (req, res) => {
//       const tempPath = req.file.path;
//       const targetPath = path.join(__dirname, "./uploads/image.png");
  
//       if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//         fs.rename(tempPath, targetPath, err => {
//           if (err) return handleError(err, res);
  
//           res
//             .status(200)
//             .contentType("text/plain")
//             .end("File uploaded!");
//         });
//       } else {
//         fs.unlink(tempPath, err => {
//           if (err) return handleError(err, res);
  
//           res
//             .status(403)
//             .contentType("text/plain")
//             .end("Only .png files are allowed!");
//         });
//     }
// });

module.exports = router;