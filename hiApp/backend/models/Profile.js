const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('hi', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Profile extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      }
    }, {
      sequelize,
      modelName: 'Profile',
      timestamps: false,
    });
  }
}

Profile.init(sequelize);

module.exports = Profile;