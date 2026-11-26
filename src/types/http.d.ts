/**
 * src/api/http.js 的模块声明（该文件为 .js 且项目未开启 allowJs，
 * 无声明时 stores 中 import 会触发 TS7016）。签名与实现保持一致。
 */
declare module '@/api/http' {
    import type { AxiosRequestConfig } from 'axios'

    interface HttpClient {
        request<T = any>(config: AxiosRequestConfig): Promise<T>
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
        head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
        patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
        defaults: Record<string, any>
        interceptors: Record<string, any>
    }

    const service: HttpClient
    export default service
}
