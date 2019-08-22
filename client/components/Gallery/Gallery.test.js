import React from 'react';
import { shallow } from 'enzyme';

import Gallery from './Gallery.jsx';


describe('Gallery', () => {
  test('testing', () => {
    fetch('/benu', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((images) => {
       const wrapper = shallow(
        <Gallery images={images}/>
       );
       expect(wrapper).toMatchSnapshot();
    });
  });
});