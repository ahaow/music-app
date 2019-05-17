import React from 'react';
import axios from 'axios';
import { GetRequ } from './../../assets/utils/util';
import './singerdetail.scss';

export default class SingerDetail extends React.Component {
    constructor(props) {
        super(props);
        this.avatarRef = React.createRef();
        this.tabRef = React.createRef();
        this.state = {
            tabStatus: 1,
            picUrl: "",
            name: "",
            briefDesc: "",
            hotSongs: []
        }
    }
    
    render() {
        return (
            <div className='singer-detail'>
                <div className='avatar' ref={this.avatarRef}>
                    <div 
                        className='goback' 
                        onClick={this.goBack.bind(this)}
                    >
                        <i className='iconfont iconfanhui'></i>
                    </div>
                    <img className="avatarImg" src={this.state.picUrl} alt=""/>
                    <p className='singer-name'>{this.state.name}</p>
                </div>
                <div className='tab' ref={this.tabRef}>
                    <div className='tab-item'><span onClick={this.handleChangeTabOne.bind(this)} className={this.state.tabStatus === 1 ? "active" : ""}>歌曲</span></div>
                    <div className='tab-item'><span onClick={this.handleChangeTabTwo.bind(this)} className={this.state.tabStatus === 2 ? "active" : ""}>详情</span></div>
                </div>
                {
                    this.state.tabStatus === 1 ? 
                    <div className='song-list'>
                        <ul>
                            {
                                this.state.hotSongs.map((item,index) => {
                                    return (
                                        <li key={index}>
                                            <div className='left-info'>
                                                <p className='song-name'>{item.name}</p>
                                                <p className='song-info'>{item.ar[0].name} - {item.al.name}</p>
                                            </div>
                                            <div className='right'><i className='iconfont iconshipinbo'></i></div>
                                        </li>
                                    )
                                })
                            }
                            
                        </ul>
                    </div> : null
                }
                {
                    this.state.tabStatus === 2 ? 
                    
                    <div className='singer-info'>
                        <h3>歌手资料</h3>
                        <p>{this.state.briefDesc}</p>
                    
                    </div> : null
                }
            
            </div>
        )
    }
    handleChangeTabOne() {
        this.setState({
            tabStatus: 1
        })
    }
    handleChangeTabTwo() {
        this.setState({
            tabStatus: 2
        })
    }
    goBack() {
        this.props.history.goBack();
    }
    getSingerDetailData(id) {
        axios.get(`http://localhost:4000/artists?id=${id}`).then(res => {
            console.log(res);
            console.log(res.data.hotSongs);
            this.setState({
                name: res.data.artist.name,
                briefDesc: res.data.artist.briefDesc,
                picUrl: res.data.artist.picUrl,
                hotSongs: res.data.hotSongs
            })
        }).catch(err => {
            console.log(err);
        })
    }
    scrollOn(height,tab) {
        if(document.documentElement.scrollTop >= height) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    }    

    componentDidMount() {
        let id = GetRequ(this.props.location.search).id;
        this.getSingerDetailData(id);
        let avatarHeight = this.avatarRef.current.offsetHeight;
        let tab = this.tabRef.current;
        window.addEventListener('scroll',() => {
            this.scrollOn(avatarHeight,tab)
        })
    }
    componentWillUnmount() {
        window.removeEventListener("scroll",() => {
            this.scrollOn()
        })
    }
}
