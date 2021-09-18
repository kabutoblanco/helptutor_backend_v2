import React, { Component, Fragment } from 'react';

// REDUX
import { connect } from 'react-redux';

// THIRD COMPONENTS
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';

class Alert extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.detail) alert.error(`${error.msg.detail}`);
      if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
    }

    if (message !== prevProps.message) {
      alert.success(message);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alert));
