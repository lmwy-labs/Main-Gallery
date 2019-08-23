import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Gallery from './Gallery.jsx';


describe('Gallery', () => {
  it('renders nothing when passed an empty images array', () => {
    const wrapper = shallow(
      <Gallery images={[]} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.type()).toEqual(null);
  });

  const testData = [
    { url: 'mockUrl' },
    { url: 'mockUrl' },
    { url: 'mockUrl' },
    { url: 'mockUrl' },
    { url: 'mockUrl' },
    { url: 'mockUrl' },
    { url: 'mockUrl' },
    { url: 'mockUrl' },
    { url: 'mockUrl' },
  ];

  it('renders 9 image elements when passed an images array of length 9 or more', () => {
    const wrapper = shallow(
      <Gallery images={testData} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('img').length).toEqual(9);
    testData.push({ url: 'mockUrl' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('img').length).toEqual(9);
  });

  it('handles a click event on the first image in the static gallery', () => {
    const wrapper = shallow(
      <Gallery images={testData} />,
    );
    const image = wrapper.find('img').first();
    image.props().onClick({
      target: {
        id: 1,
      },
    });
    
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.state('selected')).toEqual(1);
  });
});
