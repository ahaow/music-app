# music-app

仿照**网易云音乐APP**的移动webapp

api接口地址：[网易云音乐 NodeJS 版 API](https://binaryify.github.io/NeteaseCloudMusicApi/#/)


## 项目结构
	
	- src 主要开发代码
	    -- assets 静态资源
			-- api // 所有api接口地址
			-- images // 本地图片资源
			-- scss // css样式文件夹
			-- utils // 工具库
	    -- components 封装组件库、
			-- authrouter // 用户状态组件
			-- controller // 音乐播放器组件
			-- drawer // 左侧抽屉组件
			-- topbar // 顶部导航组件
	    -- pages 每一个路由对应的页面
			-- hotsong // 热门页面
	        -- index  // 首页
	        -- login  // 登录页
			-- search // 搜索页
			-- singer // 歌手页面
			-- singerdetail // 歌手详情页
	    -- reducers.js  reducers入口文件
	    -- rudex 所有redux操作文件夹
			-- user.redux.js // 用户信息
			-- drawer.redux.js // 抽屉状态
			-- music.redux.js // 音乐控制器状态
	    -- index 入口文件

## 项目依赖

    -- react + react-router
    -- redux + react-redux + redux-thunk 状态管理
    -- axios ajax请求库
    -- react-transition-group 动画


## 关于 audio

[music-app 关于 audio](https://github.com/ahaow/Blog/issues/19)


