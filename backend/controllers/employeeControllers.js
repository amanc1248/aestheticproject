const { db } = require("../../database/db.js");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
// employee LOGIN
const employeeLoginController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  let sqlIfExists = "Select password from employee where username=?";
  db.query(sqlIfExists, [username], (err, result) => {
    console.log("employeeLoginController ran....");
    if (err) throw err;
    else {
      if (result.length === 0) {
        console.log("invalid username");
        res.status(401).send({ message: "Invalid username" });
      } else if (result[0].password !== password) {
        res.status(401).send({ message: "Invalid Password" });
      } else {
        req.session.employeeAuthenticated = true;
        req.session.employee = { username: username, password: password };
        res.send("Success");
        console.log(req.session);
      }
    }
  });
});

//fetch employee by Id
const employeeByIdController = asyncHandler(async (req, res) => {
  const { username } = req.session.employee;
  let sql = "SELECT * from employee where username=?;";
  db.query(sql, [username], (err, result) => {
    if (err) throw err;
    else {
      console.log(result);
      if (result.length === 0) {
        res.send("no employee");
      } else {
        res.send(result[0]);
      }
    }
  });
});
//fetch users
const employeeFetchUsersController = asyncHandler(async (req, res) => {
  let sql = "SELECT * from user;";
  db.query(sql, (err, result) => {
    if (err) throw err;
    else {
      console.log(result);
      if (result.length === 0) {
        res.send("no users");
      } else {
        res.send(result);
      }
    }
  });
});

const employeeLogoutController = asyncHandler(async (req, res) => {
  if (req.session.employeeAuthenticated) {
    req.session.destroy();
    if (req.session) {
      res.send("failure");
    } else {
      res.send("destroyed");
    }
  }
});

const employeeSendEmailController = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { employeeEmail, password, assets, subject, userEmail, title } =
    req.body;
  let hostName;
  if (process.env.NODE_ENV === "development") {
    hostName = "proudposhak.com";
  } else {
    hostName = "https://aestheticportal.herokuapp.com";
  }
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: hostName,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: employeeEmail, // generated ethereal user
      pass: password, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const forwardSlash = "/";
  const divs = () =>
    assets.map((asset) => {
      return `
        <div class="nft_div">
          <div>
            <img
              src=${asset.image_url}
              alt=${asset.id}
              height="300px"
              style="border-radius: 10px"
            />
          </div> 

          <div class="details_div">
            <div class="div_1" style="text-align: left">
              <div> <b>Collection:</b> ${asset.collection.name}</div>
              <div><b>NFT Name:</b>${asset.name}</div>
              <a href=${asset.permalink + forwardSlash}>Link to OpenSea NFT</a>
            </div>
          </div>
        </div>
    `;
    });
  const emailFormat = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .two_div_nft_container{
        display: flex;
        justify-content: space-around;
      }
      .nft_div {
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(229, 232, 235);
        border-radius: 10px;
        width: max-content;
        text-align: center;
      }
      .nft_div:hover{
        box-shadow: 0 0 2px 3px #88888828;
      }
      .details_div{
        display: flex;
        justify-content: space-between;
        padding: 5px;
      }
      .div_2{
        font-size: small;
      }
    </style>
  </head>
  <body>
    <h1>This is NFTs update from
    <a href="https://www.aesthetic.com/">Aesthetic.com</a></h1>
    <h4>${title}</h4>
    <div class="two_div_nft_container">
      ${divs()}
    </div>
  </body>
</html>

`;
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Aesthetic.com team" <${employeeEmail}>`, // sender address
    to: userEmail, // list of receivers
    subject: subject, // Subject line
    html: emailFormat, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});

module.exports = {
  employeeLoginController,
  employeeFetchUsersController,
  employeeLogoutController,
  employeeSendEmailController,
  employeeByIdController,
};
