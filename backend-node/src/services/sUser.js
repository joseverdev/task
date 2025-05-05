const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const { models } = require("../../libs/sequelize.js");

const sUser = {
  users: async () => {
    const users = await models.User.findAll();
    return users;
  },
  findByUsername: async (username) => {
    const user = await models.User.findOne({ where: { username } });
    return user;
  },
  create: async (data) => {
    console.log(data)
    const hash = await bcrypt.hash(data.password, 10);

    const user = await models.User.findOne({ where: { username: data.username } });
    if (user) {
      throw boom.conflict('User already exists');
    }
    const newUser = await models.User.create({...data, password: hash});

    delete newUser.dataValues.password;

    return { newUser };
  },
  login: async (data) => {
    // console.log(data)
    const user = await models.User.findOne({ where: { username: data.username } });
    if (!user) {
      throw boom.notFound('User not found');
    }
    if (user.password !== data.password) {
      throw boom.unauthorized('Invalid password');
    }
    delete user.dataValues.password;
    // console.log('User:',user)
    return user;
  }
}

module.exports = { sUser };