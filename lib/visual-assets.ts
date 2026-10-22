export const logisticsScenes = {
  train: {
    src: "/images/rail-corridor-v3.png",
    altZh: "AI 生成的山地草原铁路集装箱运输场景示意",
    altEn: "AI-generated illustrative container train in a mountain landscape",
  },
  route: {
    src: "/images/road-freight-v3.png",
    altZh: "AI 生成的跨境公路集装箱运输场景示意",
    altEn: "AI-generated illustrative container truck on a mountain highway",
  },
  warehouse: {
    src: "/images/cargo-terminal-v3.png",
    altZh: "AI 生成的仓储装卸与货物交接场景示意",
    altEn:
      "AI-generated illustrative warehouse loading and cargo handover scene",
  },
} as const;

export type LogisticsScene = keyof typeof logisticsScenes;
