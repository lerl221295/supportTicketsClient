import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './Header'
import LeftDrawer from './LeftDrawer'
import withWidth, { LARGE, SMALL } from 'material-ui/utils/withWidth'
import ThemeDefault from '../theme-default';

import TimeLine from 'material-ui/svg-icons/action/timeline'
import Llave from 'material-ui/svg-icons/action/build'
import PermIdentity from 'material-ui/svg-icons/action/perm-identity'
import Ticket from 'material-ui/svg-icons/notification/confirmation-number'

import { getUser } from '../Authenticate'
import { ToastContainer } from 'react-toastify'

const menu = [
    { text: 'TimeLine', icon: <TimeLine/>, link: '/' },
    { text: 'Tickets', icon: <Ticket/>, link: '/tickets' },
    { text: 'Tecnicos', icon: <Llave/>, link: '/tecnicos' },
    { text: 'Clientes', icon: <PermIdentity/>, link: '/clientes' }
]

@connect(null, { push })
class App extends Component {
	constructor(props) {
        super(props);
        this.state = {
            navDrawerOpen: true
        };
    }

    componentWillMount = () => {
        /*validar que el usuario este autenticado*/
        if(!getUser()) this.props.push("login");
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.width !== nextProps.width) {
            this.setState({ navDrawerOpen: nextProps.width === LARGE });
        }
    }

    handleChangeRequestNavDrawer() {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen
        });
    }

    render() {
        let { navDrawerOpen } = this.state;
        const paddingLeftDrawerOpen = 236;

        const styles = {
            header: {
                paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
            },
            container: {
                margin: '80px 20px 20px 15px',
                paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
            }
        };

	    return (
	      <MuiThemeProvider muiTheme={ThemeDefault}>
	        <div>
                <Header styles={styles.header}
	                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>


	            
                <LeftDrawer navDrawerOpen={navDrawerOpen}
	                        menus={menu}
	                        username="User Admin"/>

	            <div style={styles.container}>
                    <ToastContainer 
                        position="bottom-center"
                        type="default"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        pauseOnHover
                    />
	                {this.props.children}
	            </div>
	        </div>
	      </MuiThemeProvider>
	    );
	}
}

App.propTypes = {
    children: PropTypes.element,
    width: PropTypes.number
};

export default withWidth()(App);