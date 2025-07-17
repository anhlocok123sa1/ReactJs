import React, { Component } from 'react';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

class TableManageUser extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allUsers !== this.props.allUsers) {
            this.setState({
                userRedux: this.props.allUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id);
    }

    render() {
        console.log('Check all user: ', this.props.allUsers);
        console.log('Check state: ', this.state.userRedux);
        let arrUsers = this.state.userRedux

        return (
            <table className="table table-bordered table-striped">
                <thead>
                    <tr className='table-primary'>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {arrUsers && arrUsers.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button type="button" className="btn-edit" onClick={() => this.handleEditUser(item)}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button type="button" className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })

                    }

                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        allUsers: state.admin.allUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
