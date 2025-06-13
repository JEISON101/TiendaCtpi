import express from 'express'

const app = express()

app.get('/', (req, res)=>{
    res.send('connected')
})

app.listen(3000)