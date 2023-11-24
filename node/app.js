import express from 'express'
import cors from 'cors'
//importar conexion a la BD
import db from './database/db.js'
//importamos nuestro enrutador
import router from './routes/routes.js'

const app  = express()

app.use(cors())
app.use(express.json())
app.use('/blogs', router)

try {
    await db.authenticate()
    console.log("Conexion exitosa a la DB")
} catch (error) {
    console.log(`El error de conexion es:${error}`)
}

app.get('/', (req, res) => {
    res.send('HOLA MUNDO')
})

app.listen(8000, () => {
    console.log('Server running on port http://localhost:8000/')
})