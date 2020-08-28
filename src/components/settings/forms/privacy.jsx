import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useField, useForm } from 'react-final-form-hooks';

import { updateUser } from '../../../redux/action-creators';
import { Throbber } from '../../throbber';
import { PreventPageLeaving } from '../../prevent-page-leaving';
import { RadioInput } from '../../form-utils';

const PUBLIC = 'public',
  PROTECTED = 'protected',
  PRIVATE = 'private',
  ALL = 'all',
  FRIENDS = 'friends';

export default (function PrivacyForm() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const formStatus = useSelector((state) => state.settingsForms.privacyStatus);

  const form = useForm(
    useMemo(
      () => ({
        initialValues: initialValues(userData),
        onSubmit: onSubmit(userData.id, dispatch),
      }),
      [dispatch, userData],
    ),
  );

  const acceptDirectsFrom = useField('acceptDirectsFrom', form.form);

  return (
    <form onSubmit={form.handleSubmit}>
      <PreventPageLeaving prevent={form.dirty} />

      <div className="form-group">
        <p>Accept direct messages from:</p>
        <div className="radio">
          <label>
            <RadioInput field={acceptDirectsFrom} value={ALL} />
            All users
          </label>
        </div>
        <div className="radio">
          <label>
            <RadioInput field={acceptDirectsFrom} value={FRIENDS} />
            Only users you subscribe to
          </label>
        </div>
      </div>

      <div className="form-group">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={formStatus.loading || !form.dirty || form.hasValidationErrors}
        >
          {formStatus.loading ? 'Updating privacy settings…' : 'Update privacy settings'}
        </button>{' '}
        {formStatus.loading && <Throbber />}
      </div>
      {formStatus.error && (
        <p className="alert alert-danger" role="alert">
          {formStatus.errorText}
        </p>
      )}
      {formStatus.success && (
        <p className="alert alert-success" role="alert">
          Privacy settings updated
        </p>
      )}
    </form>
  );
});

function initialValues(userData) {
  return {
    privacy: privacyFlagsToString(userData),
    acceptDirectsFrom: userData.preferences.acceptDirectsFrom,
  };
}

function onSubmit(id, dispatch) {
  return (values) => {
    dispatch(
      updateUser(id, undefined, undefined, '0', '1', undefined, undefined, {
        acceptDirectsFrom: values.acceptDirectsFrom,
      }),
    );
  };
}

export function privacyFlagsToString({ isPrivate, isProtected }) {
  if (isPrivate === '1') {
    return PRIVATE;
  }
  if (isProtected === '1') {
    return PROTECTED;
  }
  return PUBLIC;
}

export function privacyStringToFlags(privacy) {
  return {
    isPrivate: privacy === PRIVATE ? '1' : '0',
    isProtected: privacy === PROTECTED ? '1' : '0',
  };
}
