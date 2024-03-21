const express = require('express');
const app = express();
const port = 2000 || process.env.PORT;
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');

app.use(cors());

app.use(bodyParser.json());

app.use(router)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});