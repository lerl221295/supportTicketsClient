import React from 'react'
import { FloatingActionButton } from "material-ui";
import {
	NavigationArrowBack as ArrowBack,
	EditorModeEdit as Edit,
	ImageRemoveRedEye as Eye
} from "material-ui/svg-icons";
import WrappedSubheader from './WrappedSubheader'
import {Row, Col} from "react-flexbox-grid"

export default ({id, edit, back, onCheckHandler, children}) => (
	<WrappedSubheader>
		<Row middle={"xs"} center={"xs"}>
			<Col xs={2}>
				<FloatingActionButton onClick={back} mini={true} zDepth={0} style={{marginBottom:'0.5rem'}}>
					<ArrowBack />
				</FloatingActionButton>
			</Col>
			<Col xs>
				<h1 style={{fontSize: '1.5rem', fontWeight: 400}}>{children}</h1>
			</Col>
			<Col xs={2}>
				{
					do {
						if (id) (
							<FloatingActionButton onClick={onCheckHandler} mini={true} zDepth={0} style={{marginBottom:'0.5rem'}}>
								{
									do {
										if (edit) (<Eye />);
										else (<Edit />);
									}
								}
							</FloatingActionButton>
						);
						else null;
					}
				}
			</Col>
		</Row>
	</WrappedSubheader>
)