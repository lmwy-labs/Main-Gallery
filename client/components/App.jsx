import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropType from 'prop-types';
import Gallery from './Gallery.jsx';

const Header = styled.h2`
  padding-bottom: 20px;
`;

Header.displayName = 'Header';

const ErrorDiv = styled.div`
`;

ErrorDiv.displayName = 'ErrorDiv';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      hasError: false,
    };
    this.getImages = this.getImages.bind(this);
  }

  componentDidMount() {
    this.getImages();
  }

  getImages() {
    const { path } = this.props;
    axios.get(`/api${path}images`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        this.setState({ images: response.data });
      })
      .catch(() => {
        this.setState({ hasError: true });
      });
  }

  render() {
    const { images, hasError } = this.state;
    return (
      <div>
        <Header>{images.length} Photos</Header>
        {hasError ? <ErrorDiv /> : <Gallery images={images} />}
      </div>
    );
  }
}

App.propTypes = {
  path: PropType.string.isRequired,
};

export default App;
