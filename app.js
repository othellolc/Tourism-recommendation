require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const Recommender = require("likely");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
  session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/tourismDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
const userSchema = new mongoose.Schema({
  email: String,
  password: {
    type: String,
    minlength: 6,
  },
  mahendra_cave: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  bat_cave: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  gupteswori_cave: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  crazy_cave: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  fewa_lake: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  begnas_lake: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  rupa_lake: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  deepang_taal: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  kaun_dada: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  sarangkot_dada: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  methlang_dada: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  gharmi_dada: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  shanti_stupa: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  bindabasini_temple: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  barahi_temple: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  matepani_gumba: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//get routes or Login route
app.get("/", function (req, res) {
  res.render("index.ejs");
});

//post home route login route
app.post("/", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/home");
      });
    }
  });
});

//get register route
app.get("/register", function (req, res) {
  res.render("register.ejs");
});

//post register
app.post("/register", function (req, res) {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/home");
        });
      }
    }
  );
});

//data sets

//home route
app.get("/home", function (req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          var dataSets = [
            [1, 3, 4, 3, 5, 4, 3, 2, 2, 4, 3, 4, 4, 3, 4, 2],
            [5, 3, 3, 2, 4, 5, 3, 2, 2, 3, 1, 5, 2, 3, 2, 3],
            [3, 2, 4, 2, 3, 2, 2, 2, 2, 1, 1, 3, 1, 3, 4, 2],
            [4, 4, 3, 4, 2, 4, 2, 2, 3, 4, 2, 3, 4, 2, 1, 2],
            [1, 2, 3, 0, 5, 3, 2, 1, 4, 5, 3, 1, 1, 2, 3, 1],
            [4, 3, 2, 2, 5, 4, 3, 2, 2, 4, 1, 3, 4, 4, 2, 2],
            [3, 0, 1, 1, 0, 3, 0, 1, 4, 3, 2, 1, 5, 3, 2, 3],
            [2, 3, 2, 1, 4, 4, 3, 1, 3, 3, 2, 1, 4, 2, 3, 2],
          ];
          var arr = [];
          // if (arr.length <= 7) {
          arr.push(foundUser.mahendra_cave);
          arr.push(foundUser.bat_cave);
          arr.push(foundUser.gupteswori_cave);
          arr.push(foundUser.crazy_cave);
          arr.push(foundUser.fewa_lake);
          arr.push(foundUser.begnas_lake);
          arr.push(foundUser.rupa_lake);
          arr.push(foundUser.deepang_taal);
          arr.push(foundUser.kaun_dada);
          arr.push(foundUser.sarangkot_dada);
          arr.push(foundUser.methlang_dada);
          arr.push(foundUser.gharmi_dada);
          arr.push(foundUser.shanti_stupa);
          arr.push(foundUser.bindabasini_temple);
          arr.push(foundUser.barahi_temple);
          arr.push(foundUser.matepani_gumba);
          //}
          if (dataSets.length <= 8) {
            dataSets.push(arr);
          }
          var rowLabels = ["a", "b", "c", "d", "e", "f", "g", "h", "me"];
          var colLabels = [
            "mahendra_cave",
            "bat_cave",
            "gupteswori_cave",
            "crazy_cave",
            "fewa_lake",
            "begnas_lake",
            "rupa_lake",
            "deepang_taal",
            "kaun_dada",
            "sarangkot_dada",
            "methlang_dada",
            "gharmi_dada",
            "shanti_stupa",
            "bindabasini_temple",
            "barahi_temple",
            "matepani_gumba",
          ];
          // arr.forEach((element) => {
          //   if ((element = 0)) {
          //     placeIndex = element;
          //     console.log(arr.indexOf(element));
          //   }
          // });
          const Model = Recommender.buildModel(dataSets, rowLabels, colLabels);
          const recommendations = Model.recommendations("me");
          //var allItems = Model.rankAllItems("me");

          console.log(recommendations);
          //console.log(allItems);
          console.log(arr);
          //console.log(dataSets);
          res.render("home", {
            recommended: recommendations,
            currentUser: foundUser.username,
          });
          arr = [];
          //console.log(arr.length);
        }
      }
    });
  } else {
    res.redirect("/");
  }
});

//contents insie home route
app.get("/home/caves", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("./insidehome/caves");
  } else {
    res.redirect("/");
  }
});
app.get("/home/lakes", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("./insidehome/Lakes");
  } else {
    res.redirect("/");
  }
});
app.get("/home/sports", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("./insidehome/Sports");
  } else {
    res.redirect("/");
  }
});

app.get("/home/hills", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("./insidehome/Hills");
  } else {
    res.redirect("/");
  }
});

app.get("/home/cultural", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("./insidehome/Cultural");
  } else {
    res.redirect("/");
  }
});

//about route
app.get("/about", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("aboutus");
  } else {
    res.redirect("/");
  }
});

//contact route
app.get("/contact", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("contactus");
  } else {
    res.redirect("/");
  }
});

//gallery route
app.get("/gallery", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("gallery");
  } else {
    res.redirect("/");
  }
});

//logout route
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

//CAVES
//mahendra_cave
app.post("/home/caves/mahendra", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.mahendra_cave = userRating;
        foundUser.save(function () {
          res.redirect("/home/caves");
        });
      }
    }
  });
});
//bat_cave
app.post("/home/caves/bat", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.bat_cave = userRating;
        foundUser.save(function () {
          res.redirect("/home/caves");
        });
      }
    }
  });
});
//gupteswori_cave
app.post("/home/caves/gupteswor", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.gupteswori_cave = userRating;
        foundUser.save(function () {
          res.redirect("/home/caves");
        });
      }
    }
  });
});
//crazy_cave
app.post("/home/caves/crazy", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.crazy_cave = userRating;
        foundUser.save(function () {
          res.redirect("/home/caves");
        });
      }
    }
  });
});

//Lakes
//fewa_lake
app.post("/home/caves/fewa", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.fewa_lake = userRating;
        foundUser.save(function () {
          res.redirect("/home/lakes");
        });
      }
    }
  });
});
//begnas_lake
app.post("/home/caves/begnas", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.begnas_lake = userRating;
        foundUser.save(function () {
          res.redirect("/home/lakes");
        });
      }
    }
  });
});
//rupa_lake
app.post("/home/caves/rupa", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.rupa_lake = userRating;
        foundUser.save(function () {
          res.redirect("/home/lakes");
        });
      }
    }
  });
});
//deepang_taal
app.post("/home/caves/deepang", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.deepang_taal = userRating;
        foundUser.save(function () {
          res.redirect("/home/lakes");
        });
      }
    }
  });
});

//Hills
//Kaun
app.post("/home/hills/kaun", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.kaun_dada = userRating;
        foundUser.save(function () {
          res.redirect("/home/hills");
        });
      }
    }
  });
});
//Sarangkot
app.post("/home/hills/sarangkot", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.sarangkot_dada = userRating;
        foundUser.save(function () {
          res.redirect("/home/hills");
        });
      }
    }
  });
});
//Methlang
app.post("/home/hills/methlang", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.methlang_dada = userRating;
        foundUser.save(function () {
          res.redirect("/home/hills");
        });
      }
    }
  });
});
//Gharmi
app.post("/home/hills/gharmi", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.gharmi_dada = userRating;
        foundUser.save(function () {
          res.redirect("/home/hills");
        });
      }
    }
  });
});

//Cultural Places
//Shanti Stupa
app.post("/home/cultural/shanti", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.shanti_stupa = userRating;
        foundUser.save(function () {
          res.redirect("/home/cultural");
        });
      }
    }
  });
});
//Bindabasini_temple
app.post("/home/cultural/bindabasini", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.bindabasini_temple = userRating;
        foundUser.save(function () {
          res.redirect("/home/cultural");
        });
      }
    }
  });
});
//Barahi_Temple
app.post("/home/cultural/barahi", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.barahi_temple = userRating;
        foundUser.save(function () {
          res.redirect("/home/cultural");
        });
      }
    }
  });
});
//Matepani_Gumba
app.post("/home/cultural/matepani", (req, res) => {
  const userRating = req.body.rating;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.matepani_gumba = userRating;
        foundUser.save(function () {
          res.redirect("/home/cultural");
        });
      }
    }
  });
});

//start server
app.listen(3000, function () {
  console.log("Server has started in port 3000");
});
