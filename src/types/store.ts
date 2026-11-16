/**
 * stores 层共享类型定义。
 * 字段来源：server/routes/userRelatedApi.js、server/routes/mainContentApi.js 的 SQL 列名与返回结构，
 * 以及 src 下各调用方实际读取的字段；未在接口出现过的历史访问以可选字段标注并说明。
 */

/** jwt-decode 解码后的载荷（仅声明 stores 用到的字段） */
export interface JwtPayload {
    iat: number
    exp: number
}

/** 登录用户信息：/user/login 与 /user/updateUserInfo 返回的 user 字段 */
export interface UserInfo {
    userId: number
    username: string
    email: string
    avatarUrl: string | null
    sex: string | null
    introduce: string | null
    registerTime: string
    vipLevel: number
    /** 历史遗留：MessageBoard.vue 读取 user.id，后端仅返回 userId，该字段运行时为 undefined */
    id?: number
}

/** 登录请求体 */
export interface LoginCredentials {
    email: string
    password: string
}

/** /user/login 响应体 */
export interface LoginResponse {
    token: string
    user: UserInfo
}

/** /user/updateUserInfo 请求体（后端 validateUpdateInfo 校验的四个字段） */
export interface UserUpdatePayload {
    username: string
    email: string
    sex: string
    introduce: string
}

/** /user/updateUserInfo 响应体 */
export interface UpdateUserProfileResult {
    message: string
    user: UserInfo
}

/** /user/refresh 的应用层结果标记，用于区分实际刷新与无需刷新 */
export type RefreshReason = 'REFRESHED' | 'NOT_NEEDED'

export interface RefreshTokenResult {
    success: boolean
    reason: RefreshReason
}

/** 导航分类：/main/getNavData 返回的 navContent 行 */
export interface NavItem {
    category_id: number
    nav_btn_title: string
    nav_btn_subtitle: string | null
    category_img_url: string | null
}

/** /main/getNavData 响应体 */
export interface NavDataResponse {
    code: number
    message: string
    navContent: NavItem[]
}

/** 文章行：/main/getArticleInfo 的 SELECT a.* + users.username + has_comment */
export interface ArticleInfo {
    article_id: number
    user_id: number
    category_id: number
    title: string
    preface: string | null
    master_tag: string | null
    sub_tag: string | null
    cover_image_url: string | null
    cover_video_url: string | null
    heat: number
    like_count: number
    release_time: string
    /** 专栏推荐标记，recordContent.vue 以 === 1 判断 */
    has_advocate: number
    /** getArticleInfo 中由 CASE WHEN 生成的布尔列 */
    has_comment: boolean
    /** INNER JOIN users 带来的作者名 */
    username: string
    /** 历史遗留：recordContent.vue 读取 item.id，接口只返回 article_id */
    id?: number
}

/** /main/getArticleInfo 返回的 tags 行（SELECT distinct master_tag） */
export interface ArticleTagRow {
    master_tag: string
}

/** /main/getArticleInfo 响应体 */
export interface MainContentResponse {
    code: number
    message: string
    result: ArticleInfo[]
    tags: ArticleTagRow[]
}

/** 波纹开关 store 的状态形状 */
export interface RippleState {
    enabled: boolean
    toggle(): void
}
