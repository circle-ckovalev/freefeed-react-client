/* global CONFIG */
import React, { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {
  getServerInfo,
  getExtAuthProfiles,
  unlinkExternalProfile,
} from '../../../redux/action-creators';
import { combineAsyncStates, initialAsyncState } from '../../../redux/async-helpers';
import { Icon } from '../../fontawesome-icons';
import { Throbber } from '../../throbber';
import { providerTitle, useExtAuthProviders } from '../../ext-auth-helpers';
import { ExtAuthButtons, CONNECT } from '../../ext-auth-buttons';

export default function ExtAuthForm() {
  const dispatch = useDispatch();

  const [providers] = useExtAuthProviders();
  const serverInfoStatus = useSelector((state) => state.serverInfoStatus);
  const existingProfilesStatus = useSelector((state) => state.extAuth.profilesStatus);
  const existingProfiles = useSelector(({ extAuth: { profiles, providers } }) =>
    profiles
      .filter((p) => providers.some((xp) => xp.id === p.provider))
      .map((p) => ({ ...p, provider: providers.find((xp) => xp.id === p.provider) })),
  );

  const loadStatus = useMemo(() => combineAsyncStates(serverInfoStatus, existingProfilesStatus), [
    serverInfoStatus,
    existingProfilesStatus,
  ]);

  useEffect(() => void (serverInfoStatus.initial && dispatch(getServerInfo())), [
    serverInfoStatus,
    dispatch,
  ]);

  useEffect(() => void (existingProfilesStatus.initial && dispatch(getExtAuthProfiles())), [
    dispatch,
    existingProfilesStatus,
  ]);

  if (providers.length === 0) {
    // External authentication is disabled so do not show anything
    return null;
  }

  return (
    <>
      <p>
        You can use these profiles to sign in to {CONFIG.siteTitle}. This will not let{' '}
        {CONFIG.siteTitle} do anything on your behalf on external sites and will not tell them about
        your {CONFIG.siteTitle} account.
      </p>
      {(loadStatus.loading || loadStatus.initial) && (
        <p>
          <em>Loading...</em>
        </p>
      )}
      {loadStatus.error && (
        <p className="alert alert-danger" role="alert">
          {loadStatus.errorText}
        </p>
      )}
      {loadStatus.success && (
        <>
          {existingProfiles.length === 0 && (
            <p>You don&#x2019;t have any connected profiles yet.</p>
          )}
          {existingProfiles.map((profile) => (
            <ConnectedProfile key={profile.id} profile={profile} />
          ))}
          <ExtAuthButtons mode={CONNECT} />
        </>
      )}
    </>
  );
}

const ConnectedProfile = React.memo(function ConnectedProfile({ profile }) {
  const disconnectStatus = useSelector(
    (state) => state.extAuth.disconnectStatuses[profile.id] || initialAsyncState,
  );
  const dispatch = useDispatch();
  const doUnlink = useCallback(
    (profileId) => () =>
      confirm('Are you sure you want to disconnect this profile?') &&
      dispatch(unlinkExternalProfile(profileId)),
    [dispatch],
  );

  return (
    <p>
      {profile.title} ({providerTitle(profile.provider)}){' '}
      <button
        className="btn btn-default btn-sm"
        onClick={doUnlink(profile.id)}
        disabled={disconnectStatus.loading}
      >
        <Icon icon={faTimes} /> Disconnect
      </button>
      {disconnectStatus.loading && <Throbber />}
      {disconnectStatus.error && (
        <>
          {' '}
          <Icon icon={faExclamationTriangle} className="post-like-fail" />{' '}
          {disconnectStatus.errorText}
        </>
      )}
    </p>
  );
});
