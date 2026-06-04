/**
 * 网易云音乐 API 封装
 * 前端调用 /api/music-api/xxx → Vite proxy → Express 3000 → music-api 3100
 */
import axios from 'axios';

const BASE = 'http://localhost:3000/music-api';

const api = {
  /** 搜索歌曲 */
  searchMusic(keywords, limit = 50) {
    return axios.get(`${BASE}/cloudsearch`, { params: { keywords, limit } });
  },

  /** 获取歌单详情 */
  playlistDetail(id) {
    return axios.get(`${BASE}/playlist/detail`, { params: { id } });
  },

  /** 获取歌单全部歌曲 */
  playlistTrackAll(id, limit = 500) {
    return axios.get(`${BASE}/playlist/track/all`, { params: { id, limit } });
  },

  /** 获取歌曲播放 URL */
  songUrl(id, level = 'standard') {
    return axios.get(`${BASE}/song/url/v1`, { params: { id, level } });
  },

  /** 获取歌词 */
  lyric(id) {
    return axios.get(`${BASE}/lyric`, { params: { id } });
  },

  /** 获取歌曲详情 */
  songDetail(ids) {
    return axios.get(`${BASE}/song/detail`, { params: { ids } });
  },

  /* ========= 登录相关 ========= */

  /** 生成二维码 key */
  async getQrKey() {
    const { data } = await axios.get(`${BASE}/login/qr/key`);
    return data.data.unikey;
  },

  /** 生成二维码图片 URL */
  async createQr(key) {
    const { data } = await axios.get(`${BASE}/login/qr/create`, {
      params: { key, qrimg: true },
    });
    return data.data;
  },

  /** 检查二维码扫码状态 */
  checkQr(key) {
    return axios.get(`${BASE}/login/qr/check`, { params: { key } });
  },

  /** 获取登录状态 */
  loginStatus() {
    return axios.get(`${BASE}/login/status`);
  },

  /** 获取用户歌单 */
  userPlaylist(uid) {
    return axios.get(`${BASE}/user/playlist`, { params: { uid } });
  },

  /** 获取喜欢列表（需登录） */
  likeList(uid) {
    return axios.get(`${BASE}/likelist`, { params: { uid } });
  },
};

export default api;