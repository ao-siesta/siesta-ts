import type { InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'
import { DataTypes } from 'sequelize'

export interface BotLogModel extends Model<InferAttributes<BotLogModel>, InferCreationAttributes<BotLogModel>> {
  server_id: string
  server_name?: string
  channel_id: string
}

export default function (sequelize: Sequelize) {
  return sequelize.define<BotLogModel>('logChannel', {

    server_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    server_name: {
      type: DataTypes.STRING,
    },
    channel_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  })
};
