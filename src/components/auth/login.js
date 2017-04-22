import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  componentWillMount() {
    this.props.auth.error ? this.setState({
      error: this.props.auth.error
    }) : ''
  }
  onLogin = (e) => {
    e.preventDefault();
    const user = {
      email: this.refs.email.value,
      password: this.refs.password.value
    };
    this.props.loginUser(user);
  }
  renderLoginError = () => (this.props.auth.error ? `* ${this.props.auth.error}` : '');
  render() {
    return (
      <div>
        <form onSubmit={this.onLogin}>
          <div className="form-group">
            <label>Email</label>
            <input ref="email" type="text" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref="password" type="password" />
          </div>
          <button>Log In</button>
        </form>
        <small className="login-error">
          {this.renderLoginError()}
        </small>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, actions)(Login);
