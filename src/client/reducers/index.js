import { combineReducers } from 'redux';

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return action.payload.data;
        default:
            return state;
    }
};

//set initial state to `null` since we don't whether the user is authenticated
const authReducer = (state = null, action) => {
    switch (action.type) {
        case 'FETCH_CURRENT_USER':
            //if not logged in return `false`
            return action.payload.data || false;
        default:
            return state;
    }
};

const adminsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ADMINS':
            return action.payload.data;
        default:
            return state;
    }
};

export default combineReducers({
    users: usersReducer,
    auth: authReducer,
    admins: adminsReducer
});
