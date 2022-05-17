const { db } = require("../../database/db.js");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const crypto = require("crypto");
dotenv.config();
const secret = process.env.CRYPTO_SECRET;

// decrypt

const decrypt = (password, iv) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(secret),
    Buffer.from(iv, "hex")
  );

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(password, "hex")),
    decipher.final(),
  ]);

  console.log(decryptedPassword.toString());
  return decryptedPassword.toString();
};

// employee LOGIN
const employeeLoginController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  let sqlIfExists = "Select password,iv from employee where username=?";
  db.query(sqlIfExists, [username], (err, result) => {
    console.log("employeeLoginController ran....");
    if (err) throw err;
    else {
      if (result.length === 0) {
        console.log("invalid username");
        res.status(401).send({ message: "Invalid username" });
      } else if (decrypt(result[0].password, result[0].iv) !== password) {
        res.status(401).send({ message: "Invalid Password" });
      } else {
        req.session.employeeAuthenticated = true;
        req.session.username = username;
        res.send("Success");
      }
    }
  });
});

// employee check login status
const checkEmployeeLoginStatus = asyncHandler(async (req, res, next) => {
  console.log("Inside ensureEmployeeAuthentication");
  if (req.session.employeeAuthenticated) {
    res.send("success");
  } else {
    res.send("unAuthorized");
    console.log("You're not authorized as an Employee");
  }
});

//fetch employee by Id
const employeeByIdController = asyncHandler(async (req, res) => {
  const username = req.session.username;
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
      if (result.length === 0) {
        res.send("no users");
      } else {
        res.send(result);
      }
    }
  });
});

const employeeLogoutController = asyncHandler(async (req, res) => {
  req.session.destroy();
  if (req.session) {
    res.send("failure");
  } else {
    res.send("destroyed");
  }
});

const employeeSendEmailController = asyncHandler(async (req, res) => {
  const { employeeEmail, password, host, assets, subject, userEmail, title } =
    req.body;

  let transporter = nodemailer.createTransport({
    host: host,
    port: 587,
    secure: false,
    auth: {
      user: employeeEmail,
      pass: password,
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

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Aesthetic.com team" <${employeeEmail}>`, // sender address
    to: userEmail, // list of receivers
    subject: subject, // Subject line
    html: emailFormat, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  if (info.messageId) {
    res.send("success");
  }
});

module.exports = {
  employeeLoginController,
  employeeFetchUsersController,
  employeeLogoutController,
  employeeSendEmailController,
  employeeByIdController,
  checkEmployeeLoginStatus,
};
