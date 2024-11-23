import path from 'node:path'
import { DataTypes, Sequelize } from 'sequelize'
import { populateDatabase } from './populateDatabase.js'

const __dirname = path.dirname(new URL(import.meta.url).pathname.substring(1))

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, 'database.sqlite')
})

const Rol = sequelize.define('Rol', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isIn: {
        args: [['admin', 'user']],
        msg: 'The "rol" field must be one of the following options: "admin" or "user"'
      },
      notEmpty: { msg: 'The "rol" field cannot be empty' }
    }
  }
}, {
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }
})

const Federation = sequelize.define('Federation', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  federation: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isIn: {
        args: [['IPF', 'WRPF', 'IPL', 'AAP']],
        msg: 'The "federation" field must be one of the following options: "IPF", "WRPF", "IPL", "AAP"'
      },
      notEmpty: { msg: 'The "federation" field cannot be empty' }
    }
  }
}, {
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }
})

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  nick_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'The "nick_name" field cannot be empty' },
      len: {
        args: [0, 30],
        msg: 'The "nick_name" field must not exceed 30 characters'
      }
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'The "name" field cannot be empty' },
      len: {
        args: [0, 50],
        msg: 'The "name" field must not exceed 50 characters'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'The email is invalid' },
      notEmpty: { msg: 'The "email" field cannot be empty' },
      len: {
        args: [0, 60],
        msg: 'The "email" field must not exceed 60 characters'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: 'The "password" field cannot be empty' } }
  }
}, {
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }
})

const Publication = sequelize.define('Publication', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: 'The "title" field cannot be empty' } }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { notEmpty: { msg: 'The "content" field cannot be empty' } }
  },
  publication_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_DATE'),
    validate: { notEmpty: { msg: 'The "publication_date" field cannot be empty' } }
  }
}, {
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }
})

// Asosiacion de 'user' y 'rol'
Rol.hasMany(User)
User.belongsTo(Rol, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

// Asosiacion de 'publication' y 'user'
User.hasMany(Publication)
Publication.belongsTo(User, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

// Asosiacion de 'publication' y 'federation'
Federation.hasMany(Publication)
Publication.belongsTo(Federation, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

// Si existen las tablas las borra:
// await sequelize.sync({ force: true })
await sequelize.sync()
await populateDatabase()

export {
  Publication,
  User,
  Federation,
  Rol
}
