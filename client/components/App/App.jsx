import React from 'react';
import Gallery from '../Gallery/Gallery.jsx';

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
    fetch(`/api${window.location.pathname}images`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((images) => {
      this.setState({ images });
    });
  }

  render() {
    return (
      <Gallery images={this.state.images}/> 
    );
  }
}

export default App;
