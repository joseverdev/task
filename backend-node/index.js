const express = require('express');
const routerApi = require('./src/routes/index.js');
const cors = require('cors');
const { logErrors, errorHanlder, boomHandler } = require('./middlewares/error.handler.js');
const {checkApiKey} = require('./middlewares/auth.handler.js');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());

require('./utils/auth');

app.get('/',checkApiKey,(req, res) => {
    res.send('The World Is Yours!');
});

routerApi(app);

app.use(logErrors);
app.use(boomHandler);
app.use(errorHanlder);

app.listen(3001, () => { console.log('Server is running on port 3001'); });
