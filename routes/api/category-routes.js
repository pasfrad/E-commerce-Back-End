const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  try {
    Category.create(req.body);
    res.status(200).json({ message: 'Category has been created!' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', (req, res) => {
  try {
    Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then((categoryData) => {
        if (!categoryData) {
          res.status(404).json({ message: 'No category with that id' });
          return;
        }
        else {
          res.status(200).json({ message: 'Category updated' });
        }
      });
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = Category.destroy({
      where: { id: req.params.id }
      });
      if (!categoryData) {
        res.status(404).json({ message: 'No category with this id' });
        return;
      }
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
