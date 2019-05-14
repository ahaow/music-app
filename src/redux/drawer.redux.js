// actionTypes
const DRAWER_SHOW = 'DRAWER_SHOW';
const DRAWER_HIDE = 'DRAWER_HIDE';

// actionCreators

// 显示抽屉
export const change_drawer_show = () => {
    return {
        type: DRAWER_SHOW
    }
}

// 隐藏抽屉
export const change_drawer_hide = () => {
    return {
        type: DRAWER_HIDE
    }
}

// reducers

const defalutState = {
    drawer: false,
}

export const drawer = (state = defalutState,action) => {
    if(action.type === DRAWER_SHOW) {
        console.log(action)
        return {
            ...state,
            drawer: true
        }
    }
    if(action.type === DRAWER_HIDE) {
        console.log(action)
        return {
            ...state,
            drawer: false
        }
    }
    return state;
}
