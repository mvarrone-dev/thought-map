export interface Chunk {
  part: number,
  chunk: string,
}

export interface BackupResponse {
  chunks: Chunk[]
}

export type Decryptor = (data: ArrayBuffer, key: string) => Promise<string>;

export enum NavOptions {
  Upload = 'Upload',
  Retrieve = 'Retrieve',
  Update = 'Update',
}
