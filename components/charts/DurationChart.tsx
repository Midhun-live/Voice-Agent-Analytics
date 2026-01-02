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

            <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 16,
                            left: 60,   
                            bottom: 50,
                        }}
                    >

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
                            angle={-30}
                            textAnchor="end"
                            interval={0}
                            height={50}
                            tick={{ fontSize: 12 }}
                            label={{
                                value: "Hour of Day",
                                position: "insideBottom",
                                offset: -20,
                            }}
                        />

                        <YAxis
                            width={40}
                            tick={{ fontSize: 12 }}
                            label={{
                                value: "Avg Call Duration (min)",
                                angle: -90,
                                position: "left",
                                offset: 10,
                            }}
                        />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="hsl(var(--primary))"
                            fill="url(#callDurationGradient)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
