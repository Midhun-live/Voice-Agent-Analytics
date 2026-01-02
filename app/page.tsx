"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { DEFAULT_CALL_DATA } from "@/lib/defaultData"
import { CallDurationPoint } from "@/types/analytics"
import { isValidEmail } from "@/lib/email"

import EmailContextBanner from "@/components/EmailContentBanner"
import CallDurationChart from "@/components/charts/DurationChart"
import EditChartDialog from "@/components/EditChatDialog"
import { Button } from "@/components/ui/button"

type DataStatus = "DEFAULT" | "LOADED_UNSAVED" | "CUSTOM_SAVED"

export default function DashboardPage() {
  // Draft vs active identity
  const [draftEmail, setDraftEmail] = useState("")
  const [activeEmail, setActiveEmail] = useState<string | null>(null)

  // Data
  const [chartData, setChartData] =
    useState<CallDurationPoint[]>(DEFAULT_CALL_DATA)
  const [status, setStatus] =
    useState<DataStatus>("DEFAULT")

  // UI
  const [editOpen, setEditOpen] = useState(false)

  const loadUserData = async () => {
    if (!isValidEmail(draftEmail)) return

    setActiveEmail(draftEmail)

    const { data } = await supabase
      .from("user_chart_settings")
      .select("chart_data")
      .eq("email", draftEmail)
      .single()

    if (data) {
      setChartData(data.chart_data)
      setStatus("CUSTOM_SAVED")
    } else {
      setChartData(DEFAULT_CALL_DATA)
      setStatus("LOADED_UNSAVED")
    }
  }

  const saveUserData = async (updated: CallDurationPoint[]) => {
    if (!activeEmail) return

    await supabase
      .from("user_chart_settings")
      .upsert(
        {
          email: activeEmail,
          chart_data: updated,
        },
        { onConflict: "email" }
      )

    setChartData(updated)
    setStatus("CUSTOM_SAVED")
  }

  return (
    <main className="min-h-screen p-8 space-y-6">
      <section>
        <h1 className="text-2xl font-semibold">
          Voice Agent Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Call performance insights for voice agents
        </p>
      </section>

      <EmailContextBanner
        draftEmail={draftEmail}
        setDraftEmail={setDraftEmail}
        activeEmail={activeEmail}
        status={status}
        onLoad={loadUserData}
      />

      <CallDurationChart data={chartData} />

      <div className="flex justify-end gap-3">
        <Button
          onClick={() => setEditOpen(true)}
          disabled={!activeEmail}
        >
          Edit Data
        </Button>

        {status === "LOADED_UNSAVED" && (
          <Button
            variant="secondary"
            onClick={() => saveUserData(chartData)}
          >
            Save Default Data
          </Button>
        )}
      </div>

      <EditChartDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        data={chartData}
        onSave={saveUserData}
      />
    </main>
  )
}
