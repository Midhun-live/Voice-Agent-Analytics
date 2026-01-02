"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { DEFAULT_CALL_DATA } from "@/lib/defaultData"
import { CallDurationPoint } from "@/types/analytics"

import EmailContextBanner from "@/components/EmailContentBanner"
import CallDurationChart from "@/components/charts/DurationChart"
import EditChartDialog from "@/components/EditChatDialog"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  // Identity
  const [email, setEmail] = useState<string>("")

  // Analytics data
  const [chartData, setChartData] = useState<CallDurationPoint[]>(
    DEFAULT_CALL_DATA
  )

  // UI state
  const [isCustomData, setIsCustomData] = useState<boolean>(false)
  const [editOpen, setEditOpen] = useState<boolean>(false)

  // Load data for email
  const loadUserData = async () => {
    if (!email) return

    const { data, error } = await supabase
      .from("user_chart_settings")
      .select("chart_data")
      .eq("email", email)
      .single()

    if (data && !error) {
      setChartData(data.chart_data)
      setIsCustomData(true)
    } else {
      // fallback to default
      setChartData(DEFAULT_CALL_DATA)
      setIsCustomData(false)
    }
  }

  // Save edited data
  const saveUserData = async (updatedData: CallDurationPoint[]) => {
    if (!email) return

    const { error } = await supabase
      .from("user_chart_settings")
      .upsert(
        {
          email,
          chart_data: updatedData,
        },
        { onConflict: "email" }
      )

    if (!error) {
      setChartData(updatedData)
      setIsCustomData(true)
    }
  }


  return (
    <main className="min-h-screen p-8 space-y-6">
      {/* Page Header */}
      <section>
        <h1 className="text-2xl font-semibold">
          VoiceOps Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Call performance insights for voice agents
        </p>
      </section>

      {/* Identity & Context */}
      <EmailContextBanner
        email={email}
        setEmail={setEmail}
        isCustom={isCustomData}
        onLoad={loadUserData}
      />

      {/* Chart */}
      <CallDurationChart data={chartData} />

      {/* Actions */}
      <div className="flex justify-end">
        <Button
          onClick={() => setEditOpen(true)}
          disabled={!email}
        >
          Edit Call Duration Data
        </Button>
      </div>

      {/* Edit Dialog */}
      <EditChartDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        data={chartData}
        onSave={saveUserData}
      />
    </main>
  )
}