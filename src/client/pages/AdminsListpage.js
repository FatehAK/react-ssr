import React from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';
import requireAuth from '../components/hocs/requireAuth';
import { Helmet } from 'react-helmet';

class AdminsListPage extends React.Component {
    componentDidMount() {
        // if (!this.props.admins) {
        this.props.fetchAdmins();
        // }
    }

    renderAdmins() {
        const adminsList = this.props.admins.map((admin) => {
            return <li key={admin.id}>{admin.name}</li>;
        });
        return adminsList;
    }

    head() {
        return (
            <Helmet>
                <title>Admin List</title>
                <meta property="og:title" content="User List" />
            </Helmet>
        );
    }

    render() {
        return (
            <div>
                {this.head()}
                <h5>List of admins</h5>
                <ul>{this.renderAdmins()}</ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    admins: state.admins
});

const loadData = (store) => {
    return store.dispatch(fetchAdmins());
};

//adding hocs for `AdminListPage`
export default {
    component: connect(mapStateToProps, { fetchAdmins })(requireAuth(AdminsListPage)),
    loadData
};
