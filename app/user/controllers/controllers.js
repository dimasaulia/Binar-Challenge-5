require("dotenv").config();
const { Users } = require("../../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.list = (req, res) => {
  const query = {
    order: [["username", "ASC"]],
  };
  Users.findAll(query).then((car) => {
    res.status(200).json(car);
  });
};

exports.create = async (req, res) => {
  try {
    Users.create({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    });
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
};

exports.login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user.dataValues)
      return res.status(400).send({ message: "The username does not exist" });

    if (!bcrypt.compareSync(req.body.password, user.dataValues.password)) {
      return res.status(400).send({ message: "The password is invalid" });
    }

    const accesToken = generateToken(user.dataValues);
    const refreshToken = jwt.sign(
      user.dataValues,
      process.env.REFRESH_TOKEN_SECRET
    );
    res.json({
      accesToken: accesToken,
      refreshToken: refreshToken,
    });
  } catch {
    res.status(500).send("ERROR");
  }
};

function generateToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2m" });
}
