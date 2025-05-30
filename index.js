const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const errors = require('./network/errors')
const router = require('./components/quotes/router')
const config = require('./config')

const PORT = config.quotes_port || 3002
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/quotes', router);

app.use(morgan("dev"));
app.use(errors);

app.listen(PORT, () => {
    console.log('quotes in', PORT);
});