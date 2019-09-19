import React from 'react';
import axios from 'axios';
import Gallery from './Gallery.jsx';

const Header = styled.h2`
  padding-bottom: 20px;
  font-family: BrandonText-Black;
`;

Header.displayName = 'Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
    this.getImages = this.getImages.bind(this);
  }

  componentDidMount() {
    this.getImages();
  }

  getImages() {
    axios.get(`http://localhost:3002/api${window.location.pathname}images`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        this.setState({ images: response.data });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ images: [] });
      });
  }

  render() {
    const { images } = this.state;

    if (images.length === 0) {
      return null;
    }

    return (
      <div>
        <Header>
          {images.length}
          {' '}
Photos
        </Header>
        <Gallery images={images} />
      </div>
    );
  }
}

window.Gallery = App;
export default App;
