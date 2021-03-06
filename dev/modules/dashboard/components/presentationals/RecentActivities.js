import React from 'react';
// Material UI
import {Subheader, Divider, Paper, FlatButton, CircularProgress} from "material-ui";
import {List, ListItem} from 'material-ui/List'
// Flexbox Grid
import { Row, Col } from 'react-flexbox-grid';
// Components
import Item from './ItemListActivity'
// Common Components
import { WrappedSubheader } from '../../../../common/components'

import theme from '../../../../theme-default'

const styles = {
	paper: {
		// height: '27rem'
		height: window.innerHeight - 218,
	},
	paperOverflow: {
		overflowY: 'auto',
		overflowX: 'hidden'
	},
	buttonFetchMore: {
		width: '100%'
	}
};

export default ({loadingActivities, activities, loadMoreActivities}) => {
	return (
		<Row>
			<Col xs={12}>
				<WrappedSubheader>Actividades recientes</WrappedSubheader>
				<Paper style={{...styles.paper, ...styles.paperOverflow}}>
					<List>
						{activities.map((activity, i) =>
							<div key={i}>
								<ListItem containerElement={<Item {...activity}/>}/>
								<Divider />
							</div>
						)}
					</List>
					{
						do {
							if (loadingActivities && activities) {
								<Row middle={"xs"} center={"xs"}>
									<Col xs={12}>
										<CircularProgress />
									</Col>
								</Row>
							}
						}
					}
					<Col xs={12}>
						<FlatButton
							label="Cargar mas"
							style={styles.buttonFetchMore}
							primary={true}
							onClick={loadMoreActivities}
							disabled={loadingActivities}
						/>
					</Col>
				</Paper>
			</Col>
		</Row>
	);
}