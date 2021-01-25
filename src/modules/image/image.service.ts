import { Image, IIMage } from './image.model'
import { ICreateImage, IGetUserImages } from './image'

/**
 * Saves an image in the DB
 * @param {ICreateImage[]} images
 * @return {Promise<Document[]>}
 */
export const saveImage = async (images: ICreateImage[]): Promise<IIMage> => {
  return await Image.create(images)
}

/**
 * Get a single image
 * @param imageId id of the image
 * @return Promise<Document>
 */
export const getImage = (imageId: string): Promise<IIMage> =>
  Image.findById(imageId).populate('owner', 'firstName email')

/**
 * Get a users images
 * @param {IGetUserImages} clause
 * @return {Promise<Document[]>}
 */
export const getUserImages = (clause: IGetUserImages): Promise<IIMage> =>
  Image.find(clause).populate('owner', 'firstName email')
