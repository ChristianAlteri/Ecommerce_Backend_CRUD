const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get("/", (req, res) => {
  Tag.findAll({include: [Product]})
    .then((tags) => {
      res.json({data: tags});
      console.log("Find all tags was a success");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err: "Internal error",
      });
    });
});

// Find one Tag by its `id` value
router.get("/:id", (req, res) => {
  Tag.findByPk(req.params.id, {include: [Product]})
    .then((tags) => {
      res.json({data: tags});
      console.log("Find all tags was a success");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err: "Internal error",
      });
    });
});

// Create a new Tag
router.post("/", (req, res) => {
  
  Tag.create(req.body)
    .then((newTag) => {
      res.json({ data: newTag });
      console.log("New Tag added");
    })
    .catch((err) => {
      console.log(err);
      // Practicing validations
      res.status(500).json({ err: "Internal error" })
    });
});

// Update a Tag by its `id` value
router.put("/:id", (req, res) => {
  Tag.update(
    { tag_name: req.body.tag_name }, 
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

// Delete Tag by ID
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleted => {
    res.json({
      data: deleted,
    })
    console.log("Successfully deleted Tag");
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      err: 'Internal server error'
    })
  })
  
});


module.exports = router;
