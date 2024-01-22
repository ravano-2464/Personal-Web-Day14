'use strict';

const express = require('express');
const path = require('path');
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const app = express();
const port = 7000;

const { development } = require("./src/assets/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const SequelizePool = new Sequelize(development);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'src/views'));

app.use("/assets", express.static(path.join(__dirname, 'src/assets')));
app.use(express.urlencoded({ extended: false }));

let data = [];

app.get('/', home);
app.get('/contact', contact);
app.get('/My-Project', MyProject);
app.get('/add-My-Project', addMyProjectView);
app.post('/add-My-Project', addMyProject);

app.get('/My-Project-detail/:id', MyProjectDetail);
app.get('/testimonial', testimonials);

app.get('/update-My-Project/:id', updateMyProjectView);
app.post('/update-My-Project/:id', updateMyProject);

app.get('/delete-My-Project/:id', deleteMyProject);
app.post('/delete-My-Project/:id', deleteMyProject);

app.use(
    session({
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1 * 60 * 60 * 1000,
      },
      resave: false,
      store: session.MemoryStore(),
      secret: "session-storage",
      saveUninitialized: true,
    })
  );
  app.use(flash());

const models = require('./src/assets/models');
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

app.use((req, res, next) => {
    req.models = models;
    next();
  });  

async function home(req, res) {
  const projectNew = await SequelizePool.query("SELECT * FROM myproject");
  const titlePage = "Home";

  // console.log(my-projectNew[0]);
  res.render("index", {
    data: projectNew[0],
    titlePage,
  });
}

function contact(req, res) {
    res.render('contact');
}

function MyProject(req, res) {
    res.render('My-Project', { data, title: "My Project" });
}

function addMyProjectView(req, res) {
    res.render('add-My-Project');
}

function addMyProject(req, res) {
    const title = req.body.title;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const description = req.body.description;
    const technologies = req.body.technologies;
  
    console.log("Project Name:", title);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("description:", description);
    console.log("technologies", technologies);
  
    data.push({
        title,
        startDate,
        endDate,
        description,
        technologies,
    });

    res.redirect('/My-Project');
}

function MyProjectDetail(req, res) {
    const { id } = req.params;
    const projectDetailsData = data[id];
    res.render('My-Project-detail', { data: projectDetailsData });
}

function testimonials(req, res) {
    res.render('testimonial');
}

async function updateMyProjectView(req, res) {
    const { id } = req.params;
    const data = await SequelizePool.query(
      "SELECT * FROM myproject where id = " + id
    );
  
    res.render("update-My-Project", {
      data: data[0][0],
    });
  }

function updateMyProject(req, res) {
    const { id } = req.params;
    const { title, startDate, endDate, technologies, description } = req.body;
    const technologiesArray = Array.isArray(technologies) ? technologies : [technologies];

    if (data[+id]) {
        data[+id] = {
            title,
            startDate,
            endDate,
            technologies: technologiesArray,
            description,
        };

        res.redirect('/My-Project');
    } else {
        res.redirect('/My-Project');
    }
}

async function deleteMyProject(req, res) {
    const { id } = req.params;
    const data = await SequelizePool.query(
      "DELETE FROM myproject where id = " + id
    );
  
    res.redirect("/");
  }

app.listen(port, () => {
    console.log(`Server Berjalan Di Port ${port}`);
});