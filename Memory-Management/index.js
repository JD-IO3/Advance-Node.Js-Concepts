const express = require("express");
const app = express();
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

// global variable
var tasks = [];

app.get("/", (req, res) => {
    // closure with external variable reference
    tasks.push(function () {
        return req.headers;
    });

    // too much data
    // const hugeArray = new Array(100000000).fill(req);
    // node-cache, memcached

    // circular object reference
    req.user = {
        id: 1,
        username: "Inefficient User",
        badObject: req,
        // hugeArray,
    };

    // clear event emitter listeners
    // eventEmitter.on("start", () => {
    //     console.log("Useless event emitted..");
    // });

    //? eventEmitter.removeListener('start')

    // clear Timeouts
    // const resWithTimeout = setTimeout(() => {
    //     res.send("Hello World!");
    // });

    setTimeout(() => {
        res.send("Hello World!");
    });

    //? clearTimeout(resWithTimeout);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
