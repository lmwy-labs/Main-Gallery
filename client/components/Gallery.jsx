import React from 'react';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      selected: e.target.id,
    });
  }
  
  handleNextClick() {
    if (this.state.selected == this.props.images.length - 1) {
      return;
    }

    this.setState({
      selected: Number(this.state.selected) + 1,
    });
  }

  handlePreviousClick() {
    if(this.state.selected == 0) {
      return;
    } 
    
    this.setState({
      selected: this.state.selected - 1,
    });
  }

  render() {
    const { images } = this.props;
    if (images.length === 0) {
      return null;
    }

    let bigImage;    
    if (this.state.selected !== '') {
      bigImage = (
        <div>
          <div className={"grey-out"}></div>
          <button className={"previous-image-button"} onClick={this.handlePreviousClick}>{'<'}</button>
          <img className={"big-image"} src={images[this.state.selected].url} height="526" width="526"></img>  
          <button className={"next-image-button"} onClick={this.handleNextClick}>></button>
        </div>
      );
    }

    return (
      <div>
        {bigImage === undefined ? <div></div> : bigImage}
        <div className="picture-row">
          <div className="picture-column">
            <img onClick={this.handleClick} id={0} src={images[0].url} height="138.77" width="138.77"></img>
            <img onClick={this.handleClick} id={1} src={images[1].url} height="138.77" width="138.77"></img>
          </div>
          <div className="picture-column">
            <img src={images[2].url} height="279.53" width="279.53"></img>
          </div>
          <div className="picture-column">
            <img src={images[3].url} height="91.84" width="91.84"></img>
            <img src={images[4].url} height="91.84" width="91.84"></img>
            <img src={images[5].url} height="91.84" width="91.84"></img>
          </div>
          <div className="picture-column">
            <img src={images[6].url} height="91.84" width="91.84"></img>
            <img src={images[7].url} height="91.84" width="91.84"></img>
            <div className="text-container">
              <img src={images[8].url} height="91.84" width="91.84"
                  className="picture-last">
              </img>
              <div className="centered">+ 91 more</div>
            </div>
          </div>
        </div>  
      </div>
    );
  } 
}

export default Gallery;