import bcrypt from 'bcryptjs'

/**
 * Takes a string and generates a hash
 *
 * @param {String} str the string to hash
 * @returns {Promise<String>} a promise that resolves to the hashed key
 */
export const hash = async (str: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(str, salt)
}

/**
 * Compares a plaintext text string and the hashed string.
 *
 * @param {String} str the plaintext string
 * @param {String} hashStr the hashed string
 * @returns {Promise<boolean>} a promise that resolves to a boolean
 */
export const compare = async (
  str: string,
  hashStr: string
): Promise<boolean> => {
  return await bcrypt.compare(str, hashStr)
}
