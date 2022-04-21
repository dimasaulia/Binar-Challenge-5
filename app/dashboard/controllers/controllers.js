const axios = require("axios");
const port = 8080;
exports.index = (req, res) => {
  axios
    .get(`http://localhost:${port}/api/cars`)
    .then((resp) => {
      const messages = req.flash("message");
      const data = { cars: resp.data, messages };
      res.render("index", data);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.add = (req, res) => {
  const data = {
    message: req.flash("message"),
    flash_name: req.flash("name"),
    flash_price: req.flash("price"),
    flash_size: req.flash("size")[0],
    flash_foto: req.flash("foto"),
  };
  res.status(200).render("add", data);
};

exports.edit = (req, res) => {
  const url = `http://localhost:${port}/api/car/${req.query.id}`;
  axios
    .get(url)
    .then((resp) => {
      if (resp.data === null) {
        req.flash("message", "Data Mobil Tidak Ditemukan");
        res.status(200).redirect("/");
      }
      const { id, name, price, size, foto } = resp.data;
      const data = {
        id,
        name,
        price,
        size,
        foto,
        message: req.flash("message"),
      };
      res.render("edit", data);
    })
    .catch((error) => {
      console.log(error);
    });
};
