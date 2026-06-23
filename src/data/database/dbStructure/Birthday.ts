import type { InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'
import { DataTypes } from 'sequelize'

export interface BirthdayModel extends Model<InferAttributes<BirthdayModel>, InferCreationAttributes<BirthdayModel>> {
  user_id: string
  bdMonth: number
  bdDay: number
}

export default function (sequelize: Sequelize) {
  return sequelize.define<BirthdayModel>('birthday', {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    bdMonth: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    bdDay: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  })
};
