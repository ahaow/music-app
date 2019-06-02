import React , { Component , Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import './controller.scss';
import Swiper from 'swiper/dist/js/swiper';
import 'swiper/dist/css/swiper.min.css'
import logo from './../../assets/images/bg.jpg';
import { 
    ChangeDurationObj,
    ChangeCurrentTime,
    ChangeLineNoHTML, 
    AudioOnended,
    music_pasue,
    music_play
} from './../../redux/music.redux';
  
var lineNo = 0; //当前行
var C_pos = 5; //C位
var offset = -40; //滚动距离（应等于行高）

class Controller extends Component {
    constructor(props) {
        super(props);
        this.text = React.createRef();
        this.audio = React.createRef();
        this.mask = React.createRef();
        this.avatar = React.createRef();
        this.progressBar = React.createRef();
        this.state = {
            mask: false,
            lineNoHTML: "", // 当前音乐歌词
        }
    }
    
    render() {
        let { songName , singerName , url , picUrl , lyric } = this.props;
        if(this.props.location.pathname === '/login') {
            return null;
        } else {
            return (
                <div className='controller'>
                    <div className='controller-box'>
                        <div 
                            className="avatar"
                            onClick={this.handleMaskShow.bind(this)}
                        >
                            <img src={this.props.picUrl ? this.props.picUrl : logo} alt=""/>
                        </div>
                        <span className="name">{songName ? `${songName} - ${singerName}` : null}</span>
                        <span className="playtime">
                            {this.props.s ? `${this.props.sm}:${this.props.ss} : ${this.props.m}:${this.props.s}` : null}
                        </span>
                        <div className='right-controller'>
                            <i className={this.props.audioPlayState ? 'iconfont iconzanting current' : 'iconfont iconbofang current'} 
                                onClick={this.togglePlayAudio.bind(this)}
                            >
                            </i>
                            <i className='iconfont iconliebiao'></i>
                        </div>
                    </div>
    
                    <Fragment>
                        <div className='controller-mask' ref={this.mask}>
                        <div className='mask-top' >
                                    <i className='iconfont iconico_open' onClick={this.handleMaskHide.bind(this)}></i>
                                    <span>{this.props.songName} - {this.props.singerName}</span>
                                </div>
                                <div className="mask-swiper">
                                    <div className='swiper'>
                                        <div className="mask-swiper-container" style={{width: '100%',height: '100%'}}>
                                            <div className="swiper-wrapper" style={{ position: 'absolute',top: '0',fontSize: '0px'}}>
                                                <div style={{color: '#fff',fontSize: '10px', width: '100%'}}  className="swiper-slide" >
                                                    <div className='avatar' ref={this.avatar} >
                                                        <img src={this.props.picUrl ? this.props.picUrl : logo} alt="...." />
                                                    </div>
                                                    <p className='currentlyric'>{this.props.lineNoHTML}</p>
                                                </div>
    
                                                <div style={{color: '#fff',fontSize: '10px', width: '100%',overflow: 'hidden'}}  className="swiper-slide" >
                                                    <textarea id="lrc_content" style={{display: 'none'}} name="textfield" cols="70" rows="10" defaultValue={this.props.lyric}>
                                                        
                                                    </textarea>
                                                    <ul id="text" className="text" ref={this.text}>
                                                        {this.props.medisArray ? this.props.medisArray .map((item,index) => {
                                                            return <li  key={index}>{item.c}</li>
                                                        }) : null}
                                                    </ul>
                                                </div>
                                                
                                            </div>
                                            <div className='swiper-pagination'></div>
                                        </div>  
                                    </div>       
                                </div>
    
                                <div className='progress'>
                                    <span className='start-time'>{this.props.s ? `${this.props.sm}:${this.props.ss}` : "00:00"}</span>
                                    <div className='progressBar' ref={this.progressBar} id="progressBar">
                                        <div className='bar'></div>
                                        <div className='progress-btn'></div>
                                    
                                    </div>
                                    <span className='end-time'>{this.props.s ? `${this.props.m}:${this.props.s}` : "00:00"}</span>
                                </div>
    
                                <div className='control'>
                                    <div className="control-box">
                                        <i className='iconfont iconshangyishou'></i>
                                        <i 
                                            className={this.props.audioPlayState ? 'iconfont iconzanting current' : 'iconfont iconbofang current'} 
                                            onClick={this.togglePlayAudio.bind(this)}
                                        ></i>
                                        <i className='iconfont iconxiayishou'></i>
                                    </div>
                                </div>
                                <audio id='audio' ref={this.audio} src={this.props.url}></audio>
                            </div>
                        </Fragment>
                </div>
            )
        }
    }

    // 播放音乐
    handlePlayAudio() {
        let audioPlayState = this.props.audioPlayState;
        let audio = this.audio.current;
        let avatar = this.avatar.current;
        setTimeout(() => {
            if(audioPlayState) {
                audio.play();
                avatar.classList.add('play');
                avatar.classList.remove('pause');
            } else {
                audio.pause();
                avatar.classList.add('pause');
            }
        },500)
    }

    // 切换播放状态
    togglePlayAudio() {
        let audio = this.audio.current;
        let audioPlayState = this.props.audioPlayState;
        console.log(audioPlayState);
        // 如果播放状态为true, 就设置为false
        if(audioPlayState) {
            this.props.music_pasue()
            audio.pause();
        } else {
            this.props.music_play()
            audio.play();
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
        if(lis[lineNo]) {
            if(lineNo > 0) { 
                lis[lineNo-1].removeAttribute("class");
            }
            lis[lineNo].className = "lineHigh"; //高亮显示当前行
            this.props.ChangeLineNoHTML(lis[lineNo].innerHTML)
            //文字滚动
            if(lineNo > C_pos) {
                ul.style.transform = "translateY("+(lineNo-C_pos)*offset+"px)"; //整体向上滚动一行高度
            }
        }
    }
    // 切换歌曲时,歌词状态重置
    resetLyric() {
        let lis = this.text.current.children;
        for(let i = 0; i<lis.length;i++) {
            lis[i].className = "";
        }
        lineNo = 0;
    }

    //滚回到开头，用于播放结束时
    goback() {
        let avatar = this.avatar.current;
        avatar.classList.add('pause');
        let progressBar = this.progressBar.current;
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
        
    }

    AudioOperation() {
        let audio = this.audio.current;
        console.log(audio)
        if(!audio) {
            return;
        } else {
            this.resetLyric();
            // audio.load();
            audio.oncanplay = () => {
                // 获取时长
                let duration = audio.duration; 
                let durationObj = this.FormatSongLength(duration)
                setTimeout(() => {
                    this.props.ChangeDurationObj(durationObj);
                }, 0);
            }
            audio.ontimeupdate = () => {
                let medisArray = this.props.medisArray;
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
                if(sm < 10) {
                    sm = "0" + sm;
                } else if (sm > 10) {
                    sm = sm;
                }
                setTimeout(() => {
                    this.props.ChangeCurrentTime({ss,sm});
                }, 0);

                // 自定义播放进度
                let progressBar = this.progressBar.current;
                let bar = progressBar.children[0]
                let progressBtn = progressBar.children[1];
                let time = audio.currentTime / audio.duration;
                bar.style.width = (time * 100) + "%";
                progressBtn.style.left = (time * 100) + "%";
                
                //监听播放器的ended事件，播放结束时回滚歌词
                audio.onended = () => {
                    setTimeout(() => {
                        this.props.AudioOnended()
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
        if(this.props.audioPlayState !== prevProps.audioPlayState) {
            this.SwiperFunc();
            this.AudioOperation();
            this.handlePlayAudio();
        }
    }
    componentWillUnmount() {
        console.log("销毁了");
    }
}

const mapState = (state) => {
	return {
        url: state.music.url,
        picUrl: state.music.picUrl,
        lyric: state.music.lyric,
        medisArray: state.music.medisArray,
        songName: state.music.songName,
        singerName: state.music.singerName,
        lineNoHTML: state.music.lineNoHTML,
        m: state.music.m,
        s: state.music.s,
        ss: state.music.ss, 
        sm: state.music.sm,
        audioPlayState: state.music.audioPlayState
	}
}

const mapDispatch = (dispatch) => {
    return {
        ChangeDurationObj(obj) {
            dispatch(ChangeDurationObj(obj))
        },
        ChangeCurrentTime({ss,sm}) {
            dispatch(ChangeCurrentTime({ss,sm}))
        },
        ChangeLineNoHTML(data) {
            dispatch(ChangeLineNoHTML(data))
        },
        AudioOnended() {
            dispatch(AudioOnended())
        },
        music_play() {
            dispatch(music_play())
        },
        music_pasue() {
            dispatch(music_pasue())
        }
    }
}

export default withRouter(connect(mapState,mapDispatch)(Controller));