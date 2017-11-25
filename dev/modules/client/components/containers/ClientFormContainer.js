import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import Form from '../presentationals/single/Form'
import GetOrganizationsNames from '../../graphql/querys/organizationsNames.graphql'
import GetClient from '../../graphql/querys/client.graphql'

const initialState = {
    name: "",
    lastname: "",
    phones: "",
    email: "",
    face_base64: null,
    avatar_filename: "Seleccione una imagen ...",
    address: "",
    organization_id: null,
    about: "",
    organization: null
}

@withApollo
class FormContainer extends Component {
	constructor(props){
		super(props);
		console.log("FormContainer", props);
	}

    state = initialState;

    componentWillMount = async () => {
        if (this.props.edit) { //si es el formulario en edicion
            var client = await this.props.client.query({
                query: GetClient,
                fetchPolicy: 'network-only',
                variables: { id: this.props.edit }
            }).then(response => {
                let { __typename, ...client } = response.data.client;
                return client;
            });
            this.setState({
                ...client,
                phones: client.phones.join(', ')
            });
        }
    };

    cleanAndBack = () => {
    	this.setState(initialState);
    	this.props.goBack();
    };

    send = event => {
        event.preventDefault();
        let client = this.state;
        client.phones = client.phones.replace(/\s/g, '').split(',');
        client.organization_id = client.organization.id;
        delete client.organization;
        delete client.avatar_filename;
        this.props.submit({ ...client, id: this.props.edit })
            .then(response => {
                if (this.props.edit) this.props.openAlert("Cliente actualizado con exito!");
                else this.props.openAlert("Cliente guardado con exito!");
                this.cleanAndBack();

            })
    };

    cancel = event => {
    	event.preventDefault();
    	this.cleanAndBack();
    };

    searchOrganizations = (search_text) => (
        this.props.client.query({
            query: GetOrganizationsNames,
            variables: { search_text }
        })
        .then(({ data: { organizations } }) => ({ options: organizations.nodes }))
    );

    changeImage = ({ target: { files: [file] } }) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => this.setState({ face_base64: reader.result, avatar_filename: file.name });
    };

    handleChange = e => this.setState({
        [e.target.name]: e.target.value 
    });

    handleSelectChange = select_name => (e, i, value) => this.setState({
        [select_name]: value 
    });

    handleReactSelectChange = (name) => (selectValue) => this.setState({
        [name]: selectValue 
    });

    render = () => (
    	<Form 
    		{...this.state}
        	handleChange={this.handleChange}
          	handleSelectChange={this.handleSelectChange}
          	handleReactSelectChange={this.handleReactSelectChange}
          	changeImage={this.changeImage}
          	searchOrganizations={this.searchOrganizations}
          	send={this.send}
          	cancel={this.cancel}
        />
    )
}

export default FormContainer