import React from 'react';
import { connect } from 'react-redux';
import TopBar from './../../components/topbar';
import Drawer from './../../components/drawer/drawer';
import './search.scss';
import { api } from './../../assets/api/index';
import axios from 'axios';
import { getMusicAll , music_play , music_reset } from './../../redux/music.redux';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labelText: "搜索歌曲、歌手、专辑",
            inputVal: "",
            searchList: []
        }
    }

    render() {
        return (
            <div className='search'>
                <Drawer></Drawer>
                <TopBar></TopBar>
                <div className='search-ipt'>
                    <i className='iconfont iconsousuo'></i>
                    <input type="text" name="search" onChange={this.handleChange.bind(this)} value={this.state.inputVal} />
                    <label htmlFor="">{this.state.labelText}</label>
                    <button className='search-btn' onClick={this.handleSearch.bind(this)}>搜索</button>
                </div>
                {
                    this.state.searchList.length > 0 ?
                    <div className='search-list'>
                        <ul>
                            {this.state.searchList.map(item => {
                                return (
                                    <li key={item.id}>
                                        <div className='left-info'>
                                            <p className='song-name'>{item.name}</p>
                                            <p className='song-info'>{item.album.name} - {item.artists[0].name}</p>
                                        </div>
                                        <div className='right'
                                            onClick={this.handleMusicPlay.bind(this,item.id)}
                                        ><i className='iconfont iconshipinbo'></i></div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div> : null
                }
                
            </div>
        )
    } 
    handleChange(e) {
        console.log(e.target.value)
        this.setState({
            inputVal: e.target.value
        })
        setTimeout(() => {
            if(this.state.inputVal !== "") {
                this.setState({
                    labelText: ""
                })
            } else {
                this.setState({
                    labelText: "搜索歌曲、歌手、专辑"
                })
            }
        }, 0);
    }
    handleSearch() {
        let inputVal = this.state.inputVal;
        axios.get(`${api.Search}?keywords=${inputVal}`).then(res => {
            console.log(res)
            if(res.status === 200 && res.data.code === 200) {
                this.setState({
                    searchList: res.data.result.songs
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    handleMusicPlay(id) {
        this.props.music_reset();
        setTimeout(() => {
            this.props.getMusicAll(id);
            this.props.music_play();
        }, 300);
    }

    componentDidMount() {
        
    }
}

const mapDispatch = (dispatch) => {
    return {
        getMusicAll(id) {
            dispatch(getMusicAll(id))
        },
        music_play() {
            dispatch(music_play())
        },
        music_reset() {
            dispatch(music_reset())
        }
    }
}

export default connect(null,mapDispatch)(Search)