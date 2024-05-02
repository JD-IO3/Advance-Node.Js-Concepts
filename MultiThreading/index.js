const express = require('express')
const app = express()
const { Worker } = require('worker_threads')

app.get('/non-blocking', (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('/blocking', (req, res) => {
    const worker = new Worker(__dirname + '/worker.js')

    worker.on('message', (data) => {
        res.status(200).send(`counter ${data}`)
    })

    worker.on('error', (error) => {
        res.status(404).send(`error: ${error.message}`)
    })

    // res.status(200).send(`counter ${counter}`)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))