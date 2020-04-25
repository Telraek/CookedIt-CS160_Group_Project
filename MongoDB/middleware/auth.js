const jwt = require('jsonwebtoken');
const config = require('config');

//Middleware function is a function that has access to request and response cycle/object.
//Next is a callback we have to run when we are done.
module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('Authorization');

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //Set the req.user to the user that is in the decoded token.
    req.user = decoded.user;
    next();
  } catch (err) {
    //There is a token, but it is not valid.
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
