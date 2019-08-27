/* eslint-disable react/jsx-filename-extension */
import { mount } from 'enzyme';
import React from 'react';
import ImageInfo from '../client/components/ImageInfo.jsx';

describe('ImageInfo', () => {
  const testData = [
    { source: 'Restaurant' },
    { source: 'Foodspotting' },
    { source: 'OpenTable Diner' },
  ];

  test('should render nothing if the source is restaurant', () => {
    const wrapper = mount(<ImageInfo image={testData[0]} />);
    expect(wrapper.props().image.source).toBe('Restaurant');
    expect(wrapper.text()).toBe('');
  });

  test('should render the image name, date, photographer name if the source is Foodspotting', () => {
    const wrapper = mount(<ImageInfo image={testData[1]} />);
    expect(wrapper.props().image.source).toBe('Foodspotting');
    expect(wrapper.find('Name').length).toBe(1);
    expect(wrapper.find('Date').length).toBe(1);
    expect(wrapper.find('Photographer').length).toBe(1);
  });

  test('should render the logo, OpenTable Diner header, and date if the source if OpenTable Diner', () => {
    const wrapper = mount(<ImageInfo image={testData[2]} />);
    expect(wrapper.props().image.source).toBe('OpenTable Diner');
    expect(wrapper.find('Svg').length).toBe(1);
    expect(wrapper.find('Name').length).toBe(1);
    expect(wrapper.find('Date').length).toBe(1);
  });
});
