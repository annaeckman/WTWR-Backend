const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const { validateCardBody } = require("../middlewares/validation");

// CRUD

// Read
router.get("/", getItems);

router.use(auth);

// Create
router.post("/", validateCardBody, createItem);

// Delete
router.delete("/:itemId", deleteItem);

// like an item
router.put("/:itemId/likes", likeItem);

// unlike an item
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
