import React from 'react';
import { Link } from 'react-router';

export default () => (
  <div className="box-body">
    <p>
      The Circle is a private social network for alumni of Andrei Kovalev’s courses. If you have
      taken or participated in any of Andrei’s courses, online or offline, and you would like to set
      up a Circle account, please contact us at{' '}
      <a href="mailto:circle@ckovalev.com">circle@ckovalev.com</a>.
    </p>

    <p>
      Already registered? —{' '}
      <Link to="/signin">
        <b>Sign in!</b>
      </Link>
    </p>
  </div>
);
