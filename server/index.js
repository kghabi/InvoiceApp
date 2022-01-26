const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const initRoutes = require('./routes/api/Organisation');

global.__basedir = __dirname;
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.use(express.json());
app.use(cors());
app.use('/resources', express.static('resources'));

// Define Routers
const usersRouter = require('./routes/api/Users');
const invoicesRouter = require('./routes/api/Invoices');
const clientRouter = require('./routes/api/Clients');
const pdfRouter = require('./routes/PdfExpost');

app.use('/auth', usersRouter);
app.use('/api/invoices', invoicesRouter);
app.use('/api/clients', clientRouter);
app.use(pdfRouter);

const PORT = 8080;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server runing in port ${PORT}`);
  });
});
