const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const cors = require('cors');

app.use(cors())

app.get('/trips', (_req, res) => {
    res.sendFile(path.join(__dirname, 'trips.json'));
})

app.listen(port, () => {
    console.log(`development server listening at http://localhost:${port}`)
});
