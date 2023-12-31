const express = require('express')
const path = require('path')
const app = express()
const port = 5000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

// app.set = buat setting varible global, configuratoin, dll
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use("/assets", express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended: false })) // body parser, extended : false -> querystring, extended : true -> menggunakan querystring third party -> qs

app.get('/', home)
app.get('/contact', contact)
app.get('/my-project', blog)
app.post('/delete-my-project/:id', deleteBlog)

app.get('/add-my-project', addBlogView)
app.post('/add-my-project', addBlog)

app.get('/update-my-project/:id', updateBlogView)
app.post('/update-my-project', updateBlog)

app.get('/my-project-detail/:id', blogDetail)
app.get('/testimonial', testimonial)


async function home(req, res) {
    const id = 4

    const query = `SELECT * FROM profiles WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log("ini  data profile", obj)

    res.render('index', { data: obj[0] })
}

function contact(req, res) {
    res.render('contact')
}

async function blog(req, res) {
    const query = 'SELECT * FROM my-project'
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    // const data = await blogModel.findAll()
    // console.log("data blog", data)

    // res.render('blog', { data })
    res.render('blog', { data: obj[0] })
}

function addBlogView(req, res) {
    res.render('add-my-project')
}

async function addBlog(req, res) {
    const { title, content } = req.body

    const image = "Ravano.jpeg"
    const author = "Ravano Akbar Widodo"

    // console.log("Title :", title)
    // console.log("Content :", content)

    // const dataBlog = { title, content }

    // data.unshift(dataBlog)
    const query = `INSERT INTO my-project(title, content, image, author) VALUES ('${title}', '${content}','${image}','${author}')`
    const obj = await sequelize.query(query, { type: QueryTypes.INSERT })

    console.log("data berhasil di insert", obj)

    res.redirect('/my-project')
}

async function updateBlogView(req, res) {
    const { id } = req.params

    // const dataFilter = data[parseInt(id)]
    // dataFilter.id = parseInt(id)
    // console.log("dataFilter", dataFilter)
    const query = `SELECT * FROM my-project WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    console.log("update my project view", obj)

    res.render('update-my-project', { data: obj[0] })
}

async function updateBlog(req, res) {
    const { title, content, id } = req.body

    // console.log("Id :", id)
    // console.log("Title :", title)
    // console.log("Content :", content)

    // data[parseInt(id)] = {
    //     title,
    //     content,
    // }
    const query = `UPDATE blogs SET title='${title}',content='${content}' WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.UPDATE })

    console.log("my project berhasil di update!", obj)

    res.redirect('/my-project')
}


async function deleteBlog(req, res) {
    const { id } = req.params

    // data.splice(id, 1)
    const query = `DELETE FROM my-project WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.DELETE })

    console.log("berhasil delete my project", obj)

    res.redirect('/my-project')
}

async function blogDetail(req, res) {
    const { id } = req.params // destructuring

    const query = `SELECT * FROM my-project WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    console.log("myprojectDetail", obj)

    res.render('myproject-detail', { data: obj[0] })
}

function testimonial(req, res) {
    res.render('testimonial')
}

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})