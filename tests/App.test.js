/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import axios from 'axios';
import App from '../client/components/App.jsx';

describe('App', () => {
  it('should render properly, with component did mount calling getImages', () => {
    axios.get = () => (
      Promise.resolve('success')
    );

    // eslint-disable-next-line react/jsx-filename-extension
    let wrapper = shallow(<App />);
    axios.get = () => (
      Promise.reject('failure')
    );
    wrapper = shallow(<App />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
