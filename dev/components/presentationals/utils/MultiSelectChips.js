import React, { Component } from 'react'
import SuperSelectField from 'material-ui-superselectfield'
import Chip from 'material-ui/Chip/Chip'
import FontIcon from 'material-ui/FontIcon/FontIcon'
import Avatar from 'material-ui/Avatar/Avatar'

const chipAvatarStyle = {
    width: '100%',
    height: '100%',
    margin: 0,
    borderRadius: '50%',
    backgroundSize: 'cover'
};
class Select extends Component {
    // noinspection JSAnnotator
    state = {
        optionsSelected : []
    };

    onRequestDelete = (key) => event => {
        this.setState({ optionsSelected: this.state.optionsSelected.filter((v, i) => i !== key) })
    };
    handleCustomDisplaySelections = values => {
        //console.log(values)
        return(
            do {
                if(values.length)
                    {<div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {values.map(({ label, value }, index) =>
                            <Chip key={index} style={{ margin: 5 }} onRequestDelete={this.onRequestDelete(index)}>
                                {label}
                            </Chip>
                        )}
                    </div>}
                else
                    {<div style={{ minHeight: 42, lineHeight: '42px' }}>Select some values</div>}
            }
        )

    };
    render = () => {
        return(
            <SuperSelectField
                {...this.props}
                multiple
                hintTextAutocomplete={'Escribe algo'}
                style={{ width: 300, marginTop: 20, marginRight: 40 }}
                selectionsRenderer={this.handleCustomDisplaySelections}
                onChange={(values) => this.setState({optionsSelected: values}) }
                value={this.state.optionsSelected}
                showAutocompleteThreshold={0}
                //onAutoCompleteTyping={this.handleAutoCompleteTyping}
                //name='state31'
                //floatingLabel='floatingLabelText state31'
                //hintText='Complex example'
                //
            >
                {
                    this.props.options.map((option, i) => (
                        <div key={i} value={option.value} label={option.label}>
                            {option.label}
                        </div>
                    ))
                }
            </SuperSelectField>
        )
    }
}

export default Select