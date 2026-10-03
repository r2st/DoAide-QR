import { useCallback, useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'

const DEFAULT_OPTIONS = {
  width: 300,
  height: 300,
  dotsOptions: {
    color: '#000000',
    type: 'rounded',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
  },
  cornersDotOptions: {
    type: 'dot',
  },
  qrOptions: {
    errorCorrectionLevel: 'M',
  },
}

export function useQRCode(data, options = {}) {
  const qrRef = useRef(null)
  const qrInstance = useRef(null)
  const containerRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    data: data || ' ',
    dotsOptions: { ...DEFAULT_OPTIONS.dotsOptions, ...options.dotsOptions },
    backgroundOptions: { ...DEFAULT_OPTIONS.backgroundOptions, ...options.backgroundOptions },
    cornersSquareOptions: { ...DEFAULT_OPTIONS.cornersSquareOptions, ...options.cornersSquareOptions },
    cornersDotOptions: { ...DEFAULT_OPTIONS.cornersDotOptions, ...options.cornersDotOptions },
    qrOptions: { ...DEFAULT_OPTIONS.qrOptions, ...options.qrOptions },
  }

  if (options.image) {
    mergedOptions.image = options.image
    mergedOptions.imageOptions = {
      crossOrigin: 'anonymous',
      margin: 5,
      imageSize: 0.3,
      ...options.imageOptions,
    }
  }

  useEffect(() => {
    if (!qrInstance.current) {
      qrInstance.current = new QRCodeStyling(mergedOptions)
      setIsReady(true)
    } else {
      qrInstance.current.update(mergedOptions)
    }
  }, [data, JSON.stringify(options)])

  useEffect(() => {
    if (containerRef.current && qrInstance.current && isReady) {
      containerRef.current.innerHTML = ''
      qrInstance.current.append(containerRef.current)
    }
  }, [isReady])

  const download = useCallback(async (format = 'png', filename = 'qr-code') => {
    if (qrInstance.current) {
      await qrInstance.current.download({
        name: filename,
        extension: format,
      })
    }
  }, [])

  const getRawData = useCallback(async (format = 'png') => {
    if (qrInstance.current) {
      return await qrInstance.current.getRawData(format)
    }
    return null
  }, [])

  return { containerRef, download, getRawData, qrInstance: qrInstance.current }
}
