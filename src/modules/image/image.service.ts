import { Image, IIMage } from './image.model'

/**
 * Saves an image in the DB
 * @param {String} owner
 * @param {String} imageUrl
 * @param {String} permission
 * @param {String} status
 * @return {Promise<Document>}
 */
export const saveImage = async (
  owner: string,
  imageUrl: string,
  permission: string,
  status: string
): Promise<IIMage> => {
  return await Image.create({
    owner,
    imageUrl,
    permission,
    status,
  })
}

export const getImage = (imageId: string): Promise<IIMage> =>
  Image.findById(imageId)

export const getUserImages = (userId: string): Promise<IIMage> =>
  Image.find({ owner: userId })
