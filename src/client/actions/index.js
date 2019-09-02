//fetch list of users
export const fetchUsers = () => {
    //here api refers to the axios instance
    return async (dispatch, getState, api) => {
        const res = await api.get('/users');
        dispatch({
            type: 'FETCH_USERS',
            payload: res
        });
    };
};

//to get details of currently logged in user
export const fetchCurrentUser = () => {
    return async (dispatch, getState, api) => {
        const res = await api.get('/current_user');
        dispatch({
            type: 'FETCH_CURRENT_USER',
            payload: res
        });
    };
};

//to get admin list
export const fetchAdmins = () => {
    return async (dispatch, getState, api) => {
        const res = await api.get('/admins');
        dispatch({
            type: 'FETCH_ADMINS',
            payload: res
        });
    };
};
