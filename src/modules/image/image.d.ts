export enum ImagePermission {
  Private = 'Private',
  Public = 'Public',
}

export enum ImageStatus {
  Active = 'Active',
  Deleted = 'Deleted',
}

export interface IGetUserImages {
  owner: string
  permission?: ImagePermission
  status?: ImageStatus
}
