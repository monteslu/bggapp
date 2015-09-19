import React, { Component, PropTypes } from 'react';

const styles = {
  "font-size" : "2em"
}

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props;

    return (
      <span>
        <select onChange={e => onChange(e.target.value)}
                value={value} style={styles}>
          {options.map(option =>
            <option value={option} key={option}>
              {option}
            </option>)
          }
        </select>
      </span>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
