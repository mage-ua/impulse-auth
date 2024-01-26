import {
  Table,
  Model,
  Column,
  DataType,
  DefaultScope,
} from 'sequelize-typescript';
import {
  fn,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from 'sequelize';
import { Role } from '../../common/enums';

@Table({
  tableName: 'users',
  underscored: true,
  updatedAt: false,
})
@DefaultScope(() => ({
  attributes: {
    exclude: ['password'],
  },
}))
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: CreationOptional<number>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: Role.Regular,
  })
  role: Role;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: fn('NOW'),
  })
  createdAt: CreationOptional<Date>;
}
