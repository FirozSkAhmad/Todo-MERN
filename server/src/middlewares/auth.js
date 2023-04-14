const jwt = require("jsonwebtoken");


async function authentication(req, res, next) {
  try {
    const token = req.header('Authorization').replace("Bearer ", "")

    jwt.verify(token, "secret123", (err, decodedToken) => {
      if (err) {
        return res.status(201).send({ msg: err.message })
      }
      else {
        req.headers.decodedToken = decodedToken;
        next();
      }
    })
  }
  catch (err) {
    return res.status(500).send({ msg: err.message })
  }
}

async function authorization(req, res, next) {
  try {
    const data = req.body
    const userId = data.userId
    const rUserId = req.headers.decodedToken.user_id
    if (userId == rUserId) {
      next()
    }
    else {
      res.status(403).send({ msg: "user not authorized" })
    }
  }
  catch (err) {
    return res.status(500).send({ msg: err.message })
  }
}

module.exports = { authentication, authorization }

// module.exports = { authorization };