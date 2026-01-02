"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {
  email: string
  setEmail: (v: string) => void
  isCustom: boolean
  onLoad: () => void
}

export default function EmailContextBanner({
  email,
  setEmail,
  isCustom,
  onLoad,
}: Props) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-4">
        <div className="flex-1 text-sm">
          <div>
            Viewing analytics for:{" "}
            <span className="font-medium">
              {email || "Default system data"}
            </span>
          </div>
          <div className="text-muted-foreground">
            Data source: {isCustom ? "Custom user data" : "System default"}
          </div>
        </div>

        <Input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-64"
        />

        <Button onClick={onLoad}>Load</Button>
      </CardContent>
    </Card>
  )
}
