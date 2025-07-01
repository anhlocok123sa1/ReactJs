import React, { Component } from 'react';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService'
import ModalUser from './ModalUser';
class UserManage extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            arrUsers: [],
            isOpenModalUsesr: false
        }
    }

    state = {

    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUsesr: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUsesr: !this.state.isOpenModalUsesr,
        })
    }


    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUsesr}
                    test={'abc'}
                    toggleFromParent={this.toggleUserModal}
                />
                <div className="title text-center">Manage user with React</div>
                <div className="mx-1">
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className='fas fa-plus'></i>
                        Add new users
                    </button>
                </div>
                <div className="users-table mt-3">
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
                                        <th scope="row">{index}</th>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button type="button" className="btn-edit">
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button type="button" className="btn-delete">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })

                            }

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
