/**
 * 色板访问层（S4）
 * 真实色值的唯一来源是 SCSS：_variables.scss 经 _palette-output.scss 暴露为 CSS 变量，
 * 本文件只做"变量名 → CSS 变量"的映射，不重复定义任何十六进制色值。
 * 顺序与旧 colorTokens.js 严格一致：assistance-1..10 → primary-color / primary-hover / primary-sub。
 */

/** 色板变量名（与 SCSS 色板顺序一一对应） */
const PALETTE_KEYS: readonly string[] = [
  'assistance-1',
  'assistance-2',
  'assistance-3',
  'assistance-4',
  'assistance-5',
  'assistance-6',
  'assistance-7',
  'assistance-8',
  'assistance-9',
  'assistance-10',
  'primary-color',
  'primary-hover',
  'primary-sub',
]

/** 取色板第 i 个元素对应的 CSS 变量名（循环取模，索引语义与旧实现一致） */
function paletteKey(index: number): string {
  return PALETTE_KEYS[((index % PALETTE_KEYS.length) + PALETTE_KEYS.length) % PALETTE_KEYS.length]
}

/** 返回 CSS 变量引用字符串，供内联 style / CSS 变量使用，零运行时读取 */
function cssVarRef(index: number): string {
  return `var(--${paletteKey(index)})`
}

/** getComputedStyle 结果缓存（只服务于需要真实色值的场景，如亮度计算） */
const resolvedCache = new Map<string, string>()

/** 读取 CSS 变量的真实色值；缺失时告警并回退为 var() 引用 */
function readColorVar(key: string): string {
  const cached = resolvedCache.get(key)
  if (cached) return cached
  if (typeof window === 'undefined') return `var(--${key})`
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--${key}`).trim()
  if (!value) {
    console.warn(`[palette] CSS 变量 --${key} 未定义，已回退为 var() 引用`)
    return `var(--${key})`
  }
  resolvedCache.set(key, value)
  return value
}

/**
 * 辅色色板：索引访问返回真实色值（懒读取 + 缓存），供颜色计算类场景使用。
 * 内联 style 直接赋值场景请改用 randomAssistanceColor / assistanceColorByIndex。
 */
export const assistanceColors: string[] = new Proxy([] as string[], {
  get(target, prop, receiver) {
    if (prop === 'length') return PALETTE_KEYS.length
    if (typeof prop === 'string' && /^\d+$/.test(prop)) return readColorVar(paletteKey(Number(prop)))
    return Reflect.get(target, prop, receiver)
  },
})

/** 从色板中随机取一个颜色（返回 CSS 变量引用） */
export function randomAssistanceColor(): string {
  return cssVarRef(Math.floor(Math.random() * PALETTE_KEYS.length))
}

/** 从色板中取循环颜色（基于索引，同一索引始终返回同一颜色；返回 CSS 变量引用） */
export function assistanceColorByIndex(index: number): string {
  return cssVarRef(index)
}
