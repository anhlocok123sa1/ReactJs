import React, { Component } from 'react';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      id: ''
    };
  }

  componentDidMount() {
    const user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.syncUserToState(user);
    }
  }

  componentDidUpdate(prevProps) {
    // Khi modal mở và currentUser thay đổi → đồng bộ form
    if (
      this.props.isOpen &&
      (prevProps.currentUser !== this.props.currentUser)
    ) {
      const user = this.props.currentUser || {};
      this.syncUserToState(user);
    }
  }

  syncUserToState = (user) => {
    this.setState({
      id: user.id || '',
      email: user.email || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      address: user.address || '',
      password: '' // không sửa password ở modal này
    });
  };

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (e, id) => {
    this.setState({ [id]: e.target.value });
  };

  checkValidateInput = () => {
    const required = ['firstName', 'lastName', 'address'];
    for (let key of required) {
      if (!String(this.state[key] || '').trim()) {
        alert('Missing parameter: ' + key);
        return false;
      }
    }
    return true;
  };

  handleSaveUser = () => {
    if (!this.checkValidateInput()) return;
    // Call api edit modal (từ parent)
    this.props.editUser(this.state);
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleSaveUser();
    }
  };

  render() {
    const { email, password, firstName, lastName, address } = this.state;

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className={'modal-user-container'}
        size="lg"
        centered
        onKeyDown={this.handleKeyDown}
      >
        <ModalHeader toggle={this.toggle}>Edit user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(e) => this.handleOnChangeInput(e, 'email')}
                value={email}
                disabled
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => this.handleOnChangeInput(e, 'password')}
                value={password}
                disabled
              />
            </div>
            <div className="input-container">
              <label>First name</label>
              <input
                type="text"
                onChange={(e) => this.handleOnChangeInput(e, 'firstName')}
                value={firstName}
              />
            </div>
            <div className="input-container">
              <label>Last name</label>
              <input
                type="text"
                onChange={(e) => this.handleOnChangeInput(e, 'lastName')}
                value={lastName}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(e) => this.handleOnChangeInput(e, 'address')}
                value={address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="px-3" onClick={this.handleSaveUser}>
            Save changes
          </Button>{' '}
          <Button color="secondary" className="px-3" onClick={this.toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(null, null)(ModalEditUser);
