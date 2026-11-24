/**
 * 网易云音乐 API 封装
 * 前端调用 /api/music-api/xxx → Vite proxy → Express 3000 → music-api 3100
 */
import axios from "axios";
import { MUSIC_API_BASE } from "../base";

const BASE = MUSIC_API_BASE;

const api = {
  /** 搜索歌曲 */
  searchMusic(keywords, limit = 50) {
    return axios.get(`${BASE}/cloudsearch`, { params: { keywords, limit } });
  },

  /** 每日推荐歌曲 */
  recommendSongs() {
    return axios.get(`${BASE}/recommend/songs`);
  },
  /** 推荐歌单 */
  recommendPlayList(limit = 10) {
    return axios.get(`${BASE}/personalized`, { params: { limit } });
  },
  /** 热门电台 */
  recommendDjprogram(limit = 12) {
    return axios.get(`${BASE}/dj/hot`, { params: { limit } });
  },
  /** MV排行 */
  recommendMv(limit = 6) {
    return axios.get(`${BASE}/top/mv`, { params: { limit } });
  },
  /** 推荐节目 */
  recommendProgram(limit = 4) {
    return axios.get(`${BASE}/program/recommend`, { params: { limit } });
  },
  /** 独家放送 */
  exclusiveRelease(limit = 8, offset = 0) {
    return axios.get(`${BASE}/personalized/privatecontent/list`, {
      params: { limit, offset },
    });
  },
  /** 新歌速递 */
  newSongExpress(type = 8) {
    return axios.get(`${BASE}/top/song`, { params: { type } });
  },

  /** 获取歌单详情 */
  playlistDetail(id) {
    return axios.get(`${BASE}/playlist/detail`, { params: { id } });
  },

  /** 获取歌单全部歌曲 */
  playlistTrackAll(id, limit = 500) {
    return axios.get(`${BASE}/playlist/track/all`, { params: { id, limit } });
  },

  /** 获取歌曲播放 URL（走 /song/url：v1 通道匿名请求会被风控返回 -460） */
  songUrl(id, level = "exhigh") {
    const LEVEL_TO_BR = { standard: 128000, higher: 192000, exhigh: 320000, lossless: 999000 };
    return axios.get(`${BASE}/song/url`, {
      params: { id, br: LEVEL_TO_BR[level] ?? 320000 },
    });
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
