const { CarRent } = require("../../../models");

exports.list = (req, res) => {
  CarRent.findAll().then((car) => {
    res.status(200).json(car);
  });
};

exports.create = (req, res) => {
  CarRent.create({
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    foto: req.body.foto,
  }).then((a) => {
    res.status(200).redirect("/");
  });
};

exports.delete = (req, res) => {
  CarRent.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
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
  const query = {
    where: {
      id: req.params.id,
    },
  };
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
      res.status(200).redirect("/");
    })
    .catch((err) => {
      res.status(400).send("Gagal mengupdate artikel!");
    });
};

exports.filter = (req, res) => {
  const query = {
    where: {
      size: req.params.size,
    },
  };

  // console.log(query);
  CarRent.findAll(query).then((cars) => res.status(200).json(cars));
};
