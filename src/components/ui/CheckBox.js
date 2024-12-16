import React from 'react';

class CheckBox extends React.Component {
  handleChange(e) {
    const { checked } = e.target;
    this.props.onChange(checked); // Notify parent about the status change
  }

  render() {
    return (
      <input
        type="checkbox"
        checked={this.props.checked}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}

export default CheckBox;
