/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/components/App.jsx';

describe('App', () => {
  test('should render the Gallery component upon its own render', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Gallery').props().images).toEqual([]);
  });
  test('should render a header that indicates how many photos the restaurant has in the database', () => {
    const wrapper = shallow(<App />);
    setTimeout(() => {
      expect(wrapper.find('Header').text()).toBe('11 Photos');
    });
  });
});
