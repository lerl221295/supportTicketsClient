import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import Image from 'material-ui/svg-icons/image/image'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
	img: {
		width: '7rem',
		borderRadius: 20
	},
	avatar_filename: {
		width: 'fit-content'
	}
};

const AvatarImg = ({face_base64, avatar_filename, changeImage, disabled}) => (
	<Row middle={"xs"}>
		<Col xs={12} sm={12} md={4} lg={4}>
			<img src={face_base64 || "/images/user.png"} style={styles.img}/>
		</Col>
		<Col xs={12} sm={12} md={8} lg={8}>
			<TextField
				id={"avatar_filename"}
				disabled={true}
				style={styles.avatar_filename}
				value={avatar_filename}
				multiLine={false}
				rows={1}
			/><br />
			<RaisedButton
				containerElement='label'
				label='Imagen de Perfil'
				icon={<Image />}
				disabled={disabled}
			>
				<input disabled={disabled} accept="image/*" type="file" style={{ display: 'none' }} onChange={changeImage}/>
			</RaisedButton>
		</Col>
	</Row>
);

export default AvatarImg