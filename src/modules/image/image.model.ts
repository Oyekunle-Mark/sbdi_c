import { Document, Model, model, Schema } from 'mongoose'
import { ImagePermission, ImageStatus } from './image'

export interface IIMage extends Document {
  owner: string
  imageUrl: string
  permission: string
  status: string
}

const ImageSchema: Schema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      unique: true,
    },
    permission: {
      type: String,
      enum: Object.values(ImagePermission),
      default: ImagePermission.Public,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ImageStatus),
      default: ImageStatus.Active,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

export const Image: Model<IIMage> = model('Image', ImageSchema)
