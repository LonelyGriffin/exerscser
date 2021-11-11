import {useEffect, useRef, useState} from "react";
import makeCancellablePromise from "../../common/make_cancelable_promise";
import {ImageHolder, ImagesSource} from "./types";

const UNSPLASH_CLIENT_ID = 'k52OfhUGjBMNEEoUIMb-OguWq8PEhTYtE1SKW83bSF8'
export const useUnsplashImageSource = (query: string): ImagesSource => {
  const [total, setTotal] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [loaded, setLoaded] = useState<ImageHolder[]>([])
  const nextPageCancelRef = useRef(() => {})


  const nextPage = () => {
    if(isLoading || loaded.length >= total) {
      return
    }

    setIsLoading(true)

  }

  useEffect(() => {
    nextPageCancelRef.current()

    setTotal(0)
    setPageNumber(0)
    setIsLoading(true)
    setLoaded([])

    const {cancel, promise} = makeCancellablePromise(fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=${PAGE_SIZE}`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_CLIENT_ID}`,
        'Accept-Version': 'v1'
      }
    }))

    promise
      .then(response => response.json())
      .then(data => {
        setTotal(data.total)
        const imageHolders = data.results.map(item => {
          const width = 200;
          const height = Math.floor(width * item.height / item.width)
          const uri = item.urls.raw + `&w=${width}&dpr=1`
          const getImage = () => {

          }
          const holder: ImageHolder = {
            width,
            height,
            uri,
            getImage
          }
        })
      })
      .catch(error => {

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
