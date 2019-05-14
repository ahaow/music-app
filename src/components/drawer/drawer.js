import React , { Component , Fragment } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { change_drawer_hide } from './../../redux/drawer.redux';
import './drawer.scss';

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.drawerDom = React.createRef();
    }
    render() {
        return (
            <Fragment>
                <CSSTransition
                    in={this.props.drawer}
                    timeout={300}
                    classNames='alert'
                    unmountOnExit
                    onEntered={(el) => {

                    }}
                >
                    <div className='drawer' ref={this.drawerDom}>
                        <div className="drawer-box">
                            <div className='drawer-top'>
                                <div className="avatar">
                                    <img src={this.props.avatarUrl} alt=""/>
                                </div>
                                <div className='userinfo'>
                                    <span className='username'>{this.props.nickname}</span>
                                    <span className='userlevel'>Lv.1</span>
                                    <button className='signIn'>签到</button>
                                </div>
                            </div>
                        
                        
                        
                        
                        </div>
                        <div className='mask' onClick={this.handleDrawer.bind(this)}></div>
                    </div>
                </CSSTransition>
            </Fragment>
        )
    }
    handleDrawer() {
        this.props.DrawerHide();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.drawer) {
            this.drawerDom.current.style.minHeight = (window.screen.height) + "px";
            document.documentElement.style.height = (window.screen.height) + "px";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "auto";
        }
        

    }
    
}

const mapState = (state) => {
    return {
        drawer: state.drawer.drawer,
        avatarUrl: state.user.avatarUrl,
        nickname: state.user.nickname
    }
}

const mapDispatch = (dispatch) => {
    return {
        DrawerHide() {
            dispatch(change_drawer_hide())
        }
    }
}

export default connect(mapState,mapDispatch)(Drawer);