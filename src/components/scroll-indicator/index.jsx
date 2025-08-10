import { useEffect, useState } from 'react'
import './style.css'

export default function ScrollIndicator({ url = [] }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [scrollPercentage, setScrollPercentage] = useState(0)

  async function fetchData(getUrl) {
    try {
      setLoading(true)
      const response = await fetch(getUrl)
      const data = await response.json()
      console.log(data.products)
      setData(data.products)
    } catch (e) {
      console.log(e.message)
      setError(e.message)
      setLoading(false)
    }
  }

  function handleScrollPercentage() {
    setScrollPercentage(
      (document.documentElement.scrollTop /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight)) *
        100
    )
    // console.log(
    //   document.body.scrollTop,
    //   document.documentElement.scrollTop,
    //   document.documentElement.scrollHeight,
    //   document.documentElement.clientHeight
    // )
    // console.log(
    //   'percent',
    //   (document.documentElement.scrollTop /
    //     (document.documentElement.scrollHeight -
    //       document.documentElement.clientHeight)) *
    //     100
    // )
  }

  useEffect(() => {
    fetchData(url)
  }, [url])

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPercentage)

    return () => {
      window.removeEventListener('scroll', () => {})
    }
  }, [])

  return (
    <div>
      <div className="top-container">
        <h1>Scroll indicator</h1>
        <div className="scroll-progress-tracking-container">
          <div
            className="current-progress-bar"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="data-container">
        {data && data.length > 0
          ? data.map((item, index) => <div key={index}>{item.title}</div>)
          : null}
      </div>
    </div>
  )
}
