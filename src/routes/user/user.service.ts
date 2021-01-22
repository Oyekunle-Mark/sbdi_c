import { User, IUser } from './user.model'

/**
 * Saves a user in the DB.
 *
 * @param {String}  firstName
 * @param {String} lastName
 * @param {String}  email
 * @param {String}  password
 * @return {Promise<Document>}
 */
export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<IUser> => {
  return await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password,
  })
}

/**
 * Finds a user by email.
 *
 * @param {String} email the user's email
 * @return {Promise<Document>}
 */
export const findUser = (email: string): Promise<Document> =>
  User.findOne({ email: email.toLowerCase() }).exec()
