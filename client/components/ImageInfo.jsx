import React from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';

const Container = styled.div`
  z-index: 2;
  color: white;
`;

const Name = styled.div`
`;
Name.displayName = 'Name';

const Photographer = styled.div`
`;
Photographer.displayName = 'Photographer';

const Date = styled.div`
`;
Date.displayName = 'Date';

const Svg = styled.svg`
`;
Svg.displayName = 'Svg';

const ImageInfo = ({ image }) => {
  if (image.source === 'Restaurant') {
    return null;
  }

  if (image.source === 'Foodspotting') {
    return (
      <Container>
        <Name>{image.name}</Name>
        <Date>{image.date}</Date>
        <Photographer>Photo from {image.photographer} on Foodspotting</Photographer>
      </Container>
    );
  }

  if (image.source === 'OpenTable Diner') {
    return (
      <Container>
        <Svg height="50" width="50">
          <circle cx="25" cy="25" fill="#56D7D9" r="25" />
          <text dy=".3em" fill="white" fontFamily="Arial" fontSize="15px" textAnchor="middle" x="50%" y="50%">OT</text>
        </Svg>
        <Name>OpenTable Diner</Name>
        <Date>Dined on {image.date}</Date>
      </Container>
    );
  }
};

ImageInfo.propTypes = {
  image: PropType.objectOf(PropType.string),
};

ImageInfo.defaultProps = {
  image: {},
};

export default ImageInfo;
