const express = require('express')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('./s3')

const app = express()

app.get('/', (req, res) => {
  res.send(
    '<h1>Auto Scaling Demo App</h1> <h4>Message: Success</h4> <p>Version: 1.0.0</p>'
  )
})
app.get('/images/:key', (req, res) => {
  const key = req.params.key
  const readStream = getFileStream(key)
  readStream.pipe(res)
})

app.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file
  const result = await uploadFile(file)
  await unlinkFile(file.path)
  res.send({ imagePath: `/images/${result.Key}` })
})

app.listen(8080, () => console.log('listening on port 8080 cool'))
