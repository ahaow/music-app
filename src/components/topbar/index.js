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
                        <li><NavLink activeClassName="selected" to='/index'>我的</NavLink></li>
                        <li><NavLink activeClassName="selected" to='/login'>发现</NavLink></li>
                        <li><NavLink activeClassName="selected" to='/friend'>朋友</NavLink></li>
                        <li><NavLink activeClassName="selected" to='/video'>视频</NavLink></li>
                    </ul>
                </div>      
                <div className="topbar-right"><i className='iconfont iconsousuo'></i></div>      
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