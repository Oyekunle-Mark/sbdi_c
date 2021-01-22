import { Document, Model, model, Schema } from 'mongoose'
import { compare, hash } from '../../utils'

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
}

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
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
        delete ret.password
      },
    },
  }
)

UserSchema.pre<IUser>('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this

  if (user.isModified('password')) {
    user.password = await hash(user.password)
  }

  next()
})

UserSchema.methods.comparePassword = async function (inputPassword: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return await compare(inputPassword, this.password)
}

export const User: Model<IUser> = model('User', UserSchema)
