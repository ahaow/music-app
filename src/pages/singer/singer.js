import React from 'react';
import axios from 'axios';
import TopBar from './../../components/topbar';
import Drawer from './../../components/drawer/drawer';
import './singer.scss';


export default class Singer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singers: []
        }


    }

    render() {
        return (
            <div className="singer">
                <Drawer />
                <TopBar />
                <div className="singer-list">
                    <ul>
                        {
                            this.state.singers.map(item => {
                                return (
                                    <li key={item.id}>
                                        <div className='avatar'>
                                            <img src={item.img1v1Url} alt=""/>
                                        </div>
                                        <span className='singer-name'>{item.name}</span>
                                        <span className='singer-detail'><i className='iconfont iconjiantouarrow487'></i></span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                
                </div>
            
            </div>
        )
    }
    getSingerData() {
        axios.get('http://localhost:4000/top/artists').then(res => {
            if(res.status === 200 & res.data.code === 200) {
                console.log(res.data.artists)
                this.setState({
                    singers: res.data.artists
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
    componentDidMount() {
       this.getSingerData();
    }


}