import React from 'react';
import PropTypes from 'prop-types';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.closePopupGallery = this.closePopupGallery.bind(this);
  }

  handleClick(e) {
    this.setState({
      selected: e.target.id,
    });
  }

  handleNextClick() {
    const { selected } = this.state;
    const { images } = this.props;
    if (selected == images.length - 1) {
      return;
    }

    this.setState({
      selected: Number(selected) + 1,
    });
  }

  handlePreviousClick() {
    const { selected } = this.state;
    if (selected == 0) {
      return;
    }
    this.setState({
      selected: selected - 1,
    });
  }

  closePopupGallery() {
    this.setState({
      selected: '',
    });
  }

  render() {
    const { images } = this.props;
    console.log(images);
    const { selected } = this.state;
    console.log(selected);
    if (images.length === 0) {
      return null;
    }

    let bigImage;
    if (selected !== '') {
      bigImage = (
        <div>
          <div className="grey-out" />
          <div className="pop-out-container">
            <button type="button" className="previous-image-button" onClick={this.handlePreviousClick}>{'<'}</button>
            <img className="big-image" src={images[selected].url} height="526" width="526" />
            <button type="button" className="tiny-flag">Flag</button>
            <button type="button" className="next-image-button" onClick={this.handleNextClick}>{'>'}</button>
            <button type="button" onClick={this.closePopupGallery} className="close-pop-out">X</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        {bigImage === undefined ? <div /> : bigImage}
        <div className="picture-row">
          <div className="picture-column">
            <img className="picture-double" onClick={this.handleClick} id={0} src={images[0].url} />
            <img className="picture-double" onClick={this.handleClick} id={1} src={images[1].url} />
          </div>
          <div className="picture-column">
            <img className="picture-single" onClick={this.handleClick} id={2} src={images[2].url} />
          </div>
          <div className="picture-column">
            <img className="picture-triple" onClick={this.handleClick} id={3} src={images[3].url} />
            <img className="picture-triple" onClick={this.handleClick} id={4} src={images[4].url} />
            <img className="picture-triple" onClick={this.handleClick} id={5} src={images[5].url} />
          </div>
          <div className="picture-column">
            <img className="picture-triple" onClick={this.handleClick} id={6} src={images[6].url} />
            <img className="picture-triple" onClick={this.handleClick} id={7} src={images[7].url} />
            <img className="picture-last picture-triple" onClick={this.handleClick} id={8} src={images[8].url} />
          </div>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

Gallery.defaultProps = {
  images: [],
};

export default Gallery;
