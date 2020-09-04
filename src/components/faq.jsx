import React from 'react';
import { Link } from 'react-router';

const faq = () => (
  <div className="box">
    <div className="box-header-timeline" />
    <div className="box-body">
      <h2>FAQ</h2>

      <h3>General questions</h3>

      <p>
        <b>Q: Can I invite other people to the Circle?</b>
      </p>

      <p>
        A: If they have taken one of Andrei Kovalev’s courses, yes! Please let us know and we will
        reach out to them.
      </p>

      <p>
        <b>Q: Who do I contact with questions, feedback, and suggestions?</b>
      </p>

      <p>
        A: Send us a note in the Support group! Or if you prefer more private communication, send us
        a note at <a href="mailto:circle@ckovalev.com">circle@ckovalev.com</a>.
      </p>

      <p>
        <b>Q: How can I get involved?</b>
      </p>

      <p>
        A: The best way to contribute is to be an engaged member of the Circle discussions. Also be
        sure to check out our periodical announcements in the{' '}
        <Link to="/circle">official Circle group</Link>, as we sometimes look for collaboration on
        specific projects.
      </p>

      <p>
        <b>Q: How can I work with Andrei Kovalev?</b>
      </p>

      <p>
        A: For collaboration and commissions, contact Andrei at{' '}
        <a href="mailto:collab@ckovalev.com">collab@ckovalev.com</a>. Also, keep an eye on Andrei’s{' '}
        <Link to="/ckovalev">feed</Link> for announcements about upcoming courses and projects.
      </p>

      <h3>Using the Circle</h3>

      <p>
        <b>Q: If I want to post a long text with paragraphs, how do I do that?</b>
      </p>

      <p>
        A: You can use Shift + Enter to divide your text into paragraphs. Another option is to
        divide your text into separate comments: the first paragraph goes into the post body, the
        next one goes into the first comment, the third one goes into the second comment, etc.
      </p>

      <p>
        <b>
          Q: What is the ‘Hide’ button? Does it alter the weight of this user in my feed as it does
          on Facebook?
        </b>
      </p>

      <p>A: No, it doesn’t. The ‘Hide’ button hides just one post, that’s all.</p>

      <p>
        <b>Q: How is my feed sorted?</b>
      </p>

      <p>
        A: Feeds are sorted in the backward chronological order, but every comment brings a post up
        (bumps it). Likes do not normally bring posts up. The only exception is when someone you are
        subscribed to likes a post of someone you are not subscribed to; in that case, the post
        appears at the top of your feed.
      </p>

      <p>
        <b>Q: What is ^, and how is it different from ^^?</b>
      </p>

      <p>
        A: ^, ^^, ↑, ↑↑ and so on are the usual ways of pointing to the comment you mention, like
        ‘the one above,’ or ‘the one above of the above,’ etc. These symbols are marked grey in your
        comments, and when you hover your mouse over them, the comment they refer to lights up.
      </p>

      <p>
        <b>Q: If someone has liked my post, they really like it, right?</b>
      </p>

      <p>
        A: In the Circle, likes are used for various purposes. It can be a sign of approval or
        gratitude, a way of subscribing to the comments (since all the posts you’ve liked are
        available under the link My Discussions in your right column, or under the link ‘N likes’ in
        your profile). Or it can be a way of sharing your post with another user: if you like a
        post, your friends are going to see it too.
      </p>

      <p>
        <b>Q: What is a display name (screen name)?</b>
      </p>

      <p>
        A: Circle members have not only logins (i.e. nicknames, i.e. user page address), they also
        have ‘display names,’ or ‘Screen Names.’ These are the names that appear in the feeds. You
        can change your display name every other minute, expressing a mood, or just fooling around.
        That’s why Circle members often recognize each other by userpics. It is common here to
        address a person using their login with an ‘@’ before it. So, if someone wants to address
        the official Circle account, they type ‘@circle’. To quickly insert a user mention, just
        click on a cloud to the left of the comment from that member.
      </p>

      <p>
        <b>Q: Where can I get the link to a separate post?</b>
      </p>

      <p>
        A: You can get it if you click on the timestamp right under the post body, next to the
        ‘Comment’ link. You can right-click it and choose ‘Copy’ from your browser pop-up menu.
        Please remember, however, that only members of the Circle will be able to view that post.
      </p>
    </div>
  </div>
);

export default faq;
