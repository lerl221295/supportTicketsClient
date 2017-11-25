import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import Form from '../presentationals/organizations/Form'
import GetOrganization from '../../graphql/querys/organization.graphql'

const initialState = {
    name: "",
    about: "",
    domains: ""
}

@withApollo
class FormContainer extends Component {
    state = initialState;

    componentWillMount = async() => {
        if (this.props.edit) { //si es el formulario en edicion
            var organization = await this.props.client.query({
                query: GetOrganization,
                fetchPolicy: 'network-only',
                variables: { id: this.props.edit }
            }).then(response => {
                let { __typename, ...organization } = response.data.organization;
                return organization;
            });
            this.setState({
                ...organization,
                domains: organization.domains.join(', ')
            });
        }
    };

    cleanAndBack = () => {
        this.setState(initialState);
        this.props.goBack();
    };

    send = event => {
        event.preventDefault();
        let organization = this.state;
        organization.domains = organization.domains.replace(/\s/g, '').split(',');
        this.props.submit({ ...organization, id: this.props.edit })
            .then(response => {
                if (this.props.edit) this.props.openAlert("Organizacion actualizada con exito!");
                else this.props.openAlert("Organizacion guardada con exito!");
                this.cleanAndBack();
            })
    };

    cancel = event => {
        event.preventDefault();
        this.cleanAndBack();
    };

    handleChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    render = () => ( 
        <Form
            {...this.state}
            handleChange={this.handleChange}
            send={this.send}
            cancel={this.cancel}
        />
    )
}

export default FormContainer