import React, { Component } from 'react';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      isSubmitting: false,
    };

    this.clearListener = null;
  }

  componentDidMount() {
    // lắng nghe sự kiện clear từ parent sau khi tạo user thành công
    this.clearListener = emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        isSubmitting: false,
      });
    });
  }

  componentWillUnmount() {
    // dọn listener để tránh memory leak
    if (this.clearListener && typeof this.clearListener === 'function') {
      try {
        this.clearListener();
      } catch (_) {}
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (e, id) => {
    this.setState({ [id]: e.target.value });
  };

  checkValidateInput = () => {
    const { email, password, firstName, lastName, address } = this.state;

    // required fields
    const required = { email, password, firstName, lastName, address };
    for (const key of Object.keys(required)) {
      if (!String(required[key] || '').trim()) {
        alert('Missing parameter: ' + key);
        return false;
      }
    }

    // email format (basic)
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert('Email is invalid');
      return false;
    }

    // password length (ví dụ >= 6)
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  handleAddNewUser = async () => {
    if (this.state.isSubmitting) return; // tránh double submit
    if (!this.checkValidateInput()) return;

    this.setState({ isSubmitting: true });
    try {
      // parent sẽ gọi API và sau khi thành công sẽ emit EVENT_CLEAR_MODAL_DATA
      await this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
      });
    } finally {
      // nếu parent không emit (thất bại), vẫn cho phép submit lại
      this.setState({ isSubmitting: false });
    }
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleAddNewUser();
    }
  };

  render() {
    const { email, password, firstName, lastName, address, isSubmitting } = this.state;

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className={'modal-user-container'}
        size="lg"
        centered
        onKeyDown={this.handleKeyDown}
      >
        <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(e) => this.handleOnChangeInput(e, 'email')}
                value={email}
                placeholder="example@domain.com"
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => this.handleOnChangeInput(e, 'password')}
                value={password}
                placeholder="At least 6 characters"
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
          <Button
            color="primary"
            className="px-3"
            onClick={this.handleAddNewUser}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add new'}
          </Button>{' '}
          <Button color="secondary" className="px-3" onClick={this.toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(null, null)(ModalUser);
