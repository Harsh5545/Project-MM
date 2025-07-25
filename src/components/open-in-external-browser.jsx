"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button" // Assuming shadcn button

export default function OpenInExternalBrowser() {
  const [isInAppBrowser, setIsInAppBrowser] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera

    // Check for common in-app browser patterns on iOS
    const isInstagram = userAgent.includes("Instagram")
    const isFacebook = userAgent.includes("FBAV") || userAgent.includes("FBAN")
    const isWebView = /(WebView|WKWebView)/i.test(userAgent) // Generic iOS WebView

    // Check if it's iOS and NOT Safari (Safari's user agent doesn't contain 'CriOS' or 'FxiOS')
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream
    const isSafari = /Safari/.test(userAgent) && !/Chrome|CriOS|FxiOS|Edg|Opera|OPR|Vivaldi/.test(userAgent)

    if (isIOS && !isSafari && (isInstagram || isFacebook || isWebView)) {
      setIsInAppBrowser(true)
    }
  }, [])

  const handleOpenInSafari = () => {
    // Attempt to open the current URL in Safari
    // This uses a common trick to force opening in the default browser.
    window.location.href = window.location.href
  }

  if (!isInAppBrowser) {
    return null // Don't render anything if not in an in-app browser
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-50 text-center">
      <p className="text-sm text-gray-700 mb-2">
        For the best experience, please open this page in your default browser.
      </p>
      <Button onClick={handleOpenInSafari} className="bg-[#c3965d] text-white hover:bg-[#eabf91]">
        Open in Safari
      </Button>
    </div>
  )
}
