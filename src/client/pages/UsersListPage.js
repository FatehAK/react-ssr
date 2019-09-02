import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Helmet } from 'react-helmet';

class UsersListPage extends React.Component {
    componentDidMount() {
        //fetchUsers only if server has not already fetched
        //avoid double fetching (server + client side)
        //probably need to compare data from server and check whether new data must be fetched
        //be cautious if other components also need this data since server fetches data only when user navigates to `this` component
        // if (!this.props.users) {
        this.props.fetchUsers();
        // }
    }

    renderUsers() {
        const userList = this.props.users.map((user) => {
            return <li key={user.id}>{user.name}</li>;
        });
        return userList;
    }

    head() {
        return (
            <Helmet>
                <title>{`${this.props.users.length} Users Loaded`}</title>
                <meta property="og:title" content="User List" />
            </Helmet>
        );
    }

    render() {
        return (
            <div>
                {this.head()}
                <h5>List of Users</h5>
                <ul>{this.renderUsers()}</ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users
});

const loadData = (store) => {
    //manually dispatch the action creator
    //returns a promise with which we can check if data is completely loaded on server side (i.e by checking if the promise is resolved)
    return store.dispatch(fetchUsers());
};

export default {
    component: connect(mapStateToProps, { fetchUsers })(UsersListPage),
    loadData
};
