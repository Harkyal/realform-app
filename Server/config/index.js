require('dotenv').config();
const path = require('path');
const express = require('express');
const db = require('./db')
const cors = require('cors');
const Name = ("");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');


const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3002;
app.use(cors());
app.use(express.json())


var UserName = "";

// static user details
var userData = {
  password: "",
  name: "",
  username: "",
  isAdmin: true
};

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});


// request handlers
app.get('/', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  res.send('Welcome to Realform  - ' + req.user.name);
});

// validate the user credentials
app.post('/users/signin', function (req, res) {

  const user = req.body.username;
  const pwd = req.body.password;

  login();

  function login() {
    db.query('Select Name from login where username=? AND password=?', [user, pwd], function (error, results) {
      if (error) {
        console.log("error ocured", error);
      }
      if (results.length > 0) {
        userData.username = user;
        userData.password = pwd;
        UserName = JSON.stringify(results[0].Name);
        userData.name = UserName;
        process();
      }
      if (!results.length) {
        return res.status(401).json({
          error: true,
          message: "Username or Password is Wrong."
        });
      }

    });
  }
  function process() {

    if (!user || !pwd) {
      return res.status(400).json({
        error: true,
        message: "Username or Password required."
      });
    }

    // return 401 status if the credential is not match.
    if (user !== userData.username || pwd !== userData.password) {
      return res.status(401).json({
        error: true,
        message: "Username or Password is Wrong."
      });
    }

    // generate token

    const token = utils.generateToken(userData);
    // get basic user details
    const userObj = utils.getCleanUser(userData);

    // return the token along with user details
    return res.json({ user: userObj, token });


  }
  // return 400 status if username/password is not exist
});


// verify the token and return it if it's valid
app.get('/verifyToken', function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    // return 401 status if the userId does not match.
    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    // get basic user details
    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});


// Route to get all posts
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM daily_data_records", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});

// Route to get Morning operators
app.get("/api/get/MorningOperators", (req, res) => {
  db.query("SELECT `Morning_Operators` as Operators FROM `operators` ORDER BY Morning_Operators ASC", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});

// Route to get Night operators
app.get("/api/get/NightOperators", (req, res) => {
  db.query("SELECT `Night_Operators`as Operators FROM `operators`ORDER BY 'Night_Operators' ASC", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});
// Route to get operators Combinely
app.get("/api/get/Operators", (req, res) => {
  db.query("SELECT Morning_Operators FROM Operators UNION SELECT Night_Operators FROM Operators ORDER BY `Morning_Operators` ASC", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});
// Route to get all part table
app.get("/api/get/part_dataset", (req, res) => {
  db.query("SELECT * FROM `part_dataset`", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});
// Route to get all Flex part table
app.get("/api/get/Flexpart_dataset", (req, res) => {
  db.query("SELECT * FROM `part_dataset` WHERE `Part_internalNo`LIKE'%F'", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});
// Route to get all Rigid part table
app.get("/api/get/Rigidpart_dataset", (req, res) => {
  db.query("SELECT * FROM `part_dataset` WHERE `Part_internalNo`LIKE'%R'", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});




// Route to get all Machine
app.get("/api/get/Machines", (req, res) => {
  db.query("SELECT `Machines` FROM `operators`", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});
// Route to get Flex Machine
app.get("/api/get/FlexMachines", (req, res) => {
  db.query("SELECT `Machines` FROM `operators`", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});
// Route to get Rigid Machine
app.get("/api/get/RigidMachines", (req, res) => {
  db.query("SELECT `Machines` FROM `operators`", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});
// Route to get Customers
app.get("/api/get/Customers", (req, res) => {
  db.query("SELECT `Customers` FROM `operators`", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});

// Route for creating the post
app.post('/api/create', (req, res) => {
  //Previous query
  //db.query("INSERT INTO daily_data_records (title, post_text, user_name) VALUES (?,?,?)", [title, text, username], 
  const Date = req.body.Date;
  const Operator = req.body.Operator;
  const Part_internalNo = req.body.Part_internalNo;
  const PartNo = req.body.PartNo;
  const Customer = req.body.Customer;
  const Part_description = req.body.Part_description;
  const Target = req.body.Target;
  const work_station = req.body.work_station;
  const Produced = req.body.Produced;
  const Scrap = req.body.Scrap;
  const Supervisor_notes = req.body.Supervisor_notes;
  const Operator_2 = req.body.Operator_2;
  db.query("INSERT INTO daily_data_records (Date, Operator, Part_internalNo, PartNo, Customer, Part_description, Target, work_station, Produced, Scrap, Supervisor_notes, Operator_2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [Date, Operator, Part_internalNo, PartNo, Customer, Part_description, Target, work_station, Produced, Scrap, Supervisor_notes, Operator_2],

    (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(result)
    });
})
app.get("/api/get/name", (req, res) => {
  res.send(Name)
});
// Default data as of today's date
app.get('/api/defaultData/:date', (req, res) => {

  db.query('SELECT * FROM daily_data_records WHERE Date=? ', [req.params.date], (err, result, fields) => {
    if (err) { throw err; }
    res.send(result)

  });
})
// Filter the data by combinely
app.get('/api/search/:Operator,:Date1,:Date2,:Customer,:Part_internalNo', (req, res) => {
  db.query("SELECT * FROM `daily_data_records` WHERE Operator LIKE '%" + ((req.params.Operator).replace(/[{""}]/g, '')) + "%' AND Date BETWEEN '" + req.params.Date1 + "' AND '" + req.params.Date2 + "' AND Customer LIKE '%" + ((req.params.Customer).replace(/[{""}]/g, '')) + "%' AND Part_internalNo LIKE '%" + ((req.params.Part_internalNo).replace(/[{""}]/g, '')) + "%'", (err, result, fields) => {
    if (err) { throw err; }

    res.send(result)

  });
})




app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})