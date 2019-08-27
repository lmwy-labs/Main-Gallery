/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Gallery from '../client/components/Gallery.jsx';

describe('Gallery', () => {
  it('renders nothing when passed an empty images array', () => {
    const wrapper = shallow(
      // eslint-disable-next-line react/jsx-filename-extension
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
    expect(wrapper.find('ImgDouble').length).toEqual(2);
    expect(wrapper.find('ImgTriple').length).toEqual(5);
    expect(wrapper.find('ImgSingle').length).toEqual(1);
    expect(wrapper.find('ImgLast').length).toEqual(1);
    testData.push({ url: 'mockUrl' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('handles a click event on the first image in the static gallery', () => {
    const wrapper = shallow(
      <Gallery images={testData} />,
    );
    const image = wrapper.find('ImgDouble').first();
    image.props().onClick({
      target: {
        id: 1,
      },
    });

    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.state('selected')).toEqual(1);
  });

  it('handles click events on the previous, next, and X buttons in the popup gallery', () => {
    const wrapper = shallow(
      <Gallery images={testData} />,
    );
    const image = wrapper.find('ImgDouble').first();
    image.props().onClick({
      target: {
        id: 0,
      },
    });
    const nextButton = wrapper.find('ButtonNextImage');
    const previousButton = wrapper.find('ButtonPreviousImage');
    const closePopoutDiv = wrapper.find('XButtonPopup');

    previousButton.simulate('click');
    expect(wrapper.state('selected')).toEqual(0);
    nextButton.simulate('click');
    expect(wrapper.state('selected')).toEqual(1);
    for (let i = 0; i < 8; i += 1) {
      nextButton.simulate('click');
    }

    expect(wrapper.state('selected')).toEqual(9);
    nextButton.simulate('click');
    expect(wrapper.state('selected')).toEqual(9);

    closePopoutDiv.simulate('click');
    expect(wrapper.find('.big-image').length).toEqual(0);
  });

  it('handles keypress events to navigate through the popup gallery', () => {
    const wrapper = shallow(
      <Gallery images={testData} />,
    );
    const image = wrapper.find('ImgDouble').first();
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    image.props().onClick({
      target: {
        id: 0,
      },
    });
    expect(wrapper.state('selected')).toEqual(0);
    map.keydown({ key: 'ArrowRight' });
    expect(wrapper.state('selected')).toEqual(1);
    map.keydown({ key: 'ArrowLeft' });
    expect(wrapper.state('selected')).toEqual(0);
    map.keydown({ key: 'A' });
    expect(wrapper.state('selected')).toEqual(0);
  });

  it('renders a flag popup when the flag button is clicked', () => {
    const wrapper = shallow(
      <Gallery images={testData} />,
    );
    const flagPopup = wrapper.find('FlagPopup');
    expect(flagPopup.length).toBe(0);
    const image = wrapper.find('ImgDouble').first();
    image.props().onClick({
      target: {
        id: 1,
      },
    });
    const flagButton = wrapper.find('ButtonFlag');
    flagButton.simulate('click');
    expect(wrapper.find('FlagPopup').length).toBe(1);
    expect(wrapper.state('selected')).toEqual(1);
    const nextButton = wrapper.find('ButtonNextImage');
    nextButton.simulate('click');
    expect(wrapper.state('selected')).toEqual(1);
    const previousButton = wrapper.find('ButtonPreviousImage');
    previousButton.simulate('click');
    expect(wrapper.state('selected')).toEqual(1);
    wrapper.find('XButtonPopup').simulate('click');
    expect(wrapper.find('FlagPopup').length).toBe(0);
    image.props().onClick({
      target: {
        id: 0,
      },
    });
    expect(wrapper.find('FlagPopup').length).toBe(0);
  });
});
