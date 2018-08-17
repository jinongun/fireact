import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import LoginPane from 'components/Authentication/LoginPane'
import Button from 'components/Authentication/Button';
import fireact from 'assets/images/fireact.png';

import * as actions from 'store/modules/login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Auth extends Component {
  renderRedirect = () => {
    if (this.props.isLogin) {
      return <Redirect to='/' />
    }
  }
  render() {
    console.log(this.props);
    const { isLogin } = this.props;
    return (
      <Fragment>
        {this.renderRedirect()}
        <p>Welcome to Fireact</p>
        <img src={fireact} width="100" style={{ marginBottom: '64px' }} />
        <Button onClick={this.props.Actions.googleLogin} />
      </Fragment>
    )
  }
}

export default connect(
  (state) => ({
    isLogin: state.login.get('isLogin'),
    user: state.login.get('user'),
  }),
  (dispatch) => ({
    Actions: bindActionCreators(actions, dispatch)
  })
)(Auth);