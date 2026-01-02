"use client"

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CallDurationPoint } from "@/types/analytics"

type CallDurationChartProps = {
  data: CallDurationPoint[]
}

export default function CallDurationChart({
  data,
}: CallDurationChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Duration Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">
          Average call duration (minutes) by hour of day
        </p>
      </CardHeader>

      <CardContent className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="callDurationGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="hour"
              label={{
                value: "Hour of Day",
                position: "insideBottom",
              }}
            />
            <YAxis
              label={{
                value: "Avg Call Duration (min)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="url(#callDurationGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
