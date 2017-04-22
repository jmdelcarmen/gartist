import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  onSignUp = e => {
    e.preventDefault();
    this.props.signUpUser(this.state);
  }
  editEmail = () => this.setState({ email: this.email.value });
  editPassword = () => this.setState({ password: this.password.value });
  render() {
    console.log(this.state);
    return (
      <div className="signup">
        <h1>Create a New Account</h1>
        <form autoComplete="off" onSubmit={this.onSignUp}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              onChange={this.editEmail}
              ref={input => this.email = input}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={this.editPassword}
              ref={password => this.password = password}/>
          </div>
          <button>Create Account</button>
        </form>
      </div>
    );
  }
}

export default connect(null, actions)(SignUp);
