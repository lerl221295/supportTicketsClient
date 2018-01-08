import React from 'react'
// Material UI
import { FlatButton, FloatingActionButton } from "material-ui";
// Material Icons
import { AvPlaylistAdd as New } from "material-ui/svg-icons"
// React Flexbox Grid
import { Col, Row } from "react-flexbox-grid";
// Common Components
import { WrappedSubheader } from '../../../../../../common/components'
// Default Theme
import theme from '../../../../../../theme-default'

export default ({ push }) => (
	<WrappedSubheader>
		<Row middle={"xs"}>
			<Col xs={9}>
				Despachadores
			</Col>
			<Col xs>
				<Row end={"xs"}>
					<FloatingActionButton
						mini={true}
						zDepth={0}
						style={{marginBottom:'0.5rem'}}
						iconStyle={{color: theme.palette.alternateTextColor}}
						onClick={() => push("/admin/automations/dispatchers/new")}
					>
						<New />
					</FloatingActionButton>
				</Row>
			</Col>
		</Row>
	</WrappedSubheader>
)