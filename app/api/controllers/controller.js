const { CarRent } = require("../../../models");
const FormValidators = require("../../../validators/validators");
exports.list = (req, res) => {
  const query = {
    order: [["name", "ASC"]],
  };
  CarRent.findAll(query).then((car) => {
    res.status(200).json(car);
  });
};

exports.create = (req, res) => {
  const formValidators = new FormValidators([
    {
      form_data: req.body.name,
      form_name: "name",
    },
    {
      form_data: req.body.price,
      form_name: "price",
    },
    {
      form_data: req.body.size,
      form_name: "size",
    },
    {
      form_data: req.body.foto,
      form_name: "foto",
    },
  ]);

  const name = req.body.name || "";
  const price = req.body.price || "";
  const size = req.body.size || "small";
  const foto = req.body.foto || "";

  formValidators.validateUserInput();
  formValidators.validateOptionInput(
    ["small", "medium", "large"],
    req.body.size
  );

  if (formValidators.errors.length) {
    req.flash("message", formValidators.errors);
    req.flash("name", name);
    req.flash("price", price);
    req.flash("size", size);
    req.flash("foto", foto);
    res.status(200).redirect("/add");
  } else {
    CarRent.create({
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      foto: req.body.foto,
    }).then((a) => {
      req.flash("message", "Berhasil Menambahkan Mobil!!");
      res.status(200).redirect("/");
    });
  }
};

exports.delete = (req, res) => {
  CarRent.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    req.flash("message", "Berhasil Menghapus Mobil!!");
    res.status(200).redirect("/");
  });
};

exports.get = (req, res) => {
  CarRent.findOne({
    where: {
      id: req.params.id,
    },
  }).then((car) => {
    res.status(200).json(car);
  });
};

exports.update = (req, res) => {
  const formValidators = new FormValidators([
    {
      form_data: req.body.name,
      form_name: "name",
    },
    {
      form_data: req.body.price,
      form_name: "price",
    },
    {
      form_data: req.body.size,
      form_name: "size",
    },
    {
      form_data: req.body.foto,
      form_name: "foto",
    },
  ]);

  formValidators.validateUserInput();
  formValidators.validateOptionInput(
    ["small", "medium", "large"],
    req.body.size
  );

  const query = {
    where: {
      id: req.params.id,
    },
  };

  if (formValidators.errors.length) {
    req.flash("message", formValidators.errors);
    res.status(200).redirect(`/update?id=${req.params.id}`);
  } else {
    CarRent.update(
      {
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        foto: req.body.foto,
      },
      query
    )
      .then(() => {
        req.flash("message", "Berhasil Memperbaharui Data Mobil!!");
        res.status(200).redirect("/");
      })
      .catch((err) => {
        res.status(400).send("Gagal mengupdate mobil!");
      });
  }
};

exports.filter = (req, res) => {
  const query = {
    where: {
      size: req.params.size,
    },
    order: [["name", "ASC"]],
  };
  CarRent.findAll(query).then((cars) => res.status(200).json(cars));
};
