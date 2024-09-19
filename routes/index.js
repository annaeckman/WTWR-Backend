const router = require("express").Router();
const itemRouter = require("./clothingItems");
const userRouter = require("./users");
const { NotFoundError } = require("../utils/errors");
const { createUser, loginUser } = require("../controllers/users");
const {
  validateRegisterBody,
  validateLoginBody,
} = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.post("/signin", validateLoginBody, loginUser);
router.post("/signup", validateRegisterBody, createUser);

router.use((req, res) => {
  next(new NotFoundError("requested resource not found"));
});

module.exports = router;
