/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../client/components/App.jsx';

describe('App', () => {
  test('should render the Gallery component upon its own render', () => {
    const wrapper = mount(<App path="/restaurants/r1/" />);
    expect(wrapper.props().path).toBe('/restaurants/r1/');
    expect(wrapper.find('Gallery').length).toBe(1);
  });

  test('should display an error div if the restaurant id is not present in the database', () => {
    const wrapper = mount(<App path="/restaurants/r101/" />);
    setTimeout(() => {
      expect(wrapper.find('ErrorDiv').length).toBe(1);
    });
  });

  test('should render a header that indicates how many photos the restaurant has in the database', () => {
    const wrapper = shallow(<App path="/restaurants/r1/" />);
    setTimeout(() => {
      expect(wrapper.find('Header').text()).toBe('11 Photos');
    });
  });
});
