export const host = "http://localhost:4000";


export const api = {
    LoginPhone: `${host}/login/cellphone`,  // 手机登录
    LoginStatus: `${host}/login/status`, // 刷新登录状态
    Banner: `${host}/banner`, // 首页轮播图
    Personalized: `${host}/personalized`, // 推荐歌单
    Newsong: `${host}/personalized/newsong`,// 最新歌单
    Hotsong: `${host}/top/list?idx=1`, // 热歌榜单
    Artists: `${host}/top/artists`, // 歌手榜单
    Search: `${host}/search` // 搜索
}