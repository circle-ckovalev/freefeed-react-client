import React from 'react';
import { Link } from 'react-router';

const About = () => (
  <div className="box">
    <div className="box-header-timeline" />
    <div className="box-body">
      <h3>About</h3>

      <p>
        The Circle is a private social network for alumni of Andrei Kovalev&apos;s courses who share
        an active commitment to photography and the visual arts. It follows many of the same social
        media conventions we are all used to: each member has a profile, can interact with posts
        from other users, and can subscribe to various groups per their interests.
      </p>

      <p>
        You are automatically subscribed to the <Link to="/circle">official Circle</Link> account.
        Don&apos;t forget that you can subscribe to another member&apos;s feeds to follow their
        posts!
      </p>

      <p>We recommend you also subscribe to these groups to get you started:</p>

      <h3>
        <Link to="/feedback">Feedback & critique</Link>
      </h3>

      <p>Share your work, give feedback, grow.</p>

      <h3>
        <Link to="/how">How is it done?</Link>
      </h3>

      <p>
        Image analysis. {'"'}How can I achieve this effect?{'"'}
      </p>

      <h3>
        <Link to="/toolstoys">Tools & toys</Link>
      </h3>

      <p>Equipment and DIY solutions. Find the right tool for the job.</p>

      <h3>
        <Link to="/inspiration">Inspiration & ideas</Link>
      </h3>

      <p>Found something cool? Share it!</p>

      <h3>
        <Link to="/bts">Behind the curtain</Link>
      </h3>

      <p>Method, process, and works in progress. Show us your set-ups!</p>

      <p>
        See something that’s not working or a way we can improve? Let us know in the{' '}
        <Link to="/support">support group</Link>.
      </p>

      <h3>The Circle team</h3>

      <p>
        <b>Andrei Kovalev</b>
      </p>
      <p>Visual artist, educator</p>

      <p>
        <b>Thomas Burns</b>
      </p>
      <p>Creative director, educator</p>

      <p>
        <b>Olesya Popova</b>
      </p>
      <p>Business director</p>

      <p>
        <b>Elina Wexler</b>
      </p>
      <p>Community manager</p>

      <p>
        <b>Dmytro Rusanov</b>
      </p>
      <p>Cinematographer</p>

      <p>
        <br />
        Circle is powered by{' '}
        <a href="https://freefeed.net/" target="_blank">
          FreeFeed.net
        </a>
      </p>
    </div>
  </div>
);

export default About;
