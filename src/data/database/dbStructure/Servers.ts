import type { InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'
import { DataTypes } from 'sequelize'

export interface ServerModel extends Model<InferAttributes<ServerModel>, InferCreationAttributes<ServerModel>> {
  server_id: string
  server_name?: string
  adminrole?: string
}

export default function (sequelize: Sequelize) {
  return sequelize.define<ServerModel>('servers', {
    server_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    server_name: {
      type: DataTypes.STRING,
    },
    adminrole: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  })
};
