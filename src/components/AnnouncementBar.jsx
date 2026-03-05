import { useState, useEffect } from 'react'
import { getSettings } from '../api'
import './AnnouncementBar.css'

const defaultMessages = [
  'FREE DELIVERY ABOVE RS 4,000/– &nbsp;•&nbsp; Standard Delivery Rs 199/– Only',
  'NEW ARRIVALS ARE HERE &nbsp;•&nbsp; Shop the Latest Collection Now',
  'CASH ON DELIVERY AVAILABLE &nbsp;•&nbsp; All Across Pakistan',
]

export default function AnnouncementBar() {
  const [index, setIndex]     = useState(0)
  const [visible, setVisible] = useState(true)
  const [messages, setMessages] = useState(defaultMessages)

  useEffect(() => {
    getSettings()
      .then(data => {
        setMessages([
          data.announcement_1,
          data.announcement_2,
          data.announcement_3,
        ])
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % messages.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [messages])

  return (
    <div className="announcement-bar">
      <p
        className={`announcement-text ${visible ? 'visible' : 'hidden'}`}
        dangerouslySetInnerHTML={{ __html: messages[index] }}
      />
    </div>
  )
}