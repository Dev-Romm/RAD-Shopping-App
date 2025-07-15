const { Router } = require("express");
const { register, login, getCart, addToCart, adjustQuantity, removeFromCart } = require("./handlers");
const { verifyToken } = require("./helpers");

const router = Router();


router.post("/register", register);
router.post("/login", login);
router.get("/cart", verifyToken, getCart);
router.post("/cart/add", verifyToken, addToCart);
router.put("/cart/adjust", verifyToken, adjustQuantity);
router.delete("/cart/remove", verifyToken, removeFromCart);

module.exports = router;
