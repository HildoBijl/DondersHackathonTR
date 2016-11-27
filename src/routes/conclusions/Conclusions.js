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
import s from './Conclusions.css';

class Conclusions extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <ul>
            <li>Learning about things that matter to you improves motivation and hence memory retention.</li>
            <li>Learning through collocations makes it easier to apply words than by just learning word translations.</li>
          </ul>
          <p>Learn words in a way that allows you to use them.</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Conclusions);
