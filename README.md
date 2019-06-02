# music-app(简单版)

仿照**网易云音乐APP**的移动webapp(简单版)

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

## 功能部分

	1. 登录页 （登录之后刷新，更新状态接口 报301，没有解决该问题）
	2. 推荐榜
	3. 热歌榜
	4. 歌手榜
	5. 歌手歌曲页
	6. 搜索歌曲
	7. 音乐播放器 （播放器 上一首，下一首，播放历史列表没有做）

## 效果

![登录页](https://tva1.sinaimg.cn/large/007rAy9hgy1g3n41ffrbqj30d60mqtal.jpg)
	
![](https://tva1.sinaimg.cn/large/007rAy9hgy1g3n44vn0ocg30gt0nnx6q.jpg)

![](https://tva1.sinaimg.cn/large/007rAy9hgy1g3n49b5pu7g30gt0nnnpf.jpg)

![](https://tva1.sinaimg.cn/large/007rAy9hgy1g3n4awy0nhg30gt0nn4qp.jpg)

![](https://tva1.sinaimg.cn/large/007rAy9hgy1g3n4d98q2hg30gt0nnhdu.jpg)






## 关于 audio

[music-app 关于 audio](https://github.com/ahaow/Blog/issues/19)




