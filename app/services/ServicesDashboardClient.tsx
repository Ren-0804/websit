"use client"

import dynamic from "next/dynamic"

const Dashboard = dynamic(() => import("./ServicesDashboard"), { ssr: false })

export default function ServicesDashboardClient() {
  return <Dashboard />
}