import express from "express"

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.render('index', { title: 'Hello World', message: 'Hello there!' })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})