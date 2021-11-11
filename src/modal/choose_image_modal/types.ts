export interface ImagePointer {
  width: number;
  height: number;
  getUri(): string;
  getExt(): string;
  loadTo(path: string): Promise<void>
}

export interface ImagesSource {
  total: number
  pageNumber: number
  pageSize: number
  loaded: ImagePointer[]
  isLoading: boolean
  nextPage(): void
}
