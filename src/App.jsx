// src/App.jsx
import React from 'react';
import './App.css';
import SearchField from './components/SearchField';
import ImageList from './components/ImageList';
import Modal from './components/Modal';
import Navbar from './components/Navbar'; // Import Navbar
import axios from 'axios';

class App extends React.Component {
  state = {
    images: [],
    selectedImage: null,
    page: 1,
    loading: false,
    term: '',
    showScrollTopButton: false,
    searchPerformed: false,
  };

  API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll); // Attach scroll listener
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll); // Clean up scroll listener
  }

  onSearchSubmit = async (term, newSearch = true) => {
    if (newSearch) {
      this.setState({ images: [], page: 1, term, searchPerformed: true }); // Reset images, page, term, and set searchPerformed
    }

    this.setState({ loading: true });

    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: term,
          page: this.state.page,
          per_page: 30,
        },
        headers: {
          Authorization: 'Client-ID ' + this.API_KEY,
        },
      });

      this.setState((prevState) => ({
        images: [...prevState.images, ...response.data.results],
        page: prevState.page + 1,
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching images', error);
      this.setState({ loading: false });
    }
  };

  handleScroll = () => {
    // Scroll detection logic for loading more images
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !this.state.loading
    ) {
      this.onSearchSubmit(this.state.term, false);
    }

    // Show or hide scroll-to-top button based on scroll position
    if (window.scrollY > 300) {
      this.setState({ showScrollTopButton: true });
    } else {
      this.setState({ showScrollTopButton: false });
    }
  };

  onImageClick = (image) => {
    this.setState({ selectedImage: image });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
  };

  render() {
    return (
      <div className="app">
        <Navbar /> {/* Add Navbar here */}
        <SearchField userSubmit={this.onSearchSubmit} />
        {this.state.searchPerformed && (
          <span className="image-counter">Found: {this.state.images.length} images</span>
        )}
        <ImageList foundImages={this.state.images} onImageClick={this.onImageClick} />
        {this.state.loading && <div className="loading">Loading more images...</div>}
        <Modal selectedImage={this.state.selectedImage} closeModal={this.closeModal} />

        {/* Scroll to Top Button */}
        {this.state.showScrollTopButton && (
          <button className="scroll-to-top" onClick={this.scrollToTop}>
            ↑ Top
          </button>
        )}
      </div>
    );
  }
}

export default App;
