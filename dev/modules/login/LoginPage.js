import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { graphql } from 'react-apollo'
//import Authenticate from '../../graphQL/mutations/authenticate.graphql'
import { login } from '../../common/utils/Authenticate'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import Help from 'material-ui/svg-icons/action/help'
import TextField from 'material-ui/TextField'
import {Link} from 'react-router'
import ThemeDefault from '../../theme-default'
import FontIcon from 'material-ui/FontIcon'
import { LoginStyles as styles } from '../../theme-default'

@connect(null, { push })
@graphql(Authenticate)
class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    loading: false
  }

  handleChange = e =>  this.setState({[e.target.name]: e.target.value});

  login = () => {
    this.setState({ loading: true });
    let { loading, ...datos } = this.state;
    this.props.mutate({
      variables: { user: { tipo: "admin", ...datos } }
    }).then( ({data}) => {
      let user = data.authenticate;
      login(user);
      this.props.push("/");
      toast.success(`Bienvenido ${user.admin.nombre} ${user.admin.apellido}`);
    }).catch( ({ graphQLErrors : [{ message }] }) => { 
      toast.error(message);
      this.setState({ loading: false });
    })
  }

  render = () => {
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>

            <Paper style={styles.paper}>

              <form>
                <TextField
                  hintText="E-mail"
                  floatingLabelText="E-mail"
                  fullWidth={true}
                  value={this.state.email}
                  name="email"
                  onChange={this.handleChange}
                />
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  fullWidth={true}
                  type="password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                />

                <div>
                  <Checkbox
                    label="Remember me"
                    style={styles.checkRemember.style}
                    labelStyle={styles.checkRemember.labelStyle}
                    iconStyle={styles.checkRemember.iconStyle}
                  />

                  <RaisedButton
                      disabled={this.state.loading} 
                      label="Login"
                      primary={true}
                      style={styles.loginBtn}
                      onClick={this.login}
                      />
                  
                </div>
              </form>
            </Paper>

            <div style={styles.buttonsDiv}>
              <FlatButton
                label="Register"
                href="/"
                style={styles.flatButton}
                icon={<PersonAdd />}
              />

              <FlatButton
                label="Forgot Password?"
                href="/"
                style={styles.flatButton}
                icon={<Help />}
              />
            </div>
            {/*<div style={styles.buttonsDiv}>
              <Link to="/" style={{...styles.btn, ...styles.btnFacebook}}>
                <i className="fa fa-facebook fa-lg"/>
                <span style={styles.btnSpan}>Log in with Facebook</span>
              </Link>
              <Link to="/" style={{...styles.btn, ...styles.btnGoogle}}>
                <i className="fa fa-google-plus fa-lg"/>
                <span style={styles.btnSpan}>Log in with Google</span>
              </Link>
            </div>*/}
          </div>
          <ToastContainer 
              type="default"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default LoginPage;
