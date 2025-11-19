"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from "recharts"

export default function ServicesDashboard() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="border border-gray-200/80 shadow-sm rounded-xl">
        <CardContent>
          <ChartContainer
            config={{ shipments: { label: "运输量", color: "#2563eb" } }}
            className="h-64"
          >
            <AreaChart
              data={[
                { month: "01", shipments: 320 },
                { month: "02", shipments: 380 },
                { month: "03", shipments: 410 },
                { month: "04", shipments: 460 },
                { month: "05", shipments: 520 },
                { month: "06", shipments: 580 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area dataKey="shipments" type="monotone" stroke="#2563eb" fill="#2563eb22" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="border border-gray-200/80 shadow-sm rounded-xl">
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white border border-gray-200 p-6">
              <div className="text-sm text-gray-500 mb-2">回程班列</div>
              <div className="text-2xl font-bold text-gray-900">58%</div>
            </div>
            <div className="rounded-lg bg-white border border-gray-200 p-6">
              <div className="text-sm text-gray-500 mb-2">多式联运</div>
              <div className="text-2xl font-bold text-gray-900">27%</div>
            </div>
            <div className="rounded-lg bg-white border border-gray-200 p-6">
              <div className="text-sm text-gray-500 mb-2">清关仓储</div>
              <div className="text-2xl font-bold text-gray-900">15%</div>
            </div>
            <div className="rounded-lg bg-white border border-gray-200 p-6">
              <div className="text-sm text-gray-500 mb-2">准点率</div>
              <div className="text-2xl font-bold text-gray-900">97.3%</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border border-gray-200/80 shadow-sm rounded-xl">
        <CardContent>
          <ChartContainer
            config={{ rail: { label: "班列", color: "#2563eb" }, road: { label: "公路", color: "#16a34a" }, multi: { label: "多式联运", color: "#f59e0b" } }}
            className="h-64"
          >
            <BarChart
              data={[
                { month: "01", rail: 180, road: 90, multi: 50 },
                { month: "02", rail: 190, road: 100, multi: 60 },
                { month: "03", rail: 210, road: 110, multi: 65 },
                { month: "04", rail: 230, road: 120, multi: 70 },
                { month: "05", rail: 260, road: 130, multi: 80 },
                { month: "06", rail: 300, road: 140, multi: 85 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="rail" stackId="routes" fill="#2563eb" />
              <Bar dataKey="road" stackId="routes" fill="#16a34a" />
              <Bar dataKey="multi" stackId="routes" fill="#f59e0b" />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="border border-gray-200/80 shadow-sm rounded-xl">
        <CardContent>
          <div className="h-64">
            <PieChart width={400} height={256}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={[
                  { name: "中国↔乌兹别克斯坦", value: 42 },
                  { name: "中国↔哈萨克斯坦", value: 28 },
                  { name: "中国↔吉尔吉斯斯坦", value: 18 },
                  { name: "中国↔塔吉克斯坦", value: 12 },
                ]}
                dataKey="value"
                nameKey="name"
                cx={200}
                cy={120}
                outerRadius={90}
                innerRadius={50}
                label
              >
                {[
                  "#2563eb",
                  "#16a34a",
                  "#f59e0b",
                  "#ef4444",
                ].map((c, i) => (
                  <Cell key={i} fill={c} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </CardContent>
      </Card>
      <Card className="border border-gray-200/80 shadow-sm rounded-xl">
        <CardContent>
          <ChartContainer
            config={{ ev: { label: "新能源车", color: "#22c55e" }, passenger: { label: "乘用车", color: "#3b82f6" }, machinery: { label: "工程机械", color: "#f97316" } }}
            className="h-64"
          >
            <LineChart
              data={[
                { month: "01", ev: 80, passenger: 60, machinery: 40 },
                { month: "02", ev: 95, passenger: 70, machinery: 45 },
                { month: "03", ev: 110, passenger: 85, machinery: 55 },
                { month: "04", ev: 125, passenger: 95, machinery: 60 },
                { month: "05", ev: 140, passenger: 110, machinery: 70 },
                { month: "06", ev: 160, passenger: 120, machinery: 75 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="ev" stroke="#22c55e" strokeWidth={2} dot={false} />
              <Line dataKey="passenger" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line dataKey="machinery" stroke="#f97316" strokeWidth={2} dot={false} />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}