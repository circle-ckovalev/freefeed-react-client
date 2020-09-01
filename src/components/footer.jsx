import React from 'react';
import { Link } from 'react-router';

export default () => (
  <footer className="footer">
    &copy; Circle, a community for Andrei Kovalev&apos;s course alumni
    <br />
    <Link to="/about">About</Link>
    {' | '}
    <a href="https://github.com/FreeFeed/freefeed-server/wiki/FAQ" target="_blank">
      FAQ
    </a>
    {' | '}
    <Link to="/about/terms">Terms</Link>
    {' | '}
    <Link to="/about/privacy">Privacy</Link>
    {' | '}
    Powered by{' '}
    <a href="https://freefeed.net/" target="_blank">
      FreeFeed.net
    </a>
  </footer>
);
