import React from 'react'
// Material UI
import { FloatingActionButton } from 'material-ui'
// Icons
import { ContentSave as Save,	NavigationArrowBack as Back } from 'material-ui/svg-icons'
// React Flexbox Grid
import { Row, Col } from 'react-flexbox-grid'
// Common Components
import { WrappedSubheader } from '../../../../../../common/components'
// Theme
import theme from '../../../../../../theme-default'

const styles = {
	icon: {
		color: theme.palette.alternateTextColor
	},
	floatingButton: {
		marginBottom:'0.5rem'
	}
};

export default ({ goBack, dirty, handleSubmit }) => (
	<Row>
		<Col xs>
			<WrappedSubheader>
				<Row center={'xs'} middle={'xs'}>
					<Col xs={1}>
						<FloatingActionButton
							iconStyle={styles.icon}
							style={styles.floatingButton}
							onClick={goBack}
							zDepth={0}
							mini
						>
							<Back />
						</FloatingActionButton>
					</Col>
					<Col xs={10}>
						Despechador
					</Col>
					<Col xs={1}>
						<FloatingActionButton
							iconStyle={styles.icon}
							style={styles.floatingButton}
							zDepth={0}
							disabled={!dirty}
							onClick={() => {handleSubmit()}}
							mini
						>
							<Save />
						</FloatingActionButton>
					</Col>
				</Row>
			</WrappedSubheader>
		</Col>
	</Row>
)