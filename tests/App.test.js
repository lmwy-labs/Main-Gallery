/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../client/components/App.jsx';

describe('App', () => {
  test('should render the Gallery component upon its own render', () => {
    const wrapper = mount(<App path="/restaurants/r1/" />);
    expect(wrapper.prop('path')).toBe('/restaurants/r1/');
    setTimeout(() => {
      expect(wrapper.find('Gallery').exists()).toBe(true);
    });
  });

  test('should not render the gallery or header if the restaurant has no images or if an error occurs', () => {
    let wrapper = mount(<App path="/restaurants/noImagesHere/" />);
    setTimeout(() => {
      expect(wrapper.find('Gallery').exists()).toBe(false);
      expect(wrapper.find('Header').exists()).toBe(false);
    });

    wrapper = mount(<App path="/restaurants/willThrowError/" />);
    setTimeout(() => {
      expect(wrapper.find('Gallery').exists()).toBe(false);
      expect(wrapper.find('Header').exists()).toBe(false);
    });
  });

  test('should render a header that indicates how many photos the restaurant has in the database', () => {
    const wrapper = shallow(<App path="/restaurants/r1/" />);
    setTimeout(() => {
      expect(wrapper.find('Header').text()).toBe('11 Photos');
    });
  });
});
