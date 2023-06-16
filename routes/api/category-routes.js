const router = require("express").Router();
const { where } = require("sequelize");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Find all Categories
router.get("/", (req, res) => {
  Category.findAll({include: [Product]})
    .then((categories) => {
      res.json({data: categories});
      console.log("Find all categories was a success");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err: "Internal error",
      });
    });
});

// Find one Category by its `id` value
router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id, {include: [Product]})
    .then((category) => {
      res.json({data: category});
      console.log("Find all categories was a success");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err: "Internal error",
      });
    });
});

// Create a new Category
router.post("/", (req, res) => {
  const { category_name } = req.body;
  if (!category_name) {
    return res.status(500).json({ err: "category_name is required" });
  }
  
  Category.create(req.body)
    .then((newCategory) => {
      res.json({ data: newCategory });
      console.log("New category added");
    })
    .catch((err) => {
      console.log(err);
      // Practicing validations
      if (err.errors[0].type === 'Validation error') {
        return res.status(500).json({ err: "Category must be longer than 3 characters" });
      } else {
        return res.status(500).json({ err: "Internal error" });
      }
    });
});

// Update a category by its `id` value
router.put("/:id", (req, res) => {
  Category.update(
    { category_name: req.body.category_name }, 
    { where: { id: req.params.id } }
  )
  .then((rowsUpdated) => {
    res.json(rowsUpdated)
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      err: 'Internal server error'
    })
  })
});

// Delete Category by ID
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleted => {
    res.json({
      data: deleted,
    })
    console.log("Successfully deleted Category");
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      err: 'Internal server error'
    })
  })
  
});

module.exports = router;
