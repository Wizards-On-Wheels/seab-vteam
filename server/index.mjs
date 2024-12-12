import 'dotenv/config';

const port = process.env.PORT || 1337;

/**---- import packages ----*/
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';

/**------- Express settings -------*/
const app = express();

app.disable('x-powered-by');

app.set("view engine", "ejs");

app.use(express.static(path.join(process.cwd(), "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

/**------- Routes -------*/
app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
