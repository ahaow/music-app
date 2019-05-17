import React , { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'; 
import { change_drawer_show } from './../../redux/drawer.redux';
import './index.scss'

class TopBar extends Component {
    render() {
        return (
            <div className='topbar'>
                <div 
                    className="topbar-left"
                    onClick={this.handleDrawer.bind(this)}
                ><i className='iconfont icongengduo'></i></div>      
                <div className="topbar-center">
                    <ul>
                        <li><NavLink activeClassName="selected" to='/index'>推荐榜</NavLink></li>
                        <li><NavLink activeClassName="selected" to='/hotsong'>热歌榜</NavLink></li>
                        <li><NavLink activeClassName="selected" to='/singer'>歌手榜</NavLink></li>
                        <li><NavLink activeClassName="selected" to='/search'>搜索</NavLink></li>
                        {/** <li><NavLink activeClassName="selected" to='/video'>视频</NavLink></li> */}
                    </ul>
                </div>      
                {/** <div className="topbar-right"><i className='iconfont iconsousuo'></i></div>      */} 
            </div>
        )
    }
    handleDrawer() {
        this.props.DrawerShow();
    }
}

const mapDispatch = (dispatch) => {
    return {
        DrawerShow() {
            dispatch(change_drawer_show())
        }
    }
}



export default connect(null,mapDispatch)(TopBar);