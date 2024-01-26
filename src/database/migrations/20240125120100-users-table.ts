import { fn, QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

const tableName = 'users';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      role: {
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'regular',
      },
      created_at: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: fn('NOW'),
      },
    });
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable(tableName);
  },
};
