import React from 'react'
import {
	Toolbar,
	ToolbarGroup,
	ToolbarSeparator,
	ToolbarTitle,
	RaisedButton,
	IconButton,
	MenuItem,
	IconMenu,
	Toggle
} from 'material-ui'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import Theme from '../../../../../theme-default'

export default ({showActivities, toggleActivities}) => (
	<Toolbar style={{marginLeft: "0.6rem", paddingRight: "5rem"}}>
        <ToolbarGroup firstChild/>
        <ToolbarGroup lastChild>
          	<Toggle 
              label="Actividades" 
              toggled={showActivities} 
              onToggle={() => toggleActivities()}
              labelStyle={{color: Theme.palette.alternateTextColor}}
            />
          	<IconMenu
            	iconButtonElement={
              		<IconButton touch={true}>
                		<NavigationExpandMoreIcon color={Theme.palette.alternateTextColor}/>
              		</IconButton>
            	}
          	>
            	<MenuItem primaryText="Ejecutar escenarios" />
            	<MenuItem primaryText="Solucionar" />
          	</IconMenu>
        </ToolbarGroup>
    </Toolbar>
)