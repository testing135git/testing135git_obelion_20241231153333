const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('hi', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

class User extends Model {
  static init(sequelize) {
    super.init({
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
    });
  }

  static async authenticate(username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }
    return user;
  }
}

module.exports = User;
