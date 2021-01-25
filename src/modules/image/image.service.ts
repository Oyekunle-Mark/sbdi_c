import { Image, IIMage } from './image.model'
import { ICreateImage, IGetUserImages, ImageID } from './image'
import { deleteImageFile } from './fileUploadUtil'

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
export const getUserImages = (clause: IGetUserImages): Promise<IIMage[]> =>
  Image.find(clause).populate('owner', 'firstName email')

/**
 * Delete images bulk
 * @param {string[]} imageIds
 * @param {string} callerId
 */
export const deleteImages = async (
  imageIds: ImageID[],
  callerId: string
): Promise<{ deleted: number; undeleted: number; reasons: string[] }> => {
  const reasons: string[] = []
  let deleted = 0
  let undeleted = 0

  for (const imageId of imageIds) {
    const image = await getImage(imageId)

    if (!image) {
      reasons.push(`Image ${imageId} does not exist`)
      undeleted += 1
      continue
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (image.owner.id !== callerId) {
      reasons.push(`Image ${imageIds} belongs to another user.`)
      undeleted += 1
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Image.deleteOne(imageIds, (err) => {
        if (err) {
          reasons.push(err)
          undeleted += 1
        } else {
          deleteImageFile(image.imageUrl)
          deleted += 1
        }
      })
    }
  }

  return {
    deleted,
    undeleted,
    reasons,
  }
}

/**
 * Delete all images uploaded by a user
 * @param ownerId
 */
export const deleteAllUserImages = async (
  ownerId: string
): Promise<{ deleted: number; undeleted: number; reasons: string[] }> => {
  const images = await getUserImages({ owner: ownerId })
  Image.deleteMany({ owner: ownerId })
  let deleted = 0
  let undeleted = 0
  const reasons: string[] = []

  for (const image of images) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Image.deleteOne(image.id, (err) => {
      if (err) {
        reasons.push(err)
        undeleted += 1
      } else {
        deleteImageFile(image.imageUrl)
        deleted += 1
      }
    })
  }

  return {
    deleted,
    undeleted,
    reasons,
  }
}
