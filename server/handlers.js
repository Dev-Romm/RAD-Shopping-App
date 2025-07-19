const { Customer } = require( "./dbschemas");
const { hashPassword, comparePassword, generateToken} = require("./helpers");




async function register(req, res) {
  const { name, email, password } = req.body;
  console.log("Register attempt with email:", email); // Debugging line to check email
  try {
    const hashed = await hashPassword(password);
    const user = new Customer({ name, email, password: hashed });
    await user.save();

    const token = generateToken(user);
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error registering user", error: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email); // Debugging line to check email
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await Customer.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email" });

    const match = await comparePassword(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(user);
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
}

async function getCart(req, res) {
  const user = await Customer.findById(req.user.id);
  res.json({ orders: user.orders });
}

async function addToCart(req, res) {
  const { item, quantity, price } = req.body;

  const user = await Customer.findById(req.user.id);
  const existing = user.orders.find((o) => o.item === item);

  if (existing) {
    existing.quantity += quantity;
  } else {
    user.orders.push({ item, quantity, price });
  }

  await user.save();
  res.json({ orders: user.orders });
}

async function adjustQuantity(req, res) {
  const { item, quantity } = req.body;

  const user = await Customer.findById(req.user.id);
  const order = user.orders.find((o) => o.item === item);

  if (order) {
    order.quantity = quantity;
    await user.save();
    res.json({ orders: user.orders });
  } else {
    res.status(404).json({ message: "Item not found in cart" });
  }
}

async function removeFromCart(req, res) {
  const { item } = req.body;

  const user = await Customer.findById(req.user.id);
  user.orders = user.orders.filter((o) => o.item !== item);

  await user.save();
  res.json({ orders: user.orders });
}

module.exports = {
  register,
  login,
  getCart,
  addToCart,
  adjustQuantity,
  removeFromCart
};
