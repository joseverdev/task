const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./mUser');

const TASK_TABLE = 'tasks';

const TaskSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  done: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}

class Task extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as:'user' });
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: 'Task',
      timestamps: false,
    }
  } 
}

module.exports = { TASK_TABLE, TaskSchema, Task };