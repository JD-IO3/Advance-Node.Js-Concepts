const express = require('express')
const app = express()
const { Worker } = require('worker_threads')


const THREAD_COUNT = 8
const createWorker = () => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(__dirname + '/four-worker.js', {
            workerData: {
                thread_count: THREAD_COUNT,
            }
        })

        worker.on('message', (data) => {
            resolve(data)
        })
    
        worker.on('error', (error) => {
            reject(`an error occured: ${error}`)
        })
    })
}

app.get('/non-blocking', (req, res) => {
  res.status(200).send('Hello World!')
})
app.get('/blocking', async (req, res) => {
    const workerPromise = []

    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromise.push(createWorker())
    }

    const thread_result = await Promise.all(workerPromise);

    const total = thread_result[0] + thread_result[1] + thread_result[2] + thread_result[3] + thread_result[4] + thread_result[5] + thread_result[6] + thread_result[7];

    res.status(200).send(`result is ${total}`)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))