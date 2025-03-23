"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface NotificationProps {
  message: string
  type?: "success" | "error" | "info"
  duration?: number
  onClose?: () => void
}

export function SimpleNotification({ message, type = "info", duration = 5000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const bgColor =
    type === "success"
      ? "bg-green-100 border-green-500"
      : type === "error"
        ? "bg-red-100 border-red-500"
        : "bg-blue-100 border-blue-500"

  const textColor = type === "success" ? "text-green-800" : type === "error" ? "text-red-800" : "text-blue-800"

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md border-l-4 ${bgColor} ${textColor} shadow-md max-w-md`}>
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button
          onClick={() => {
            setIsVisible(false)
            if (onClose) onClose()
          }}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// Simple hook to use notifications
export function useNotification() {
  const [notifications, setNotifications] = useState<
    Array<{
      id: string
      message: string
      type: "success" | "error" | "info"
    }>
  >([])

  const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    const id = Math.random().toString(36).substring(2, 9)
    setNotifications((prev) => [...prev, { id, message, type }])
    return id
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return {
    notifications,
    showNotification,
    dismissNotification,
  }
}

