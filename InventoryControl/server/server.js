const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

const ProductRoutes = require('./main/route/ProductRoutes');
const InventoryMovementRoutes = require('./main/route/InventoryMovementRoutes');
const dbInit = require('./database/dbInit');

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Server is running on port ${port}`);
});

ProductRoutes(app);
InventoryMovementRoutes(app);
dbInit();

app.listen(port);