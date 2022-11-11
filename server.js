const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile } = require('./s3')
const app = express()

app.post('/images', upload.single('image'), async (req, res, next) => {
  const file = req.file
  console.log(file)
  const result = await uploadFile(file)
  console.log(result)

  res.send('ad')
})

app.listen(8080, () => console.log('liestening on port 8080'))
