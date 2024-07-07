const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const controller = require("./controler/AdminProduct");
const product = require("./controler/Product");
const CartController = require("./controler/CartController");
const SignUpController = require("./controler/SignUpController");
const RestaurantListPage = require("./controler/RestaurantListPageController");
const RestaurantDisplay = require("./controler/RestaurantDisplay");
const checkPrivilege = require("./controler/checkPrevilege");

const db = require('./databaseConnector');

const app = express();
const port = 5000;

const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 1000 * 60 // 15 min for now
}, db);

app.use(session({
    store: sessionStore,
    secret: 'some_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60, // 1hr for now
    },
}));

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true
}));

app.use(express.static('public'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.post("/upload", controller.upload, controller.control);
app.get("/upload", product.productData);
app.delete('/cart', CartController.delete);
app.put('/cart', CartController.put);
app.post('/cart', CartController.post);
app.post("/SignUp", SignUpController.SignUp);
app.post("/SignIn", SignUpController.SignIn);
app.post("/RestaurantList", RestaurantListPage.Upload, RestaurantListPage.RestaurantImage);
app.get("/RestaurantDisplay", RestaurantDisplay.RestaurantData);
app.post("/checkPrivilege", checkPrivilege.checkPrivilege);
app.get("/isOwner", checkPrivilege.isOwner);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});