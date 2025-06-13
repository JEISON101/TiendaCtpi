import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 9000;

//conexion con mongo atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((error) => console.error('❌ No es posible conectarse a MongoDB Atlas =>', error))

app.get('/', (res) => {
  res.send('connected')
})

app.listen(port, () => console.log(`🚀 Server listening on port ${port}`))