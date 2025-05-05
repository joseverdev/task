const {Strategy} = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const {sUser} = require('../../../src/services/sUser');
// const service = new UserService();
const LocalStrategy = new Strategy(async (username, password, done) => {
  try {
    const user = await sUser.findByUsername(username)
    if(!user) {
      return done(boom.unauthorized(),false)
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
      return done(boom.unauthorized(),false)
    }
    delete user.dataValues.password;
    return done(null,user)
  } catch (error) {
    done(error,false)
  }
})

module.exports = LocalStrategy;
