import { useEffect, useState } from 'react'
import './style.css'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

export default function ImageSlider({ url, page = 5, limit = 5 }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleCurrentImage() {
    currentImage === images.length - 1
      ? setCurrentImage(0)
      : setCurrentImage(currentImage + 1)
  }

  function handlePreviousImage() {
    currentImage === 0
      ? setCurrentImage(images.length - 1)
      : setCurrentImage(currentImage - 1)
  }

  useEffect(() => {
    async function fetchData(getUrl) {
      try {
        setLoading(true)
        const response = await fetch(`${url}?page=${page}&limit=${limit}`)
        const data = await response.json()
        // console.log('data', data)
        setImages(data)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        setError(e.message)
        console.log('error')
      }
    }

    fetchData(url)

    if (error) console.log(error)
  }, [url])

  return (
    <div className='acc-wrapper' style={{ backgroundColor: '#129893' }}>
      <div className='container'>
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image.download_url}
              alt={image.download_url}
              className={
                currentImage === index ? 'current-image' : 'hide-current-image'
              }
            />
          ))
        ) : loading ? (
          <div>Loading images</div>
        ) : (
          <div>No Images Found</div>
        )}
        <BsArrowLeftCircleFill
          style={{ width: '40px', height: '40px' }}
          className='arrow arrow-left'
          onClick={handlePreviousImage}
        ></BsArrowLeftCircleFill>
        <BsArrowRightCircleFill
          style={{ width: '40px', height: '40px' }}
          className='arrow arrow-right'
          onClick={handleCurrentImage}
        ></BsArrowRightCircleFill>
        <span className='circle-indicators'>
          {images && images.length > 0
            ? images.map((_, index) => (
                <button
                  className={
                    currentImage === index
                      ? 'current-indicator'
                      : 'current-indicator inactive-indicator'
                  }
                  key={index}
                  onClick={() => {
                    setCurrentImage(index)
                  }}
                ></button>
              ))
            : null}
        </span>
      </div>
    </div>
  )
}
