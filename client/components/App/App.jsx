import React from 'react';
import Gallery from '../Gallery/Gallery.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    fetch('/benu', {
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
