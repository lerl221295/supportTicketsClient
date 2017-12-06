import {fade} from 'material-ui/utils/colorManipulator';
import {
	blue600, grey900, grey500, white, cyan500, fullBlack,
	grey400, pinkA200, grey100, darkBlack, grey300, cyan700,
	indigo100, indigo500, indigo700, amber100, amber500, amber800, grey600, grey700, black,
	// toogle
	orange500, orange100, amber200
} from 'material-ui/styles/colors'


export const LoginStyles = {
    loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto'
    },
    paper: {
        padding: 20,
        overflow: 'auto'
    },
    buttonsDiv: {
        textAlign: 'center',
        padding: 10
    },
    flatButton: {
        color: grey500
    },
    checkRemember: {
        style: {
            float: 'left',
            maxWidth: 180,
            paddingTop: 5
        },
        labelStyle: {
            color: grey500
        },
        iconStyle: {
            color: grey500,
            borderColor: grey500,
            fill: grey500
        }
    },
    loginBtn: {
        float: 'right'
    },
    btn: {
        background: '#4f81e9',
        color: white,
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
    },
    btnFacebook: {
        background: '#4f81e9'
    },
    btnGoogle: {
        background: '#e14441'
    },
    btnSpan: {
        marginLeft: 5
    },
};

const defaultThemeProps = {
	appBar: {
		height: 57
	},
	drawer: {
		width: 230,
			color: grey900
	},
};

const indigo = {
	palette: {
		primary1Color: indigo500,
		primary2Color: indigo700,
		primary3Color: indigo100,
		accent1Color: amber800,
		accent2Color: amber100,
		// accent3Color: amber500,
		textColor: grey900,
		secondaryTextColor: grey600,
		alternateTextColor: white,
		pickerHeaderColor: indigo500,
		disabledColor: grey700,
		canvasColor: white,
		clockCircleColor: fade(black, 0.07)
	},
	avatar: {
		backgroundColor: amber800
	},
	toolbar: {
		backgroundColor: indigo700
	}
};

const cyan = {
	palette: {
		primary1Color: cyan500,
		primary2Color: cyan700,
		primary3Color: grey400,
		accent1Color: pinkA200,
		accent2Color: grey100,
		accent3Color: grey500,
		textColor: darkBlack,
		alternateTextColor: white,
		canvasColor: white,
		borderColor: grey300,
		disabledColor: fade(darkBlack, 0.3),
		pickerHeaderColor: cyan500,
		clockCircleColor: fade(darkBlack, 0.07),
		shadowColor: fullBlack,
	},
	avatar: {
		backgroundColor: pinkA200
	}
};

const selectedTheme = indigo;

export default {...selectedTheme, ...defaultThemeProps};