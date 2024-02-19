const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");

const authUserToken = (id) => {
  return jwt.sign({ id }, jwt_secret, {
    expiresIn: "7d",
  });
};

//REGISTER
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userRegister = await User.findOne({ email });

  if (userRegister) {
    return res
      .status(422)
      .json({ errors: ["Este usuario já se encontra cadastrado"] });
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = User.create({
    name,
    email,
    password: passwordHash,
  });

  if (!newUser) {
    return res.status(422).json({ errors: ["Tente novamente mais tarde"] });
  }

  return res.status(200).json({
    msg: "Usuario Cadastrado.",
    _id: newUser._id,
    token: authUserToken(newUser._id),
  });
};

//LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const userRegister = await User.findOne({ email });

  if (!userRegister) {
    return res
      .status(422)
      .json({ errors: ["Este usuario não se encontra cadastrado"] });
  }

  if (!(await bcrypt.compare(password, userRegister.password))) {
    return res.status(422).json({ errors: ["Senha incorreta."] });
  }

  return res.status(200).json({
    _id: userRegister._id,
    token: authUserToken(userRegister._id),
  });
};

//PROFILE
const profileUser = async (req, res)=> {

  const user = req.user;

  return res.status(200).json(user);
}

module.exports = {
  registerUser,
  loginUser,
  profileUser,
};
