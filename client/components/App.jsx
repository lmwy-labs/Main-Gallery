import React from 'react';
import axios from 'axios';
import Gallery from './Gallery.jsx';

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
      <Gallery images={images} />
    );
  }
}

export default App;
