import React from 'react'
import {
	Paper,
	Step,
	Stepper,
    StepLabel,
    FlatButton,
    RaisedButton
} from 'material-ui'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import { Row, Col } from 'react-flexbox-grid'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

import { Loading, WrappedSubheader } from '../../../../common/components'

class HorizontalTransition extends React.Component {

  state = {
    loading: false,
    finished: false,
    stepIndex: 0,
  };

  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if(stepIndex === 3) {
    	this.props.handleSubmit();
    	this.props.reset();
    }
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 3,
      }));
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
   		case 0 : return(
   			<div>
	   			<p>
	   				Con La finalidad de recibir tickets via Email, apertura un nuevo correo electronico Gmail,
	   				o dedica (selecciona) uno existente, al servicio de tu plataforma de tickets de soporte.
	   			</p>
	   			<strong>Asegurate de que este correo electronico, se utiliza solo con esta finalidad.</strong>
   			</div>
   		)
      case 1:
        return (
          <ul>
        	<li>
        		En la computadora, abre <a target="_blank" href="https://mail.google.com/">Gmail</a>.
        	</li>
        	<li>
        		En la esquina superior derecha, haz clic en Configuración.
			</li>
			<li>
        		Haz clic en Configuración.
			</li>
			<li>
        		Haz clic en la pestaña Reenvío y correo POP/IMAP.
			</li>
			<li>
        		En la sección "Acceso IMAP", haz clic en Habilitar IMAP.
			</li>
			<li>
        		Haz clic en Guardar cambios.
			</li>
        </ul>
        );
      case 2:
        return (
          <Row center="xs">
            <Col xs={4}>
	            <Field 
					name="email" 
					type="email"
					component={TextField} 
					hintText="Email"
					floatingLabelText="Email"
					style={{width: "100%"}}
				/>
				<Field 
					name="password" 
					type="password"
					component={TextField} 
					hintText="Contraseña"
					floatingLabelText="Contraseña"
					style={{width: "100%"}}
				/>
				<Field 
					name="password_confirm" 
					type="password"
					component={TextField} 
					hintText="Repetir Contraseña"
					floatingLabelText="Repetir Contraseña"
					style={{width: "100%"}}
				/>
			</Col>
          </Row>
        );
      case 3:
        return (
          <p>
            Al finalizar, todos los correos recibidos en el email indicado, seran convertidos en 
            Tickets, cuyo titulo hara referencia al subject del correo, y el cliente correspondera
            al emisor del correo.
          </p>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
          	<a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click aqui
            </a> para reconfigurar.
          </p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Atras"
            secondary
            disabled={stepIndex === 0}
            onClick={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 3 ? 'Finalizar' : 'Siguiente'}
            primary
            onClick={this.handleNext}
          />
        </div>
      </div>
    );
  }

  render() {
  	const { data } = this.props;
  	if(data.loading) return <Loading/>;

    const {loading, stepIndex} = this.state;

    return (
      <Paper style={{width: '80%', margin: 'auto'}}>
      	<WrappedSubheader>
			{ do {
				if(data.emailSupport) `Email actual: ${data.emailSupport}`;
				else "Email Support Inactivo";
			}}
		</WrappedSubheader>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Crea o Dedica un Correo</StepLabel>
          </Step>
          <Step>
            <StepLabel>Configura tu Correo</StepLabel>
          </Step>
          <Step>
            <StepLabel>Indicanos las Credenciales</StepLabel>
          </Step>
          <Step>
            <StepLabel>Recibe Tickets Via Email</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </Paper>
    );
  }
}

export default HorizontalTransition;
