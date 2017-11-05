import {login as loginService} from '../Authenticate'

export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGIN = 'USER_LOGIN';

export const logout = () => (
    {
        type: USER_LOGOUT
    }
);

export const login = (user, cb) => (
    (dispatch, getState) => {
    	loginService(user)
    		.then(user => {
                cb();
                dispatch({
    				type: USER_LOGIN,
    				user: user
    			});

                if(user) dispatch(push("/"));
    		})
    }
);
