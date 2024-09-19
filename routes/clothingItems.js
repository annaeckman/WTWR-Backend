const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const {
  validateCardBody,
  validateIdParams,
} = require("../middlewares/validation");

// CRUD

// Read
router.get("/", getItems);

router.use(auth);

// Create
router.post("/", validateCardBody, createItem);

// Delete
router.delete("/:itemId", validateIdParams, deleteItem);

// like an item
router.put("/:itemId/likes", validateIdParams, likeItem);

// unlike an item
router.delete("/:itemId/likes", validateIdParams, unlikeItem);

module.exports = router;
