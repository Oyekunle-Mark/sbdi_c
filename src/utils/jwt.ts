import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

/**
 * Signs an input to generate a JSON web key.
 *
 * @param {Object} payload the object to be signed
 * @return {string}
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const sign = (payload: object): string =>
  jwt.sign(payload, <string>JWT_SECRET, { expiresIn: 60 * 60 })

/**
 * Takes a JWT key and verifies it.
 *
 * @param {String} token the web token to be verified
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const verify = (token: string): string | object =>
  jwt.verify(token, <string>JWT_SECRET)
