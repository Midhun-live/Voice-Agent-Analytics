"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CallDurationPoint } from "@/types/analytics"

type Props = {
  open: boolean
  onClose: () => void
  data: CallDurationPoint[]
  onSave: (data: CallDurationPoint[]) => void
}

export default function EditChartDialog({
  open,
  onClose,
  data,
  onSave,
}: Props) {
  const [localData, setLocalData] = useState<CallDurationPoint[]>([])

  // Initialize local editable copy when dialog opens
  useEffect(() => {
    if (open) {
      setLocalData(data.map(d => ({ ...d })))
    }
  }, [open, data])

  const updateValue = (index: number, value: number) => {
    setLocalData(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, value } : item
      )
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit Call Duration (minutes)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {localData.map((d, i) => (
            <div key={d.hour} className="flex items-center gap-3">
              <span className="w-10 text-sm">{d.hour}</span>
              <Input
                type="number"
                step="0.1"
                value={d.value}
                onChange={(e) =>
                  updateValue(i, Number(e.target.value))
                }
              />
            </div>
          ))}
        </div>

        <Button
          onClick={() => {
            onSave(localData)
            onClose()
          }}
        >
          Save & Overwrite
        </Button>
      </DialogContent>
    </Dialog>
  )
}