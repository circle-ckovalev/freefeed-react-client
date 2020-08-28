import React, { useMemo } from 'react';
import { useField, useForm } from 'react-final-form-hooks';
import { useSelector, useDispatch } from 'react-redux';
import { find } from 'lodash';

import { updateGroup } from '../redux/action-creators';
import { initialAsyncState } from '../redux/async-helpers';
import { PreventPageLeaving } from './prevent-page-leaving';
import { Throbber } from './throbber';
import { privacyFlagsToString, privacyStringToFlags } from './settings/forms/privacy';
import { shouldBe, errorMessage, groupErrClass } from './form-utils';
import styles from './settings/forms/forms.module.scss';
import settingsStyles from './settings/settings.module.scss';

export default function GroupSettingsForm({ username }) {
  const dispatch = useDispatch();
  const group = useSelector((state) => find(state.users, { username }));
  const formStatus = useSelector(
    (state) => state.updateGroupStatuses[group.id] || initialAsyncState,
  );

  const form = useForm(
    useMemo(
      () => ({
        validate,
        initialValues: initialValues(group),
        onSubmit: onSubmit(group.id, dispatch),
      }),
      [dispatch, group],
    ),
  );

  const screenName = useField('screenName', form.form);
  const description = useField('description', form.form);

  return (
    <form onSubmit={form.handleSubmit}>
      <PreventPageLeaving prevent={form.dirty} />

      <section className={settingsStyles.formSection}>
        <div className={groupErrClass(screenName)}>
          <label htmlFor="screenname-input">Display name</label>
          <input
            id="screenname-input"
            className="form-control wider-input"
            type="text"
            autoComplete="name"
            {...screenName.input}
          />
          {errorMessage(screenName)}
        </div>

        <div className={groupErrClass(description)}>
          <label htmlFor="description-input">Description</label>
          <textarea
            id="description-input"
            className={`form-control wider-input ${styles.profileDescription}`}
            {...description.input}
          />
        </div>
      </section>

      <div className="form-group">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={formStatus.loading || !form.dirty || form.hasValidationErrors}
        >
          {formStatus.loading ? 'Updating group…' : 'Update group'}
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
          Group updated
        </p>
      )}
    </form>
  );
}

function initialValues(group) {
  return {
    screenName: group.screenName || '',
    description: group.description || '',
    privacy: privacyFlagsToString(group),
    restrictness: group.isRestricted,
  };
}

function validate(values) {
  const errors = {};
  errors.screenName = shouldBe(
    /^.{3,25}$/i.test(values.screenName.trim()),
    <>
      {values.screenName.trim()} is not a valid displayname.
      <br /> The length should be from 3 to 25 characters.
    </>,
  );
  return errors;
}

function onSubmit(id, dispatch) {
  return (values) => {
    dispatch(
      updateGroup(id, {
        screenName: values.screenName.trim(),
        description: values.description.trim(),
        ...privacyStringToFlags(values.privacy),
        isRestricted: values.restrictness,
      }),
    );
  };
}
