import React , { Component , Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import './controller.scss';
import Swiper from 'swiper/dist/js/swiper';
import 'swiper/dist/css/swiper.min.css'
import logo from './../../assets/images/bg.jpg'
import Axios from 'axios';

var lineNo = 0; //当前行
var C_pos = 6; //C位
var offset = -20; //滚动距离（应等于行高）

export default class Controller extends Component {
    constructor(props) {
        super(props);
        this.text = React.createRef();
        this.audio = React.createRef();
        this.mask = React.createRef();
        this.avatar = React.createRef();
        this.state = {
            mask: false,
            lineNoHTML: "", // 当前音乐
            picUrl: "", // 音乐封面
            url: "", // 歌曲播放地址
            lyric: "", // 各吃
            medisArray: [], // 歌词数组
            m: "", // 总时长-分
            s: "", // 总时长-秒
            ss: "00", // 时长-分
            sm: "00", // 时长-秒
            audioPlayState: false, // 播放状态  默认没有播放
        }
    }
    
    render() {
        return (
            <div className='controller'>
                <div className='controller-box'>
                    <div 
                        className="avatar"
                        onClick={this.handleMaskShow.bind(this)}
                    >
                        <img src={logo} alt=""/>
                    </div>
                    <span className="name">演员 - 薛之谦</span>
                    <div className='right-controller'>
                        <i className='iconfont iconbofang'
                            onClick={this.handlePlayAudio.bind(this)}
                        ></i>
                        <i className='iconfont iconliebiao'></i>
                    </div>
                </div>
                

                <Fragment>
                    <div className='controller-mask' ref={this.mask}>
                            <div className='mask-top' >
                                <i className='iconfont iconico_open' onClick={this.handleMaskHide.bind(this)}></i>
                                <span>认真的雪</span>
                            </div>
                            <div className="mask-swiper">
                                <div className='swiper'>
                                    <div className="mask-swiper-container" style={{width: '100%',height: '100%'}}>
                                        <div className="swiper-wrapper" style={{ position: 'absolute',top: '0',fontSize: '0px'}}>

                                            <div style={{color: '#fff',fontSize: '10px', width: '100%'}}  className="swiper-slide" >
                                                <div className='avatar' ref={this.avatar} >
                                                    <img src={this.state.picUrl} alt=""/>
                                                </div>
                                                <p className='currentlyric'>{this.state.lineNoHTML}</p>
                                            </div>

                                            <div style={{color: '#fff',fontSize: '10px', width: '100%',overflow: 'hidden'}}  className="swiper-slide" >
                                                <textarea id="lrc_content" style={{display: 'none'}} name="textfield" cols="70" rows="10" defaultValue={this.state.lyric}>
                                                    
                                                </textarea>
                                                <ul id="text" className="text" ref={this.text}>
                                                    {this.state.medisArray.map((item,index) => {
                                                        return <li  key={index}>{item.c}</li>
                                                    })}
                                                </ul>
                                            </div>
                                            
                                        </div>
                                        <div className='swiper-pagination'></div>
                                    </div>  
                                </div>       
                            </div>

                            <div className='progress'>
                                <span className='start-time'>{this.state.sm}.{this.state.ss}</span>
                                <div className='progressBar' id="progressBar">
                                    <div className='bar'></div>
                                    <div className='progress-btn'></div>
                                
                                </div>
                                <span className='end-time'>{this.state.m}:{this.state.s}</span>
                            </div>

                            <div className='control'>
                                <div className="control-box">
                                    <i className='iconfont iconshangyishou'></i>
                                    <i 
                                        className={this.state.audioPlayState ? 'iconfont iconzanting current' : 'iconfont iconbofang current'} 
                                        onClick={this.handlePlayAudio.bind(this)}
                                    ></i>
                                    <i className='iconfont iconxiayishou'></i>
                                </div>
                            </div>
                            
                            <audio id='audio' ref={this.audio} src={this.state.url}></audio>

                        </div>
                        </Fragment>
               
            </div>
        )
    }

    handlePlayAudio() {
        let audioPlayState = this.state.audioPlayState;
        let audio = this.audio.current;
        let avatar = this.avatar.current;
        if(!audioPlayState) {
            audio.play();
            avatar.classList.add('play');
            avatar.classList.remove('pause');
            this.setState({
                audioPlayState: true
            })
        } else {
            audio.pause();
            avatar.classList.add('pause');
            this.setState({
                audioPlayState: false
            })
        }
    }

    handleMaskShow() {
        this.mask.current.style = "transform: translate3d(0, 0, 0)";
    }
    handleMaskHide() {
        this.mask.current.style = "transform: translate3d(0, 100%, 0)";
    }

    lineHigh() {
        let ul = this.text.current;
        let lis = ul.children; //歌词数组
        
        if(lineNo > 0) { 
            lis[lineNo-1].removeAttribute("class");
        }
        lis[lineNo].className = "lineHigh"; //高亮显示当前行
        this.setState({
            lineNoHTML: lis[lineNo].innerHTML
        })

        //文字滚动
        if(lineNo > C_pos) {
            ul.style.transform = "translateY("+(lineNo-C_pos)*offset+"px)"; //整体向上滚动一行高度
        }
    }
    //滚回到开头，用于播放结束时
    goback() {
        let avatar = this.avatar.current;
        avatar.classList.add('pause');
        let progressBar = document.getElementById("progressBar");
        let bar = progressBar.children[0]
        let progressBtn = progressBar.children[1];
        let ul = this.text.current;
        let lis = ul.children; //歌词数组
        for(let i = 0; i < lis.length; i++) {
            lis[i].removeAttribute("class");
        }
        ul.style.transform = "translateY(0)";
        bar.style.width = 0;
        progressBtn.style.left = 0;
        lineNo = 0;
        
    }

    // 格式化歌词
    FormatLyric(lyric) {
        var medisArray = [];
        var medises = lyric.split("\n");
        medises.forEach((item,index) => {
            var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
            medisArray.push({
                t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
                c: item.substring(item.indexOf("]") + 1, item.length)
            });
        });
        return medisArray;
    }

    // 格式歌词时长
    FormatSongLength(duration) {
        let m = parseInt(duration / 60);
        let s = parseInt(duration % 60);
        m < 10 ? m = "0" + m : m = m;
        s < 10 ? s = "0" + s : s = s;
        return {
            m,
            s
        }
    }

    componentDidMount() {

        Axios.get('http://localhost:4000/song/url?id=32507038').then(res => {
            let url = res.data.data[0].url;
            this.setState({
                url: url
            })
        }).catch(err => {
            console.log(err);
        })

        Axios.get("http://localhost:4000/song/detail?ids=32507038").then(res => {
            console.log(res);
            this.setState({
                picUrl: res.data.songs[0].al.picUrl
            })
        }).catch(err => {
            console.log(err);
        }) 

        Axios.get('http://localhost:4000/lyric?id=32507038').then(res => {
            this.setState({
                lyric: res.data.lrc.lyric
            },() => {
                let medisArray = this.FormatLyric(this.state.lyric)
                this.setState({
                    medisArray
                },() => {
                    this.SwiperFunc();
                    this.AudioOperation();
                })

            })
        }).catch(err => {
            console.log(err);
        })
    }

    AudioOperation() {
        let audio = this.audio.current;
        if(!audio) {
            return;
        } else {
            let medisArray = this.state.medisArray;
            audio.load();
            audio.oncanplay = () => {
                // 获取时长
                let duration = audio.duration; 
                let durationObj = this.FormatSongLength(duration)
                this.setState({
                    m: durationObj.m,
                    s: durationObj.s
                })
            }
            audio.ontimeupdate = () => {

                if(lineNo == medisArray.length) {
                    return;
                }
                var curTime = audio.currentTime; //播放器时间

                if(parseFloat(medisArray[lineNo].t)<=curTime){
                    this.lineHigh();//高亮当前行
                    lineNo++
                }
                

                // 动态显示时间
                let sm = audio.currentTime / 60;
                let ss =  audio.currentTime % 60;
                ss = parseInt(ss);
                sm = parseInt(sm);
                ss < 10 ? ss = "0" + ss : ss = ss;
                // sm > 0 ? sm = "0" + sm : sm = sm;
                if(sm > 0 && sm < 10) {
                    sm = "0" + sm;
                } else if (sm > 10) {
                    sm = sm;
                }
                setTimeout(() => {
                    this.setState({
                        ss: ss,
                        sm: sm
                    })
                }, 0);
                

                // 自定义播放进度
                let progressBar = document.getElementById("progressBar");
                let bar = progressBar.children[0]
                let progressBtn = progressBar.children[1];
                let time = audio.currentTime / audio.duration;
                bar.style.width = (time * 100) + "%";
                progressBtn.style.left = (time * 100) + "%";
                
                //监听播放器的ended事件，播放结束时回滚歌词
                audio.onended = () => {
                    setTimeout(() => {
                        this.setState({
                            ss: "00",
                            sm: "00",
                            audioPlayState: false,
                            lineNoHTML: ""
                        })
                    }, 0);
                    this.goback(); //回滚歌词
                };
            }
        }            
    }

    SwiperFunc() {
        this.maskSwiper = new Swiper('.mask-swiper-container', {
            loop: false,     //循环
            autoplay: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,    // 允许点击跳转
            },
        });
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }
}