import { useState } from 'react';
import './Navbar.css';
import menuIcon from '../Assets/images/menu.svg'; // Default import for the SVG as a URL

const NavBar = () => {
  const [isMenuModalVisible, setMenuModalVisible] = useState(false);
  const [isContactModalVisible, setContactModalVisible] = useState(false);

  const handleHomeClick = () => {
    window.location.reload();
  };

  const toggleMenuModal = () => {
    setMenuModalVisible(!isMenuModalVisible);
  };

  const toggleContactModal = () => {
    setContactModalVisible(!isContactModalVisible);
  };

  return (
    <div className="navbar">
      <div className="navbar__left">
      <img src={menuIcon} alt="Menu" className="menu-button" onClick={toggleMenuModal} />
      </div>
      <div className="navbar__right">
        <span className="navbar__item" onClick={handleHomeClick}>Home</span>
        <span className="navbar__item" onClick={toggleContactModal}>Contact</span>
      </div>

      {/* Menu Modal */}
      {isMenuModalVisible && (
        <div className="overlay show">
          <div className="popup">
            <h2>Menu</h2>
            <button className="close" onClick={toggleMenuModal}>
              &times;
            </button>
            <div className="content">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://www.github.com" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {isContactModalVisible && (
        <div className="overlay light show" onClick={toggleContactModal}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Contact</h2>
            <div className="content">
              <a href="mailto:youremail@example.com">Email</a>
              <a href="tel:+1234567890">Phone</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
