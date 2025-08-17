import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; // nếu không dùng có thể xoá
import { connect } from 'react-redux';
import './UserManage.scss';
import { createNewUserServices, getAllUsers, deleteUserServices, editUserServices } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUsesr: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    const response = await getAllUsers('ALL');
    if (response && response.errCode === 0) {
      this.setState({ arrUsers: response.users || [] });
    } else {
      this.setState({ arrUsers: [] });
    }
  };

  handleAddNewUser = () => {
    this.setState({ isOpenModalUsesr: true });
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user || {},
    });
  };

  toggleUserModal = () => {
    this.setState((prev) => ({ isOpenModalUsesr: !prev.isOpenModalUsesr }));
  };

  toggleEditUserModal = () => {
    this.setState((prev) => ({ isOpenModalEditUser: !prev.isOpenModalEditUser }));
  };

  createNewUser = async (data) => {
    try {
      const res = await createNewUserServices(data);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({ isOpenModalUsesr: false });
        emitter.emit('EVENT_CLEAR_MODAL_DATA');
      }
    } catch (e) {
      console.error(e);
    }
  };

  editUser = async (data) => {
    try {
      const res = await editUserServices(data);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({ isOpenModalEditUser: false, userEdit: {} });
      }
    } catch (e) {
      console.error(e);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      const res = await deleteUserServices(user.id);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { arrUsers, isOpenModalUsesr, isOpenModalEditUser, userEdit } = this.state;

    return (
      <div className="users-container">
        <ModalUser
          isOpen={isOpenModalUsesr}
          createNewUser={this.createNewUser}
          toggleFromParent={this.toggleUserModal}
        />

        {isOpenModalEditUser && (
          <ModalEditUser
            isOpen={isOpenModalEditUser}
            currentUser={userEdit}
            editUser={this.editUser}
            toggleFromParent={this.toggleEditUserModal}
          />
        )}

        <div className="title text-center">Manage user with React</div>

        <div className="mx-1">
          <button className='btn btn-primary px-3' onClick={this.handleAddNewUser}>
            <i className='fas fa-plus'></i> Add new users
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
              {arrUsers && arrUsers.length > 0 ? (
                arrUsers.map((item, index) => (
                  <tr key={item.id || index}>
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
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(UserManage);
