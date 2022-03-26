const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, though: ProductTag, as: "products_of_tag"}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, though: ProductTag, as: "products_of_tag"}]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    await Tag.create(req.body);
    res.status(200).json({ message: 'Tag has been created!' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then((tagData) => {
        if (!tagData) {
          res.status(404).json({ message: 'No tag with that id' });
          return;
        }
        else {
          res.status(200).json({ message: 'Tag updated' });
        }
      });
  } catch (err) {
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
    await Tag.destroy({
      where: {
        id: req.params.id
      }
    }).then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: 'Something went wrong' });
        return;
      }
      res.status(200).json({ message: 'Tag deleted' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
