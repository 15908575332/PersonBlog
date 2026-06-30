/**
 * 颜色令牌 —— 与 src/styles/color.scss 中的 SCSS 变量保持同步
 * 供 Vue 组件 JS 端引用，拒绝硬编码
 */

/** 辅色色板（可用于随机背景色、标签色等） */
export const assistanceColors = [
  "#f1b9b9", // $assistance-1
  "#df9e98", // $assistance-2
  "#f0b43e", // $assistance-3
  "#9ed4d4", // $assistance-4
  "#ffc0cb", // $assistance-5
  "#7296de", // $assistance-6
  "#7c95b5", // $assistance-7
  "#86bfbf", // $assistance-8
  "#af9b9b", // $assistance-9
  "#c57d76", // $assistance-10
  "#25bbe4", //$primary-color
  "#82dbf4", //$primary-hover
  "#f24257"  //$primary-sub
];

/** 从色板中随机取一个颜色 */
export function randomAssistanceColor() {
  return assistanceColors[Math.floor(Math.random() * assistanceColors.length)];
}

/** 从色板中取循环颜色（基于索引，同一索引始终返回同一颜色） */
export function assistanceColorByIndex(index) {
  return assistanceColors[index % assistanceColors.length];
}
