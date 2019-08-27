import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  z-index: 3;
  position: fixed;
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 245.406px;
  left: 50%;
  top: 200px;
  margin-left: -200px;
`;

Container.displayName = 'Container';

const Button = styled.div`
  flex: 1;
  text-align: center;
  vertical-align: middle;
  background-color: #61bddb;
  color: white;
  margin: 2.5px 17px;
  border-radius: 3px;
  padding-top: 12px;
  cursor: pointer;
`;

Button.displayName = 'Button';

const CancelButton = styled(Button)`
  background-color: white;
  color: #61bddb;
`;

CancelButton.displayName = 'CancelButton';

const Header = styled.div`
  flex: 1;
  font-size: 20px;
  font-weight: strong;
  padding: 10px;
  border-bottom: solid 0.5px #DCDCDC;
  margin-bottom: 2px;
`;

Header.displayName = 'Header';

const FlagPopup = ({ closeFlagPopup }) => {
  const handleClick = () => {
    console.log('clicked');
    closeFlagPopup();
  };

  return (
    <Container>
      <Header>Report a photo problem</Header>
      <Button onClick={handleClick}>Unrelated to restaurant</Button>
      <Button onClick={handleClick}>Inappropriate content</Button>
      <Button onClick={handleClick}>I don't like this photo</Button>
      <CancelButton onClick={handleClick}>Cancel</CancelButton>
    </Container>
  );
};

FlagPopup.propTypes = {
  closeFlagPopup: PropTypes.func,
};

FlagPopup.defaultProps = {
  closeFlagPopup: () => {},
};

export default FlagPopup;
