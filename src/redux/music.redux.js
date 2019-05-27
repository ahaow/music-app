import axios from 'axios';
import { api } from './../assets/api/index';
import { FormatLyric } from './../assets/utils/util';

// actionTypes
const MUSIC_PLAY_DATA = "MUSIC_PLAY_DATA";
const MUSIC_PLAY = "MUSIC_PLAY"; // 播放
const MUSIC_RESET = "MUSIC_RESET"; // 播放
const MUSIC_DURATION= "MUSIC_DURATION"; // 播放总时长
const MUSIC_CURRENT = "MUSIC_CURRENT"; // 获取播放时间
const MUSIC_ONENDED = "MUSIC_ONENDED"; // 播放结束状态
const MUSIC_LINENO_HTML = "MUSIC_LINENO_HTML"; // 获取歌曲当前播放对应文字
// actionCreators


// 播放
export const music_play = () => {
    return {
        type: MUSIC_PLAY,
    }
}

// 重置播放
export const music_reset = () => {
    return {
        type: MUSIC_RESET,
    }
}


// 获取总时长
export const ChangeDurationObj = (obj) => {
    return {
        type: MUSIC_DURATION,
        obj
    }
}

// 获取播放时间
export const ChangeCurrentTime = ({ss,sm}) => {
    return {
        type: MUSIC_CURRENT,
        obj: {
            ss,
            sm
        }
    }
}

// 获取歌曲当前播放对应文字
export const ChangeLineNoHTML = (data) => {
    return {
        type: MUSIC_LINENO_HTML,
        data
    }
}

// 歌曲播放结束状态
export const AudioOnended = () => {
    return {
        type: MUSIC_ONENDED
    }
}


// 获取歌曲信息
export const music_play_data = (data) => {
    return {
        type: MUSIC_PLAY_DATA,
        data
    }
}

// 获取音乐url
const getMusicUrl = (id) => {
    return axios.get(`${api.MusicUrl}?id=${id}`)
}
// 获取歌曲详情 
const getMusicDetail = (id) => {
    return axios.get(`${api.Detail}?ids=${id}`)
}
// 获取歌词
const getMusicLyric = (id) => {
    return axios.get(`${api.Lyric}?id=${id}`)
}

export const getMusicAll = (id) => {
    return (dispatch) => {
        axios.all([getMusicUrl(id),getMusicDetail(id),getMusicLyric(id)])
        .then(axios.spread((url,detail,lyric) => {
            console.log(detail)
            if(url.status === 200 && url.data.code === 200) {
                let _url = url.data.data[0].url;
                let _picUrl = detail.data.songs[0].al.picUrl;
                let _lyric = lyric.data.lrc.lyric;
                let _songName = detail.data.songs[0].name;
                let _singerName = detail.data.songs[0].ar[0].name;
                let medisArray = FormatLyric(_lyric)
                dispatch(music_play_data({_url,_picUrl,_lyric,medisArray,_songName,_singerName}));
            }
        }))
    }
}


// reducers
const defalutState = {
    mask: false,  // 遮罩层显示隐藏
    songName: "", // 歌名
    singerName: "", // 歌手名
    lineNoHTML: "", // 当前音乐歌词
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

export const music = (state = defalutState,action) => {
    if(action.type === MUSIC_PLAY_DATA) {
        return {
            ...state,
            songName: action.data._songName, 
            singerName: action.data._singerName, 
            url: action.data._url,
            picUrl: action.data._picUrl,
            lyric: action.data._lyric,
            medisArray: action.data.medisArray
        }
    }
    if(action.type === MUSIC_PLAY) {
        return {
            ...state,
            audioPlayState: true
        }
    }
    if(action.type === MUSIC_RESET) {
        return {
            ...state,
            audioPlayState: false
        }
    }
    if(action.type === MUSIC_DURATION) {
        return {
            ...state,
            m: action.obj.m,
            s: action.obj.s,
        }
    }
    if(action.type === MUSIC_CURRENT) {
        return {
            ...state,
            sm: action.obj.sm,
            ss: action.obj.ss,
        }
    }
    if(action.type === MUSIC_LINENO_HTML) {
        return {
            ...state,
            lineNoHTML: action.data
        }
    }
    if(action.type === MUSIC_ONENDED) {
        return {
            ...state,
            ss: "00",
            sm: "00",
            audioPlayState: false,
            lineNoHTML: ""
        }
    }
    return state;
}