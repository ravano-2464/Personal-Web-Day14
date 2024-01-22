'use strict';

const express = require('express');
const path = require('path');
const { Sequelize, QueryTypes } = require('sequelize');
const session = require('express-session');
const flash = require('express-flash');
const app = express();
const port = 7000;

const { development } = require('./src/assets/config/config.json');
const SequelizePool = new Sequelize(development);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1 * 60 * 60 * 1000,
    },
    resave: false,
    store: session.MemoryStore(),
    secret: 'session-storage',
    saveUninitialized: true,
  })
);
app.use(flash());

const models = require('./src/assets/models/myproject.js');
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
  const projectNew = await SequelizePool.query('SELECT * FROM myproject');
  const titlePage = 'Home';

  res.render('index', {
    data: projectNew[0],
    titlePage,
  });
}

function contact(req, res) {
  const titlePage = 'Contact';
  res.render('contact', {
    titlePage,
  });
}

async function MyProject(req, res) {
  const titlePage = 'My Project';

  res.render('my-project', {
    data: titlePage,
  });
}

function addMyProjectView(req, res) {
  res.render('add-My-Project');
}

async function addMyProject(req, res) {
  try {
    const { projectName, startDate, endDate, description, techIcon } = req.body;

    const dateOne = new Date(startDate);
    const dateTwo = new Date(endDate);
    const time = Math.abs(dateTwo - dateOne);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(time / (1000 * 60 * 60 * 24) / 365);

    let distance = [];

    if (days < 24) {
      distance += days + ' Days';
    } else if (months < 12) {
      distance += months + ' Month';
    } else if (years < 365) {
      distance += years + ' Years';
    }

    await SequelizePool.query(
      `INSERT INTO myproject(project_name, start_date,end_date,description,technologies, "createdAt", "updatedAt",distance) 
      VALUES ('${projectName}','${startDate}','${endDate}' ,'${description}','{${techIcon}}',NOW(), NOW(), '${distance}')`
    );
    res.redirect('/');
  } catch (error) {
    throw error;
  }
}

async function MyProjectDetail(req, res) {
  const titlePage = 'Detail Project';
  const { id } = req.params;
  const data = await SequelizePool.query('SELECT * FROM myproject where id = ' + id);

  res.render('My-Project-detail', {
    data: data[0][0],
    titlePage,
  });
}

function testimonials(req, res) {
  res.render('testimonial');
}

async function updateMyProjectView(req, res) {
  const { id } = req.params;
  const data = await SequelizePool.query('SELECT * FROM myproject where id = ' + id);

  res.render('update-My-Project', {
    data: data[0][0],
  });
}

async function updateMyProject(req, res) {
  const { id } = req.params;
  const { projectName, startDate, endDate, technologies, description } = req.body;
  const technologiesArray = Array.isArray(technologies) ? technologies : [technologies];

  await SequelizePool.query(
    `UPDATE myproject SET project_name='${projectName}', start_date='${startDate}', end_date='${endDate}', 
    description='${description}', "updatedAt"=now(), technologies='{${technologiesArray}}' where id = ${id}`
  );

  res.redirect('/');
}

async function deleteMyProject(req, res) {
  const { id } = req.params;
  await SequelizePool.query('DELETE FROM myproject where id = ' + id);

  res.redirect('/');
}

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

app.listen(port, () => {
  console.log(`Server Berjalan Di Port ${port}`);
});
