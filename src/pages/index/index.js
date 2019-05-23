import React from 'react';
import { connect } from 'react-redux';
import { add } from './../../redux/user.redux'
import TopBar from './../../components/topbar';
import axios from 'axios';
import Swiper from 'swiper/dist/js/swiper';
import 'swiper/dist/css/swiper.min.css'
import './index.scss';
import Drawer from './../../components/drawer/drawer';
import Controller from './../../components/controller/controller';
import { changeSongName } from './../../assets/utils/util';
import { api } from './../../assets/api/index';


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            recommend: [],
            newsong: []
        }
    }
    render() {
        return (
            <div className='index'>
                <Drawer></Drawer>
                <TopBar></TopBar>
                <div className='swiper-box'>
                    <div className='swiper'>
                        <div className="swiper-container" style={{width: '100%',height: '150px'}}>
                            <div className="swiper-wrapper" style={{    position: 'absolute',top: '0',fontSize: '0px'}}>
                                {this.state.banners.map((item,index)=>(
                                    <div 
                                        style={{
                                            color: '#fff',
                                            fontSize: '10px'
                                        }} 
                                        key={index} 
                                        className="swiper-slide" 
                                    >
                                        <a style={{width: '100%',height: '100%',color: '#fff'}}>
                                          <img style={{width: '100%',height: '100%'}} src={item.imageUrl} alt=""/>
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <div className='swiper-pagination'></div>
                        </div>          
                    </div>
                </div>
                {/**
                    <div className='tab'>
                        <div className="tab-item">
                            <div className='icon-back'><i className='iconfont icontuijian'></i></div>
                            <p className='title'>每日推荐</p>
                        </div>
                        <div className="tab-item">
                            <div className='icon-back'><i className='iconfont icondianyingzhiye-gequbangdianjitai'></i></div>
                            <p className='title'>歌单</p>
                        </div>
                        <div className="tab-item">
                            <div className='icon-back'><i className='iconfont iconpaihangbang'></i></div>
                            <p className='title'>排行榜</p>
                        </div>
                        <div className="tab-item">
                            <div className='icon-back'><i className='iconfont iconmayi-diantai'></i></div>
                            <i className='iconfont'></i>
                            <p className='title'>电台</p>
                        </div>
                        <div className="tab-item">
                            <div className='icon-back'><i className='iconfont icon02f'></i></div>
                            <p className='title'>直播</p>
                        </div>
                    </div>
                */}

                <div className='recommend'>
                    <div className='title'>
                        <h4 className='left-title'>推荐歌单</h4>
                        <h4 className='right-title'>歌单广场</h4>
                    </div>
                    <ul>
                        {this.state.recommend.map(item => {
                            return (
                                <li key={item.id}>
                                    <div className='img'>
                                        <img src={item.picUrl} alt=""/>
                                    </div>
                                    <p className='name'>{item.name}</p>        
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className='news'>
                    <div className='title'>
                        <h4 className='left-title'>最新歌单</h4>
                        <h4 className='right-title'>歌单广场</h4>
                    </div>
                    <ul>
                        {this.state.newsong.map(item => {
                            return (
                                <li key={item.id}>
                                    <div className="left-news">
                                        <p className='song-name'>{item.song.name}</p>
                                        <p className='song-info'>
                                            {changeSongName(item.song.artists)}
                                        </p>
                                    
                                    </div>
                                    <div className="right-news">
                                        <i className='iconfont iconbofang'></i>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <Controller></Controller>
            </div>
            
        )
    }
    add() {
        this.props.add();
    }
    go() {
        this.props.history.push('/login')
    }

    setSwiper() {
        this.swiper = new Swiper('.swiper-container', {
            loop: true,     //循环
            autoplay:{      //自动播放，注意：直接给autoplay:true的话，在点击之后不能再自动播放了
                delay: 2500,
                disableOnInteraction: false,    //户操作swiper之后，是否禁止autoplay。默认为true：停止。
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,    // 允许点击跳转
            },
        });
    }
    getBanners() {
        return axios.get(api.Banner);
    }
    getRecommend() {
        return axios.get(api.Personalized);
    }
    getNew() {
        return axios.get(api.Newsong);
    }
    getAllData() {
        axios.all([this.getBanners(),this.getRecommend(),this.getNew()])
            .then(axios.spread((banner,recommend,newsong) => {
                // 两个请求现在都执行完成
                // console.log(banner);
                // console.log(recommend);
                // console.log(newsong);
                
                let newResult = recommend.data.result.slice(0,6);

                if(banner.status === 200 && banner.data.code === 200 && newsong.data.code === 200) {
                    this.setState({
                        banners: banner.data.banners,
                        recommend: newResult,
                        newsong: newsong.data.result
                    },() => {
                        this.setSwiper();
                    })
                }
            }));
    }

    componentDidMount() {
        this.getAllData()

    }
    componentWillUnmount() {
        this.swiper = null;
    }
}


const mapState = (state) => {
	return {
        name: state.user.name,
        num: state.user.num,
	}
}

const mapDispatch = (dispatch) => {
    return {
        add() {
            dispatch(add())
        }
    }
}


export default connect(mapState,mapDispatch)(Index);