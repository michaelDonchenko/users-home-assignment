import { useEffect } from 'react'
import { useState } from 'react'

const useWindowWidth = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650)

  useEffect(() => {
    function onWidthChange() {
      setIsMobile(window.innerWidth < 650)
    }

    window.addEventListener('resize', onWidthChange)

    return () => {
      window.removeEventListener('resize', onWidthChange)
    }
  }, [])

  return { isMobile }
}

export default useWindowWidth
