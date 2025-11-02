import express from 'express'
import cors from 'cors'

const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api', router)

const array = [
    { id: 1, name: "Ionuț", age: 25 },
    { id: 2, name: "Alex", age: 18 },
    { id: 3, name: "Mihai", age: 13 },
    { id: 4, name: "Marcel", age: 12 },
    { id: 5, name: "Marius", age: 22 }
]

router.get('/getList', (req, res) => {
    res.json(array)
})


router.post('/postList', (req, res) => {
    const el = req.body
    el.id = array.length + 1
    array.push(el)
    res.json(el)
})


router.get('/getById/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const item = array.find(el => el.id === id)

    if (item) {
        res.json(item)
    } else {
        res.status(404).json({ message: `Resource with id=${id} not found` })
    }
})

const port = 8000
app.listen(port, () => console.log(`✅ API running on port ${port}`))
