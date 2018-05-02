import React from 'react'
// Redux Form
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
// React Flexbox Grid
import { Row, Col } from "react-flexbox-grid";
import ThemeDefault from "../../theme-default";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { MuiThemeProvider, Paper, RaisedButton, Subheader } from "material-ui";
import { ToastContainer } from "react-toastify";
import { WrappedSubheader } from '../../common/components'

const styles = {
	field: {
		width: "100%"
	},
	loginContainer: {
		marginTop: "4rem"
	},
	paper: {
		width: "100%"
	},
	subheader: {
		marginBottom: '-2rem'
	},
	form: {
		padding: '1rem'
	}
};

export default ({handleSubmit}) => (
	<MuiThemeProvider muiTheme={getMuiTheme(ThemeDefault)}>
		<Row center={"xs"} middle={"xs"} style={styles.loginContainer}>
			<Col xs={5}>
				<Paper style={styles.paper}>
					<WrappedSubheader>Registro del tenant</WrappedSubheader>
					<form style={styles.form}>
						<Col xs={12}>
							<Field
								name="name"
								component={TextField}
								floatingLabelText="Nombre del Tenant"
								style={styles.field}
							/>
						</Col>
						<Col xs={12}>
							<Field
								name="subdomain"
								component={TextField}
								floatingLabelText="Subdominio del Tenant"
								style={styles.field}
							/>
						</Col>
						<Subheader style={styles.subheader}>Usuario administrador</Subheader>
						<Col xs={12}>
							<Field
								name="admin.name"
								component={TextField}
								floatingLabelText="Nombre"
								style={styles.field}
							/>
						</Col>
						<Col xs={12}>
							<Field
								name="admin.lastname"
								component={TextField}
								floatingLabelText="Apellido"
								style={styles.field}
							/>
						</Col>
						<Col xs={12}>
							<Field
								name="admin.email"
								component={TextField}
								floatingLabelText="Email"
								style={styles.field}
							/>
						</Col>
						<Col xs={12}>
							<Field
								name="admin.phones[0]"
								component={TextField}
								floatingLabelText="Teléfono"
								style={styles.field}
							/>
						</Col>
						<RaisedButton
							label="Registrar"
							primary={true}
							onClick={() => {handleSubmit()}}
						/>
					</form>
				</Paper>
			</Col>
			<ToastContainer
				type="default"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				pauseOnHover
			/>
		</Row>
	</MuiThemeProvider>
);