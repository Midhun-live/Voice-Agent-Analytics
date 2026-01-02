"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { isValidEmail } from "@/lib/email"

type Props = {
  draftEmail: string
  setDraftEmail: (v: string) => void
  activeEmail: string | null
  status: "DEFAULT" | "LOADED_UNSAVED" | "CUSTOM_SAVED"
  onLoad: () => void
}

export default function EmailContextBanner({
  draftEmail,
  setDraftEmail,
  activeEmail,
  status,
  onLoad,
}: Props) {
  const isValid = isValidEmail(draftEmail)

  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-4">
        <div className="flex-1 text-sm">
          <div>
            Viewing analytics for:{" "}
            <span className="font-medium">
              {activeEmail ?? "System default"}
            </span>
          </div>

          <div className="text-muted-foreground">
            {status === "DEFAULT" && "System data (not saved)"}
            {status === "LOADED_UNSAVED" &&
              "Data loaded but not saved yet"}
            {status === "CUSTOM_SAVED" &&
              "Custom data saved for this email"}
          </div>
        </div>

        <Input
          placeholder="Enter email"
          value={draftEmail}
          onChange={(e) => setDraftEmail(e.target.value)}
          className="w-64"
        />

        <Button
          onClick={onLoad}
          disabled={!isValid}
        >
          Load
        </Button>
      </CardContent>
    </Card>
  )
}
