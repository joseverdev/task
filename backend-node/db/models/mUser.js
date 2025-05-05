const { Model, DataTypes } = require('sequelize')
const USER_TABLE = 'users';

const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

class User extends Model {

  static associate(models) {
    this.hasMany(models.Task, { foreignKey: 'userId', as: 'tasks' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName:USER_TABLE,
      modelName: 'User',
      timestamps: false,
    }
  }
  
}

module.exports = { USER_TABLE, UserSchema, User };