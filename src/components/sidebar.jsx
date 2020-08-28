/* global CONFIG */
import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { connect, useDispatch, useSelector } from 'react-redux';

import { preventDefault } from '../utils';
import { listHomeFeeds, setUserColorScheme } from '../redux/action-creators';
import {
  SCHEME_DARK,
  SCHEME_SYSTEM,
  SCHEME_LIGHT,
  systemColorSchemeSupported,
} from '../services/appearance';
import UserName from './user-name';
import RecentGroups from './recent-groups';
import ErrorBoundary from './error-boundary';
import { InvisibleSelect } from './invisibe-select';
import { UserPicture } from './user-picture';
import { SidebarHomeFeeds } from './sidebar-homefeeds';

const LoggedInBlock = ({ user, signOut }) => (
  <div className="logged-in">
    <div className="avatar">
      <UserPicture user={user} />
    </div>

    <div className="user">
      <div className="author">
        <UserName user={user}>{user.screenName}</UserName>
      </div>
      <div>
        <Link to="/settings">settings</Link>
        &nbsp;-&nbsp;
        <a onClick={preventDefault(signOut)}>sign out</a>
      </div>
    </div>
  </div>
);

const SideBarFriends = ({ user }) => {
  const dispatch = useDispatch();
  const homeFeedsCount = useSelector((state) => state.homeFeeds.length);
  const homeFeedsStatus = useSelector((state) => state.homeFeedsStatus);
  useEffect(() => void (homeFeedsStatus.initial && dispatch(listHomeFeeds())), [
    homeFeedsStatus.initial,
    dispatch,
  ]);

  const hasNotifications =
    user.unreadNotificationsNumber > 0 && !user.frontendPreferences.hideUnreadNotifications;
  const hasUnreadDirects = user.unreadDirectsNumber > 0;

  const directsStyle = hasUnreadDirects ? { fontWeight: 'bold' } : {};
  const notificationsStyle = hasNotifications ? { fontWeight: 'bold' } : {};
  const directsCountBadge = hasUnreadDirects ? `(${user.unreadDirectsNumber})` : '';
  const notificationsCountBadge = hasNotifications ? `(${user.unreadNotificationsNumber})` : '';

  return (
    <>
      <div className="box">
        <div className="box-header-friends">My</div>
        <div className="box-body">
          <ul>
            <li className="p-home">
              <Link to="/">Home</Link>
            </li>

            <li className="p-direct-messages">
              <Link to="/filter/direct" style={directsStyle}>
                Direct messages {directsCountBadge}
              </Link>
            </li>
            <li className="p-my-discussions">
              <Link to="/filter/discussions">Discussions</Link>
            </li>
            <li className="p-saved-posts">
              <Link to="/filter/saves">Saved posts</Link>
            </li>
            <li className="p-best-of">
              <Link to="/summary/1">Best of the day</Link>
            </li>
            <li className="p-home">
              <Link to="/filter/notifications" style={notificationsStyle}>
                Notifications {notificationsCountBadge}
              </Link>
            </li>
          </ul>
        </div>

        {do {
          if (homeFeedsCount === 1) {
            <div className="box-footer">
              <Link to={`/friends`} className="with-label--new">
                Browse/edit friends and lists
              </Link>
            </div>;
          }
        }}
      </div>

      {do {
        if (homeFeedsCount > 1) {
          <div className="box">
            <div className="box-header-friends">Friend lists</div>

            <div className="box-body">
              <SidebarHomeFeeds homeFeedsCount={homeFeedsCount} />
            </div>

            <div className="box-footer">
              <Link to={`/friends`} className="with-label--new">
                Browse/edit friends and lists
              </Link>
            </div>
          </div>;
        }
      }}
    </>
  );
};

const SideBarFreeFeed = () => (
  <div className="box">
    <div className="box-header-freefeed">{CONFIG.siteTitle}</div>
    <div className="box-body">
      <ul>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/all-groups">All groups</Link>
        </li>
        <li>
          <Link to="/support">Support</Link> / <Link to="/welcome">FAQ</Link>
        </li>
        <li>
          <Link to="/circle-news">News</Link>
        </li>
      </ul>
    </div>
  </div>
);

const SideBarGroups = ({ recentGroups }) => (
  <div className="box">
    <div className="box-header-groups">Groups</div>
    <div className="box-body">
      <RecentGroups recentGroups={recentGroups} />
    </div>
    <div className="box-footer">
      <Link to="/groups">Browse/edit groups</Link>
    </div>
  </div>
);

const SideBarAppearance = connect(
  ({ userColorScheme }) => ({ userColorScheme }),
  (dispatch) => ({ onChange: (e) => dispatch(setUserColorScheme(e.target.value)) }),
)(({ userColorScheme, onChange }) => {
  let value = userColorScheme;
  if (!systemColorSchemeSupported && value === SCHEME_SYSTEM) {
    value = SCHEME_LIGHT;
  }
  return (
    <div className="box">
      <div className="box-header-groups">Appearance</div>
      <div className="box-body">
        <ul>
          <li>
            <div>
              Color Scheme:{' '}
              <InvisibleSelect value={value} onChange={onChange} className="color-scheme-selector">
                <option value={SCHEME_LIGHT}>Light</option>
                {systemColorSchemeSupported && <option value={SCHEME_SYSTEM}>Auto</option>}
                <option value={SCHEME_DARK}>Dark</option>
              </InvisibleSelect>{' '}
              <span className="color-scheme-hint">
                {value === SCHEME_LIGHT
                  ? 'default'
                  : value === SCHEME_SYSTEM
                  ? 'as in your OS'
                  : null}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
});

const SideBar = ({ user, signOut, recentGroups }) => {
  return (
    <div className="col-md-3 sidebar">
      <ErrorBoundary>
        <LoggedInBlock user={user} signOut={signOut} />
        <SideBarFriends user={user} />
        <SideBarGroups recentGroups={recentGroups} />
        <SideBarFreeFeed />
        <SideBarAppearance />
      </ErrorBoundary>
    </div>
  );
};

export default SideBar;
