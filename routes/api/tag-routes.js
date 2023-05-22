const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', (req, res) => {
  Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    })
      .then((tags) => res.json(tags))
      .catch((err) => res.status(500).json(err));
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    })
      .then((tag) => {
        if (tag === 0) {
          // if no rows were affected, the tag with the given ID was not found
          res.status(404).json({ error: 'Tag not found' });
        } else {
          // found tag successfully
          res.status(200).json(tag);
        }
      })
      .catch((err) => res.status(500).json(err));
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
      .then((tag) => res.status(200).json(tag))
      .catch((err) => res.status(400).json(err));
});

// update a tag's name by id
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((tag) => {
      if (tag === 0) {
        // if no rows were affected, the product with the given ID was not found
        res.status(404).json({ error: 'Tag not found' });
      } else {
        // destroy was successful
        res.status(200).json({ message: 'Tag name updated.' });
      }
    })
    .catch((err) => res.status(400).json(err));
});

// delete tag by id
router.delete('/:id', (req, res) => {
  Tag.destroy({ 
    where: { 
      id: req.params.id 
    } 
  })
  .then((tag) => {
    if (tag === 0) {
      // if no rows were affected, the product with the given ID was not found
      res.status(404).json({ error: 'Tag not found' });
    } else {
      // destroy was successful
      res.status(200).json({ message: 'TAG DESTRUCTION SUCCESSFUL' });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;
