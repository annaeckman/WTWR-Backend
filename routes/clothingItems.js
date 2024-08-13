const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
  updateItem,
} = require("../controllers/clothingItems");

// CRUD

// Read
router.get("/", getItems);

router.use(auth);

// Create
router.post("/", createItem);

// Update
router.put("/:itemId", updateItem);

// Delete
router.delete("/:itemId", deleteItem);

// like an item
router.put("/:itemId/likes", likeItem);

// unlike an item
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
