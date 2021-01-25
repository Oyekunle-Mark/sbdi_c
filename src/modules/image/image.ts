export enum ImagePermission {
  Private = 'Private',
  Public = 'Public',
}

export enum ImageStatus {
  Active = 'Active',
  Deleted = 'Deleted',
}

export interface ICreateImage {
  owner: string
  imageUrl: string
  permission?: ImagePermission
}

export interface IGetUserImages {
  owner: string
  permission?: ImagePermission
  status?: ImageStatus
}

export type ImageID = string
export const fileServerUrl = '/static/'
