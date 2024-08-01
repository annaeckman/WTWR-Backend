const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

// CRUD

// Create
router.post("/", createItem);

// Read
router.get("/", getItems);

// Update
// router.put("/:itemId", updateItem);

// Delete
router.delete("/:itemId", deleteItem);

// like an item
router.put("/:itemId/likes", likeItem);

// unlike an item
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
