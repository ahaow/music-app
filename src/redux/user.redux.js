import axios from 'axios';
import { host } from './../assets/utils/util';

// actionTypes
const USER_ADD = 'USER_ADD';
const USER_LOGIN = 'USER_LOGIN';
const USER_LOGIN_STATUS = 'USER_LOGIN_STATUS';

// actionCreators
export const add = () => {
    return {
        type: USER_ADD
    }
}

// 登录
export const UserLoginAction = (data) => {
    return {
        type: USER_LOGIN,
        payload: data
    }
}
export const UserLogin = ({phone,pwd}) => {
    return (dispatch) => {
        axios.get(`${host}/login/cellphone?phone=${phone}&password=${pwd}`).then(res => {
            console.log(res)
            // 登录成功
            if(res.data.code === 200) {
                dispatch(UserLoginAction(res.data))
            } else if (res.data.code === 502) { // 登录失败
                console.log('登录失败')
            }
        }).catch(err => {
            console.log(err);
        })
    }
}


// 登录状态
export const UserLoginStatusAction = (data) => {
    return {
        type: USER_LOGIN_STATUS,
        payload: data
    }
}

export const UserLoginStatus = () => {
    return (dispatch) => {
        axios.get(`${host}/login/status`).then(res => {
            console.log(res);
            // 登录成功
            if(res.data.code === 200) {
                dispatch(UserLoginStatusAction(res.data))
            } 
        }).catch(err => {
            console.log(err);
        })
    }
}


// reducers
const defalutState = {
    name: 'hanzo',
    num: 0,
    redirectTo: '',
    loginType: null, // 登录状态
    userId: null, // 用户唯一Id
    nickname: "", // 用户昵称
    avatarUrl: "", // 用户头像,
}

export const user = (state = defalutState,action) => {
    if(action.type === USER_LOGIN) {
        console.log(action);
        return {
            ...state,
            ...action.payload,
            loginType: action.payload.loginType,
            userId: action.payload.profile.userId,
            nickname: action.payload.profile.nickname,
            avatarUrl: action.payload.profile.avatarUrl,
            redirectTo: '/index'
        }
    }
    if(action.type === USER_LOGIN_STATUS) {
        return {
            ...state,
            ...action.payload,
            loginType:action.payload.code,
            userId: action.payload.profile.userId,
            nickname: action.payload.profile.nickname,
            avatarUrl: action.payload.profile.avatarUrl,
        }
    }
    return state;
}