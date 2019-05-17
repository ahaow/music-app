import React from 'react';
import axios from 'axios';

import TopBar from './../../components/topbar';
import Drawer from './../../components/drawer/drawer';
import './hotsong.scss';
import { changeSongName } from './../../assets/utils/util';
import { api } from './../../assets/api/index'


export default class HotSong extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            HotSongData: []
        }
        let D = new Date();
        this.month = D.getMonth() + 1;
        this.month < 10 ?  this.month = "0" +  this.month : this.month = this.month;
        this.date = D.getDate();
    }
    render() {
        return (
            <div className='hotsong'>
                <Drawer />
                <TopBar />
                <div className="hotsong-logo">
                    <div className='hoticon'></div>
                    <div className="hottime">
                        更新时间: {this.month}月{this.date}日
                    </div>
                </div>
                <div className="hot-list">
                    <ul>
                        {this.state.HotSongData.map((item,index) => {
                            return (
                                <li key={item.id}>
                                    <div 
                                        className={(index+1) < 4 ? "left-icon current" : "left-icon"}
                                    >
                                        { index < 10 ? index = "0" + (index + 1) : index = (index + 1) }
                                    </div>
                                    <div className="left-news">
                                        <p className='song-name'>{item.name}</p>
                                        <p className='song-info'>
                                            <span>{changeSongName(item.ar)}</span>
                                            --&nbsp;
                                            <span>{item.al.name}</span>
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
            </div>
        )
    }

    changeSongName(nameArr) {
        console.log(nameArr);
        let str = "";
        let a = ' / ';
        if(nameArr.length > 0) {
            for(let i = 0; i < nameArr.length; i++) {
                str += nameArr[i].name + a;
                
            }
        }
        str = str.substring(0,str.length-3)
        return str;        
    }

    getHotSongData() {
        axios.get(api.Hotsong).then(res => {
            if(res.status === 200 && res.data.code === 200) {
                let HotSongData = res.data.playlist.tracks.slice(0,20);
                console.log(HotSongData);
                this.setState({
                    HotSongData
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getHotSongData();
    }
    
}