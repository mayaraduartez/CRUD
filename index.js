//imports
var express = require("express");
var app = express();
var Usuario = require("./model/Usuario");
var path = require("path");
var upload = require("./config/multer.js");
//imports

//configs
app.use(express.static(path.join(__dirname, "public"))); //essa linha to dizendo pro express que dentro da pasta/public estão nossos arquivos statcs
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
//configs

//rota para listar dados
app.get("/", function (req, res) {
  Usuario.find({}).then(function (docs) {
    res.render("list.ejs", { Usuarios: docs });
  });
});

app.post("/", function (req, res) {
  console.log(req.body.tipo);
  if (req.body.tipo == "nome") {
    Usuario.find({ nome: new RegExp(req.body.pesquisar, "i") }).then(function (
      docs
    ) {
      res.render("list.ejs", { Usuarios: docs });
    });
  } else {
    Usuario.find({ email: new RegExp(req.body.pesquisar, "i") }).then(function (
      docs
    ) {
      res.render("list.ejs", { Usuarios: docs });
    });
  }
});

//rota de abrir tela do add
app.get("/add", function (req, res) {
  res.render("index.ejs", {});
});
//fim abrir tela de add

//adicionar dados no banco
app.post("/add", upload.single("foto"), function (req, res) {
  //upload.single salva uma foto só
  var usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    foto: req.file.filename,
  });

  usuario.save(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/");
    }
  });
});
//fim adicionar dados no banco

app.get("/edt/:id", function (req, res) {
  Usuario.findById(req.params.id).then(function (docs) {
    console.log(docs);
    res.render("edit.ejs", { Usuario: docs });
  });
});

app.post("/edt/:id", upload.single("foto"), function (req, res) {
  Usuario.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      foto: req.file.filename,
    },
    function (err, docs) {
      if (err) {
        res.send("Aconteceu um erro:" + err);
      } else {
        res.redirect("/");
      }
    }
  );
});

app.get("/del/:id", function (req, res) {
  Usuario.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/");
    }
  });
});

app.listen("3001", function () {
  console.log("O servidor foi iniciado na porta 3001");
});
