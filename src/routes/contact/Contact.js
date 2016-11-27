/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Contact.css';

class Contact extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p>You can reach Team Random through contact person <strong>Hildo Bijl</strong>.</p>
          <ul>
            <li>Phone: 0628579660</li>
            <li>Email: hildobijl@gmail.com</li>
            <li>Location: find us at the north-east corner of the hacking room</li>
            <li>In case of emergency: just yell "I need random people!" and people will come and help you. It's just probably not us.</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Contact);
