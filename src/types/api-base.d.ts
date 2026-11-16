/**
 * src/api/base.js 的模块声明（该文件为 .js 且项目未开启 allowJs，
 * 无声明时 stores 中 import 会触发 TS7016）。签名与实现保持一致。
 */
declare module '@/api/base' {
    export const BACKEND_PORT: number
    export const API_ORIGIN: string
    export const MUSIC_API_BASE: string
    const defaultOrigin: string
    export default defaultOrigin
}
