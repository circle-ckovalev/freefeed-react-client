import React from 'react';
import { connect } from 'react-redux';
import { resetPassword, resetPasswordValidationFail } from '../redux/action-creators';
import { preventDefault } from '../utils';
import LoaderContainer from './loader-container';

function mapStateToProps(state, ownProps) {
  return { ...state.resetPassForm, token: ownProps.location.query.token };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(resetPassword(...args)),
    validation: (...args) => dispatch(resetPasswordValidationFail(...args)),
  };
}

const NO_PASSWORD = 'Enter new password';
const NO_CONFIRM = 'Enter password confirmation';
const NO_MATCH = 'New password and confirmation should match';

function resetFunc(pass, confirm, token, reset, validation) {
  if (!pass) {
    return validation(NO_PASSWORD);
  }

  if (!confirm) {
    return validation(NO_CONFIRM);
  }

  if (pass !== confirm) {
    return validation(NO_MATCH);
  }

  return reset(pass, token);
}

class ResetPassword extends React.Component {
  confirm;
  pass;

  handleSubmit = preventDefault(() => {
    resetFunc(
      this.pass.value,
      this.confirm.value,
      this.props.token,
      this.props.reset,
      this.props.validation,
    );
  });

  registerConfirm = (el) => {
    this.confirm = el;
  };

  registerPass = (el) => {
    this.pass = el;
  };

  render() {
    return (
      <div className="box">
        <div className="box-header-timeline">Hello</div>
        <div className="box-body">
          <div className="col-md-12">
            <h2 className="p-signin-header">{this.props.header}</h2>
            {this.props.error ? (
              <div className="alert alert-danger p-signin-error" role="alert">
                <span id="error-message">{this.props.error}</span>
              </div>
            ) : (
              false
            )}
            <div className="row">
              <div className="col-md-6">
                <LoaderContainer loading={this.props.loading}>
                  <form onSubmit={this.handleSubmit} className="p-signin">
                    <div className="form-group">
                      <label htmlFor="pass">Password</label>
                      <input
                        name="pass"
                        id="pass"
                        className="form-control"
                        type="password"
                        ref={this.registerPass}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm">Password confirmation</label>
                      <input
                        name="confirm"
                        id="confirm"
                        className="form-control"
                        type="password"
                        ref={this.registerConfirm}
                      />
                    </div>
                    <div className="form-group">
                      <button className="btn btn-default p-singin-action" type="submit">
                        Reset password
                      </button>
                    </div>
                  </form>
                </LoaderContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="box-footer" />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
