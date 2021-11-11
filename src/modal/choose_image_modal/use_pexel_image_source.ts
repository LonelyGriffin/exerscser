import {createClient, Photo, PhotosWithTotalResults} from 'pexels'
import {useEffect, useRef, useState} from "react";
import makeCancellablePromise from "../../common/make_cancelable_promise";
import RNFS from "react-native-fs";
import {ImagePointer, ImagesSource} from "./types";

const API_KEY = '563492ad6f91700001000001b57b865d29bc4881853cf2a04bf5662a';
const PAGE_SIZE = 10
const client = createClient(API_KEY)


export const usePexelImageSource = (query: string): ImagesSource => {
  const [total, setTotal] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [loaded, setLoaded] = useState<ImagePointer[]>([])
  const nextPageCancelRef = useRef(() => {})

  const nextPage = () => {
    if(isLoading || loaded.length >= total) {
      return
    }

    setIsLoading(true)

    const {cancel, promise} = makeCancellablePromise(client.photos.search({
      query,
      per_page: PAGE_SIZE,
      page: pageNumber + 1,
    }))

    nextPageCancelRef.current = () => cancel()

    promise
      .then((res) => {
        const response: PhotosWithTotalResults = res as any
        const imageHolders = response.photos.map(photoToImageHolder)

        setTotal(response.total_results)
        setLoaded([...loaded, ...imageHolders])
        setPageNumber(pageNumber + 1)
        setIsLoading(false)
      })
      .catch(error => {
        console.log('load image error', error)
      })
  }

  useEffect(() => {
    nextPageCancelRef.current()

    setTotal(0)
    setPageNumber(0)
    setIsLoading(true)
    setLoaded([])

    if (query === '') {
      setIsLoading(false)
      return
    }

    const {cancel, promise} = makeCancellablePromise(client.photos.search({
      query,
      per_page: PAGE_SIZE,
      page: 0,
    }))

    promise
      .then((res) => {
        const response: PhotosWithTotalResults = res as any

        const imageHolders = response.photos.map(photoToImageHolder)

        setTotal(response.total_results)
        setLoaded([...loaded, ...imageHolders])
        setIsLoading(false)
      })
      .catch(error => {
        console.log('load image error', error)
      })

    return () => cancel()
  }, [query])

  return {
    total,
    pageNumber,
    isLoading,
    loaded,
    pageSize: PAGE_SIZE,
    nextPage,
  }
}

const photoToImageHolder = (photo: Photo) => {

  const {width, height, url} = findSizeAndUrl(Object.values(photo.src))!

  const loadImage = async (path: string) => {
    const result = await (RNFS.downloadFile({
      fromUrl: url,
      toFile: path
    }).promise)

    console.log(result, await RNFS.existsRes('file://' + path))
  }
  const imagePointer: ImagePointer = {
    width,
    height,
    getUri: () => url,
    loadTo: loadImage,
    getExt: () => {
      const s = url.split('.')
      const f = s[s.length - 1]
      return f.split('?')[0]
    }
  }

  return imagePointer
}

const findSizeAndUrl = (urls: string[]) => {
  const maxWidth = 300

  const arr = urls.map((url) => {
    const sp = new URLSearchParams(new URL(url).search)
    if (sp.has('dpr') || !sp.has('h') || !sp.has('w')) {
      return undefined
    }

    const width = parseFloat(sp.get('w')!)
    const height = parseFloat(sp.get('h')!)

    return {
      width,
      height,
      url
    }
  })

  const a = arr.filter(Boolean)

  const b = a.reduce((result, item) => {
    if (item!.width <= maxWidth && item!.width > result!.width) {
      return item!
    }

    return result!
  }, a[0]!)!

  if (b.width > maxWidth) {
    return a.reduce((result, item) => {
      if (item!.width < result!.width) {
        return item!
      }

      return result!
    }, a[0]!)!
  }

  return b
}
