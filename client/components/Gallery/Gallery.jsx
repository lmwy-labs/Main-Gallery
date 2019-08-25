import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    const { selected } = this.state;
    if (images.length === 0) {
      return null;
    }

    let bigImage;
    if (selected !== '') {
      bigImage = (
        <div>
          <GreyBackground />
          <div>
            <ButtonPreviousImage onClick={this.handlePreviousClick}>{'<'}</ButtonPreviousImage>
            <ImgBig src={images[selected].url} />
            <ButtonFlag>P</ButtonFlag>
            <ButtonNextImage onClick={this.handleNextClick}>{'>'}</ButtonNextImage>
            <XButtonPopup onClick={this.closePopupGallery}>X</XButtonPopup>
          </div>
        </div>
      );
    }

    return (
      <div>
        {bigImage === undefined ? <div /> : bigImage}
        <Row>
          <Column>
            <ImgDouble onClick={this.handleClick} id={0} src={images[0].url} />
            <ImgDouble onClick={this.handleClick} id={1} src={images[1].url} />
          </Column>
          <Column>
            <ImgSingle onClick={this.handleClick} id={2} src={images[2].url} />
          </Column>
          <Column>
            <ImgTriple onClick={this.handleClick} id={3} src={images[3].url} />
            <ImgTriple onClick={this.handleClick} id={4} src={images[4].url} />
            <ImgTriple onClick={this.handleClick} id={5} src={images[5].url} />
          </Column>
          <Column>
            <ImgTriple onClick={this.handleClick} id={6} src={images[6].url} />
            <ImgTriple onClick={this.handleClick} id={7} src={images[7].url} />
            <ImgLast onClick={this.handleClick} id={8} src={images[8].url} />
          </Column>
        </Row>
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

const Img = styled.img`
  margin: 1px;
  cursor: pointer;
`;

const ImgDouble = styled(Img)`
  width: 138.57px;
  @media only screen and (max-width: 767px) {
    width: 19.6vw
  }
`;

ImgDouble.displayName = 'ImgDouble';

const ImgSingle = styled(Img)`
  width: 278.53px;
  @media only screen and (max-width: 767px) {
    width: 39.65vw
  }
`;

ImgSingle.displayName = 'ImgSingle';

const ImgTriple = styled(Img)`
  width: 91.84px;
  @media only screen and (max-width: 767px) {
    width: 13vw
  }
`;

ImgTriple.displayName = 'ImgTriple';

const ImgLast = styled(ImgTriple)`
  filter: brightness(50%);
  &:hover {
    filter: brightness(25%);
  }
  @media only screen and (max-width: 767px) {
    width: 13vw
  }
`;

ImgLast.displayName = 'ImgLast';

const ImgBig = styled.img`
  position: fixed;
  width: 526px;
  top: 35px;
  left: 50%;
  margin-left: -263px;
  z-index: 2;
`;

ImgBig.displayName = 'ImgBig';

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column
`;

const GreyBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color:black;
  opacity: 0.9;
`;

const ButtonGalleryNav = styled.div`
  z-index: 2;
  position: fixed;
  top: 300px;
  color: #91949a;
  cursor: pointer;
  font-size:25px;
  :hover {
    filter: brightness(75%);
  }
  left: 50%;
`;

const ButtonPreviousImage = styled(ButtonGalleryNav)`
  margin-left: -314px;
`;

ButtonPreviousImage.displayName = 'ButtonPreviousImage';

const ButtonNextImage = styled(ButtonGalleryNav)`
  margin-left: 300px;
`;

ButtonNextImage.displayName = 'ButtonNextImage';

const ButtonFlag = styled.div`
  z-index: 2;
  position: fixed;
  top: 560px;
  left: 50%;
  margin-left: 280px;
  color: white;
  font-size: 30px;
  font-family: pantheon;
  cursor: default;
  font-weight: bold;
`;

const XButtonPopup = styled.div`
  z-index: 2;
  position: fixed;
  top: 20px;
  right: 10px;
  color: white;
  cursor: pointer;
`;

XButtonPopup.displayName = 'XButtonPopup';
