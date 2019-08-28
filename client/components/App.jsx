import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Gallery from './Gallery.jsx';

const Header = styled.h2`
  padding-bottom: 20px;
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
    axios.get(`/api${window.location.pathname}images`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        this.setState({ images: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { images } = this.state;
    return (
      <div>
        <Header>{images.length} Photos</Header>
        <Gallery images={images} />
      </div>
    );
  }
}

export default App;
