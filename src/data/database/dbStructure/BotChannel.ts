import type { InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'
import { DataTypes } from 'sequelize'

export interface BotChannelModel extends Model<InferAttributes<BotChannelModel>, InferCreationAttributes<BotChannelModel>> {
  channel_id: string
}

export default function (sequelize: Sequelize) {
  return sequelize.define<BotChannelModel>('botzone', {

    channel_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  })
};
