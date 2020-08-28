/* global CONFIG */
import React, { useCallback, useMemo, Suspense, useEffect } from 'react';
import { Link, browserHistory } from 'react-router';
import { Helmet } from 'react-helmet';
import cn from 'classnames';

import {
  faKey,
  faShieldAlt,
  faDesktop,
  faEnvelope,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '../hooks/media-query';
import { Icon } from '../fontawesome-icons';
import { Delayed } from '../lazy-component';
import { Throbber } from '../throbber';
import styles from './settings.module.scss';

const settingsRoot = '/settings';

const settingsSection = (path) => settingsRoot + (path && `/${path}`);

const tabs = [
  { id: '', icon: faUser, title: 'Profile' },
  { id: 'sign-in', icon: faKey, title: 'Sign in' },
  { id: 'privacy', icon: faShieldAlt, title: 'Privacy' },
  { id: 'appearance', icon: faDesktop, title: 'Appearance' },
  { id: 'notifications', icon: faEnvelope, title: 'Notifications' },
];

const loadingPage = (
  <Delayed>
    <p>
      Loading page... <Throbber />
    </p>
  </Delayed>
);

export default function Layout({ children, router }) {
  // Do not allow anonymous access
  const authenticated = useSelector((state) => state.authenticated);
  useEffect(
    () => void (!authenticated && browserHistory.push(`/signin?back=${location.pathname}`)),
    [authenticated],
  );

  const narrowScreen = useMediaQuery('(max-width: 620px)');

  const activeTab = useMemo(() => {
    const { pathname } = router.location;
    if (pathname.indexOf(settingsRoot) !== 0) {
      return '';
    }
    return pathname.substring(settingsRoot.length).replace(/^\//, '').split('/')[0];
  }, [router.location]);

  const selectTab = useCallback(
    ({ target }) => {
      router.push(settingsSection(target.value));
      target.blur();
    },
    [router],
  );

  return (
    <div className="content">
      <Helmet
        titleTemplate={`%s - Settings - ${CONFIG.siteTitle}`}
        defaultTitle={`Settinge - ${CONFIG.siteTitle}`}
      />
      <div className="box">
        <div className="box-header-timeline">Settings</div>
        <div className="box-body">
          {narrowScreen ? (
            <select value={activeTab} className={styles.tabSelect} onChange={selectTab}>
              {tabs.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          ) : (
            <ul className={`nav nav-tabs ${styles.navigation}`}>
              {tabs.map((t) => (
                <Tab key={t.id} id={t.id} activeId={activeTab} icon={t.icon}>
                  {t.title}
                </Tab>
              ))}
            </ul>
          )}
          <Suspense fallback={loadingPage}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}

export function SettingsPage({ title, header = title, children }) {
  return (
    <>
      <Helmet title={title} defer={false} />
      <h3 className={styles.pageHeader}>{header}</h3>
      {children}
    </>
  );
}

function Tab({ id, activeId, icon, children }) {
  return (
    <li role="presentation" className={cn(styles.navTab, { active: id === activeId })}>
      <Link to={settingsSection(id)}>
        <Icon icon={icon} className={styles.tabIcon} />{' '}
        <span className={styles.tabText}>{children}</span>
      </Link>
    </li>
  );
}
