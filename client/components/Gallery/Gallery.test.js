import React from 'react';
import { shallow } from 'enzyme';
import Gallery from './Gallery.jsx';


describe('Gallery', () => {
  test('testing', () => {
    const wrapper = shallow(
      <Gallery images={[]}/>
      );
      expect(wrapper).toMatchSnapshot();
  });
});