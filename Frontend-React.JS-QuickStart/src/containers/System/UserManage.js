import React, { Component } from 'react';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { createNewUserServices, getAllUsers, deleteUserServices } from '../../services/userService'
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';

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
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
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

    createNewUser = async (data) => {
        try {
            let res = await createNewUserServices(data);
            if (res && res.errCode !== 0) {
                alert(res.errMessage)
            } else {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUsesr: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserServices(user.id);
            if(res && res.errCode!==0) {
                alert(res.errMessage)
            } else {
                await this.getAllUsersFromReact()
            }
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUsesr}
                    createNewUser={this.createNewUser}
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
