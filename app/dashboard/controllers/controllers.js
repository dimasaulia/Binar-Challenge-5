const axios = require("axios");

exports.index = (req, res) => {
  axios
    .get("http://localhost:8000/api/cars")
    .then((resp) => {
      const data = { cars: resp.data, name: "Dimas" };
      res.render("index", data);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.add = (req, res) => {
  res.render("add");
};

exports.edit = (req, res) => {
  const url = `http://localhost:8000/api/car/${req.query.id}`;
  axios
    .get(url)
    .then((resp) => {
      const { id, name, price, size, foto } = resp.data;
      const data = {
        id,
        name,
        price,
        size,
        foto,
      };
      res.render("edit", data);
    })
    .catch((error) => {
      console.log(error);
    });
};
