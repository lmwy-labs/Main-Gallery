import React from 'react';

const Gallery = ({ images }) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="picture-row">
      <div className="picture-column">
        <img src={images[0].url} height="138.77" width="138.77"></img>
        <img src={images[1].url} height="138.77" width="138.77"></img>
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
        <img src={images[8].url} height="91.84" width="91.84"
             className="picture-last">
        </img>
      </div>
    </div>  
  );
}

export default Gallery;