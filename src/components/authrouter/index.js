import React from 'react';
import { connect } from 'react-redux';
import { UserLoginStatus } from './../../redux/user.redux';

class AuthRouter extends React.Component {
    render() {
        return null;
    }
    componentDidMount() {
        this.props.UserLoginStatus();
    }
}

const mapDispatch = (dispatch) => {
    return {
        UserLoginStatus() {
            dispatch(UserLoginStatus())
        }
    }
}

export default connect(null,mapDispatch)(AuthRouter);