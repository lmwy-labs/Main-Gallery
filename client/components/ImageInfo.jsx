import React from 'react';
import PropType from 'prop-types';
import convertDate from '../utils/convertDate.js';

const Container = styled.div`
  z-index: 2;
  color: white;
  margin-top: -30px;
  font-family: Brandon;
`;

const Photographer = styled.div`
  margin-left: -30px;
  font-size: 15px;
`;

Photographer.displayName = 'Photographer';

const Name = styled.div`
  margin-left: -30px;
  font-weight: bold;
`;

Name.displayName = 'Name';

const Date = styled.span`
  padding-left: 5px;
  font-weight: normal;
`;

Date.displayName = 'Date';

const OTName = styled.div`
  font-weight: bold;
  margin-top: -45px;
  margin-left: 30px;
`;
OTName.displayName = 'OTName';

const OTDate = styled.div`
  padding-top: 10px;
  margin-left: 30px;
`;
OTDate.displayName = 'OTDate';

const Svg = styled.svg`
  margin-left: -25px;
`;
Svg.displayName = 'Svg';

const ImageInfo = ({ image }) => {
  if (image.source === 'Foodspotting') {
    return (
      <Container>
        <Name>
          {image.name}
          <Date>{convertDate(image.date, '.')}</Date>
        </Name>
        <Photographer>
Photo from
          {' '}
          {image.photographer}
          {' '}
on Foodspotting
                </Photographer>
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
        <OTName>OpenTable Diner</OTName>
        <OTDate>
Dined on
          {' '}
          {convertDate(image.date, ',')}
                </OTDate>
      </Container>
    );
  }

  return null;
};

ImageInfo.propTypes = {
  image: PropType.shape({
    date: PropType.string,
    name: PropType.string,
    __v: PropType.number,
    _id: PropType.string,
    photographer: PropType.string,
    restaurantId: PropType.string,
    url: PropType.string,
    source: PropType.string,
  }),
};

ImageInfo.defaultProps = {
  image: {},
};

export default ImageInfo;
