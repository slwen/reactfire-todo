'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'Checkbox',
  propTypes: {
    checked: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  handleCheck(e) {
    this.props.onChange(e);
  },

  render() {
    const checkedClass = this.props.checked ? 'Checkbox__svg--checked' : '';

    return (
      <label className="Checkbox">
        <input
          type="checkbox"
          checked={ this.props.checked }
          onChange={ this.handleCheck } />

        <div>
          <svg width="23" height="23" viewBox="0 0 23 23" className={ "Checkbox__svg " + checkedClass }>
            <rect width="23" height="23" rx="4"/>
            <path d="M18.28 6.26C17.94 5.91 17.38 5.91 17.03 6.26L9.53 13.84 6.51 10.79C6.16 10.44 5.6 10.44 5.26 10.79 4.91 11.14 4.91 11.7 5.26 12.05L8.91 15.74C9.08 15.91 9.3 16 9.53 16 9.76 16 9.98 15.91 10.16 15.74L18.28 7.53C18.63 7.18 18.63 6.61 18.28 6.26L18.28 6.26Z"/>
          </svg>
        </div>
      </label>
    );
  }
});
