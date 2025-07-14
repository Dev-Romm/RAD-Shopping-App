async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    const hashed = await hashPassword(password);
    const user = new User({ name, email, password: hashed });
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

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const match = await comparePassword(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user);
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
}

async function getCart(req, res) {
  const user = await User.findById(req.user.id);
  res.json({ orders: user.orders });
}

async function addToCart(req, res) {
  const { item, quantity } = req.body;

  const user = await User.findById(req.user.id);
  const existing = user.orders.find((o) => o.item === item);

  if (existing) {
    existing.quantity += quantity;
  } else {
    user.orders.push({ item, quantity });
  }

  await user.save();
  res.json({ orders: user.orders });
}

async function adjustQuantity(req, res) {
  const { item, quantity } = req.body;

  const user = await User.findById(req.user.id);
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

  const user = await User.findById(req.user.id);
  user.orders = user.orders.filter((o) => o.item !== item);

  await user.save();
  res.json({ orders: user.orders });
}
