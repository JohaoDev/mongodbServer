("use strict");

const connectDB = require("../config/db"),
  fs = require("fs"),
  { ObjectId } = require("mongodb");

let getUsers = async (req, res) => {
  let db = await connectDB();

  db.collection("users")
    .find()
    .toArray()
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let getUserByID = async (req, res) => {
  let db = await connectDB(),
    id = parseInt(req.params.id);
  // id = ObjectId(req.params.id);

  db.collection("users")
    .find({ id })
    .toArray()
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let getUserByName = async (req, res) => {
  let db = await connectDB(),
    name = req.params.name;

  db.collection("users")
    .find({ name })
    .toArray()
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let postUser = async (req, res) => {
  let db = await connectDB(),
    data = req.body.data;

  db.collection("users")
    .insertOne(data)
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let postUsers = async (req, res) => {
  let db = await connectDB(),
    data = req.body.data; //Array de Objetos

  db.collection("users")
    .insertMany(data)
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let patchUser = async (req, res) => {
  let db = await connectDB(),
    id = parseInt(req.query.id),
    data = req.body.data;

  db.collection("users")
    .updateOne({ id }, { $set: data })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let patchUsers = async (req, res) => {
  let db = await connectDB(),
    data = req.body.data; //Array de Objetos

  data.forEach((element, i) => {
    let id = element.id;

    db.collection("users").updateMany({ id }, { $set: element });
    if (i + 1 === data.length) {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    }
  });
};

let deleteUser = async (req, res) => {
  let db = await connectDB(),
    id = parseInt(req.params.id);

  db.collection("users")
    .deleteOne({ id })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "ready",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

/*
query >>> http://localhost:3500/api/endPoint?name=Johao&lastname=Perlaza&age=21
          endPoint >>> api.get("get_users", ...)
          
                        req.query.name req.query.lastname req.query.age

params >> http://localhost:3500/api/endPoint/Johao/Perlaza
          endPoint >>> api.get("get_users/:name", ...)
                        api.get("get_users/:name/:lastname/:age", ...)
          
                        req.params.name req.params.lastname req.params.age

body >>>  http://localhost:3500/api/endPoint
          endPoint >>> api.post("createUser", ...)

          req.body.data
          {
            data: {
              name: "Johao",
              lastname: "Perlaza",
              age: 21
            }
          }

          req.body
          {
            name: "Johao",
            lastname: "Perlaza"
            age: 21
          }
*/

let postmanQuery = (req, res) => {
  let name = req.query.name;
  let lastname = req.query.lastname;
  let age = req.query.age;
  let person = req.query;

  console.log(person);

  let data = {
    name,
    lastname,
    age,
  };

  res.status(200).json({
    ok: true,
    data,
    msg: "",
  });
};

let postmanParams = (req, res) => {
  let name = req.params.name;
  let lastname = req.params.lastname;
  let age = req.params.age;
  let person = req.params;

  console.log(person);

  let data = {
    name,
    lastname,
    age,
  };

  res.status(200).json({
    ok: true,
    data,
    msg: "",
  });
};

let postmanBody = (req, res) => {
  let data = req.body.data;

  res.status(200).json({
    ok: true,
    data,
    msg: "",
  });
};

module.exports = {
  getUsers,
  getUserByID,
  getUserByName,
  postUser,
  postUsers,
  patchUser,
  patchUsers,
  deleteUser,

  postmanQuery,
  postmanParams,
  postmanBody,
};
