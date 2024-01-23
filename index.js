const express = require('express');
const { Sequelize, QueryTypes } = require('sequelize');
const session = require('express-session');
const flash = require('express-flash');
const bcrypt = require('bcrypt');
const app = express();
const port = 7000;

// sequelize config
const { development } = require('./src/assets/config/config.json');
const SequelizePool = new Sequelize(development);

// use handlebars for template engine
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use('/assets', express.static('src/assets'));
app.use(express.urlencoded({ extended: false })); // body parser

// middleware session
app.use(session({
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 2 * 60 * 60 * 1000,
    },
    resave: false,
    store: session.MemoryStore(),
    secret: 'session_storage',
    saveUninitialized: true,
}));
app.use(flash());

app.get('/', home);
app.get('/contact', contact);
app.get('/My-Project', MyProject);
app.get('/My-Project-detail/:id', MyProjectDetail);
app.get('/add-My-Project', addMyProject);
app.post('/My-Project', handlePostMyProject);
app.get('/delete/:id', handleDeleteMyProject);
app.get('/update-My-Project/:id', editMyProject);
app.get('/register', formRegister);
app.post('/register', addRegister);
app.get('/login', formLogin);
app.post('/login', isLogin);

async function home(req, res) {
    try {
        const projectNew = await SequelizePool.query('SELECT * FROM myproject');
        const titlePage = 'Home';

        res.render('index', {
            data: projectNew[0],
            titlePage,
            isLogin: req.session.isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

function contact(req, res) {
    const titlePage = 'Contact';
    res.render('contact', {
        titlePage,
        isLogin: req.session.isLogin,
        user: req.session.user
    });
}

async function MyProject(req, res) {
    try {
        const query = await SequelizePool.query("SELECT * FROM myproject", { type: QueryTypes.SELECT });
        const data = query.map(res => ({
            ...res,
            author: "Megawati",
            image: "https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg?w=826&t=st=1705553908~exp=1705554508~hmac=e65ecda5f1b0cc049b17c786b0674845bdd02f9ac3dcda91ed3ae13847e2c389"
        }));

        res.render('My-Project', {
            data,
            isLogin: req.session.isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

function MyProjectDetail(req, res) {
    const { id } = req.params;
    res.render('My-Project-detail', { data: dataDetail });
}

function addMyProject(req, res) {
    const addMyProjectTitle = "Add My-Project";
    res.render("add-My-Project", { data: addMyProjectTitle });
}

async function handlePostMyProject(req, res) {
    try {
        const { title, content } = req.body;
        await SequelizePool.query(`INSERT INTO myproject(project_name, content, "createdAt", "updatedAt") VALUES ('${title}','${content}', NOW(), NOW())`);

        res.redirect('/My-Project');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function handleDeleteMyProject(req, res) {
    try {
        const { id } = req.params;
        await SequelizePool.query(`DELETE FROM myproject WHERE id = ${id}`);

        res.redirect('/My-Project');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

function editMyProject(req, res) {
    res.render("update-My-Project");
}

function formRegister(req, res) {
    res.render('register');
}

async function addRegister(req, res) {
    try {
        const { name, email, password } = req.body;
        const salt = 10;

        bcrypt.hash(password, salt, async (err, hashPassword) => {
            await SequelizePool.query(`INSERT INTO users (name, email, password, "createdAt", "updatedAt") VALUES ('${name}','${email}','${hashPassword}', NOW(), NOW())`);
        });
        res.redirect('/login');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

function formLogin(req, res) {
    res.render('login');
}

async function isLogin(req, res) {
    try {
        const { email, password } = req.body;

        const checkEmail = await SequelizePool.query(`SELECT * FROM users WHERE email = '${email}'`, { type: QueryTypes.SELECT });

        if (!checkEmail.length) {
            req.flash('failed', 'Email is not registered');
            return res.redirect('/login');
        }

        bcrypt.compare(password, checkEmail[0].password, function (err, result) {
            if (!result) {
                req.flash('failed', 'Invalid password');
                return res.redirect("/login");
            } else {
                req.session.isLogin = true;
                req.session.user = checkEmail[0].name;
                req.flash('success', 'Welcome bwangggggg !!!!');
                return res.redirect('/');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
