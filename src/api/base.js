/**
 * 后端接口基址统一出口
 *
 * 接口基址不再写死为固定的本地地址，改为按当前访问页面的 hostname 动态推导：
 * 其他设备通过 http://<主机局域网IP>:8008 访问页面时，接口请求会指向该 IP 上的后端，
 * 而不会打到访问者自己机器的 3000 端口。
 */

// 后端服务端口（集中维护，需要改端口只改这一处）
export const BACKEND_PORT = 3000;

// 当前访问来源的 hostname（如 192.168.x.x、局域网域名等）
const currentHost = window.location.hostname;

// 后端接口根地址
export const API_ORIGIN = `http://${currentHost}:${BACKEND_PORT}`;

// 网易云音乐接口基址
export const MUSIC_API_BASE = `${API_ORIGIN}/music-api`;

export default API_ORIGIN;
