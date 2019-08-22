import React from 'react';
import { shallow } from 'enzyme';

import Gallery from './Gallery.jsx';


describe('Header', () => {
  test('testing', () => {
    const wrapper = shallow(
      <Gallery />
    );
    expect(wrapper).toMatchSnapshot();
  });
});