/**
 * 区间随机色（palette）
 * 不再枚举色值：颜色由「色相区间 + 饱和/亮度区间」在运行时生成，
 * 因此本文件不持有任何十六进制常量，也不依赖 SCSS 侧色板声明。
 * 色相区间 350°→50°（暖粉 / 珊瑚 / 橙 / 金），低饱和 + 高亮度 = 浅底深字。
 */

/** 色相起点（度） */
const HUE_START = 350
/** 色相跨度（度），从 HUE_START 正向展开，跨 0° 自动取模 */
const HUE_SPAN = 60
/** 饱和度区间（%） */
const SAT_MIN = 58
const SAT_MAX = 76
/** 亮度区间（%）：整体偏亮，保证深色文字可读 */
const LIGHT_MIN = 72
const LIGHT_MAX = 84
/** 索引步进的色相偏移（度）：取与区间跨度互质的步长，错开且不跑出色相带 */
const HUE_STEP = 17
/** 饱和/亮度三档循环：同色相带内仅靠色相差不足以区分，用明度拉开层次 */
const TONES: ReadonlyArray<readonly [number, number]> = [
  [60, 84],
  [74, 74],
  [82, 63],
]

const norm = (h: number): number => ((h % 360) + 360) % 360
const rand = (min: number, max: number): number => min + Math.random() * (max - min)

function hsl(h: number, s: number, l: number): string {
  return `hsl(${norm(h).toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%)`
}

/** 随机取一个区间内颜色（CSS 颜色字符串，可直接给 --btn-color 等自定义属性赋值） */
export function randomAssistanceColor(): string {
  return hsl(HUE_START + Math.random() * HUE_SPAN, rand(SAT_MIN, SAT_MAX), rand(LIGHT_MIN, LIGHT_MAX))
}

/** 按索引取色：同一索引恒定返回同一颜色，相邻索引色相差异明显 */
export function assistanceColorByIndex(index: number): string {
  const i = Math.abs(Math.trunc(index))
  const hue = HUE_START + ((i * HUE_STEP) % HUE_SPAN)
  const [s, l] = TONES[i % TONES.length]
  return hsl(hue, s, l)
}

/**
 * 标签胶囊配色：三档亮度中最低一档为 63%，压亮底的固定深色前景
 * （tokens 层的 --text-on-light）对比度仍达标，因此前景色恒为深色，
 * 无需回读 CSS 实算对比度，也不在本文件写死色值。
 */
export function tagPillColors(index: number): Record<string, string> {
  return {
    '--pill-bg': assistanceColorByIndex(index),
    '--pill-fg': 'var(--text-on-light)',
  }
}

/** 区间配色是否偏亮（供需要动态选择前景色的场景使用） */
export function isLightColor(color: string): boolean {
  const match = color.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/)
  if (!match) return true
  return Number(match[3]) >= 55
}
