import {logout as logoutService, getUser as getUserService} from '../Authenticate'
import {USER_LOGOUT, USER_LOGIN} from '../actions/user'

const defaultUser = getUserService();

export const user = (state = defaultUser, action) => {
    switch (action.type) {
        case USER_LOGOUT :
        	logoutService();
            return null;
            break;
        case USER_LOGIN :
        	if(!action.user) Materialize.toast("ocurrio un error", 1800);
        	else Materialize.toast("Bienvenido "+action.user.user.name, 1800, 'rounded green');
        	return action.user     
    }
    return state;
}
