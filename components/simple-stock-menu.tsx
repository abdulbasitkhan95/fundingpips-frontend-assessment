"use client"
import { Button } from "@/components/ui/button"

interface SimpleStockMenuProps {
  onRemove?: () => void
  onView?: () => void
}

export function SimpleStockMenu({ onRemove, onView }: SimpleStockMenuProps) {
  return (
    <div className="flex space-x-2">
      {onView && (
        <Button variant="ghost" size="sm" onClick={onView}>
          View
        </Button>
      )}
      {onRemove && (
        <Button variant="ghost" size="sm" onClick={onRemove}>
          Remove
        </Button>
      )}
    </div>
  )
}

