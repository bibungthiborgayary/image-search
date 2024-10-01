import { Component } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import './searchField.css';

class SearchField extends Component {
  state = { val: '' };

  onInputChange = (event) => {
    this.setState({ val: event.target.value });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.userSubmit(this.state.val, true); // Call the userSubmit prop function
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="flexContainer">
          <img src="../../public/logo.svg" alt="logo" />
          <label htmlFor="search-input"><h2>What are you searching for?</h2></label>
          <input
            placeholder='Enter your search term'
            className="inputStyle"
            type="text"
            value={this.state.val}
            onChange={this.onInputChange}
          />
        </form>
      </div>
    );
  }
}

// Adding PropTypes for the component's props validation
SearchField.propTypes = {
  userSubmit: PropTypes.func.isRequired, // userSubmit should be a required function
};

export default SearchField;
