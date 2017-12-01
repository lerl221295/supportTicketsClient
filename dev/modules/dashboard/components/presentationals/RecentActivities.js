import React from 'react';
// Material UI
import {Subheader, Divider, Paper, FlatButton, CircularProgress} from "material-ui";
import {List, ListItem} from 'material-ui/List'
// Flexbox Grid
import { Row, Col } from 'react-flexbox-grid';
// Components
import Item from './ItemListActivity'

const styles = {
	paper: {
		height: '27rem'
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
				<Subheader className={"subheader"}>Actividades recientes</Subheader>
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
							if (loadingActivities && activities) (
								<Row middle={"xs"} center={"xs"}>
									<Col xs={12}>
										<CircularProgress />
									</Col>
								</Row>
							);
							else ""
						}
					}
					<Col xs={12} md={12} sm={12}>
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