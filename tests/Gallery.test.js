/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Gallery from '../client/components/Gallery.jsx';

describe('Gallery', () => {
  test('should render nothing when passed an empty images array', () => {
    const wrapper = shallow(
      <Gallery images={[]} />,
    );
    expect(wrapper.type()).toEqual(null);
  });

  const testData = [
    { url: 'mockUrl0' },
    { url: 'mockUrl1' },
    { url: 'mockUrl2' },
    { url: 'mockUrl3' },
    { url: 'mockUrl4' },
    { url: 'mockUrl5' },
    { url: 'mockUrl6' },
    { url: 'mockUrl7' },
    { url: 'mockUrl8' },
  ];

  test('should render 9 image elements when passed an images array of length 9 or more', () => {
    const wrapper = shallow(
      <Gallery images={testData} />,
    );
    expect(wrapper.find('ImgDouble').length).toEqual(2);
    expect(wrapper.find('ImgTriple').length).toEqual(5);
    expect(wrapper.find('ImgSingle').length).toEqual(1);
    expect(wrapper.find('ImgLast').length).toEqual(1);

    testData.push({ url: 'mockUrl9' });
    expect(wrapper.find('ImgDouble').length).toEqual(2);
    expect(wrapper.find('ImgTriple').length).toEqual(5);
    expect(wrapper.find('ImgSingle').length).toEqual(1);
    expect(wrapper.find('ImgLast').length).toEqual(1);
  });

  test('should handle a click event on all images in the static gallery', () => {
    const wrapper = shallow(
      <Gallery images={testData} />,
    );

    let image;
    for (let i = 0; i < 2; i += 1) {
      image = wrapper.find('ImgDouble').at(i);
      image.props().onClick({
        target: {
          id: i,
        },
      });
      expect(wrapper.find('ImgBig').props().src).toBe(`mockUrl${i}`);
      wrapper.find('XButtonPopup').simulate('click');
    }

    image = wrapper.find('ImgSingle').at(0);
    image.props().onClick({
      target: {
        id: 2,
      },
    });
    expect(wrapper.find('ImgBig').props().src).toBe('mockUrl2');
    wrapper.find('XButtonPopup').simulate('click');

    for (let i = 0; i < 5; i += 1) {
      image = wrapper.find('ImgTriple').at(i);
      image.props().onClick({
        target: {
          id: i + 3,
        },
      });
      expect(wrapper.find('ImgBig').props().src).toBe(`mockUrl${i + 3}`);
      wrapper.find('XButtonPopup').simulate('click');
    }

    image = wrapper.find('ImgLast').at(0);
    image.props().onClick({
      target: {
        id: 8,
      },
    });
    expect(wrapper.find('ImgBig').props().src).toBe('mockUrl8');
  });

  test('should handle click events on the previous, next, and X buttons in the popup gallery', () => {
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
    expect(wrapper.find('ImgBig').props().src).toBe('mockUrl0');

    nextButton.simulate('click');
    expect(wrapper.find('ImgBig').props().src).toBe('mockUrl1');

    for (let i = 0; i < 8; i += 1) {
      nextButton.simulate('click');
    }

    expect(wrapper.find('ImgBig').props().src).toBe('mockUrl9');

    nextButton.simulate('click');
    expect(wrapper.find('ImgBig').props().src).toBe('mockUrl9');

    closePopoutDiv.simulate('click');
    expect(wrapper.find('.big-image').length).toEqual(0);
  });

  test('should handle keypress events to navigate through the popup gallery', () => {
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

    expect(wrapper.find('ImgBig').props().src).toBe('mockUrl0');

    map.keydown({ key: 'ArrowRight' });
    expect(wrapper.find('ImgBig').props().src).toBe('mockUrl1');

    map.keydown({ key: 'A' });
    expect(wrapper.find('ImgBig').props().src).toBe('mockUrl1');

    map.keydown({ key: 'ArrowLeft' });
    expect(wrapper.find('ImgBig').props().src).toBe('mockUrl0');
  });

  test('should render a flag popup when the flag button is clicked and has desired interactions with gallery navigation buttons', () => {
    const wrapper = shallow(
      <Gallery images={testData} />,
    );
    expect(wrapper.find('FlagPopup').length).toBe(0);

    const image = wrapper.find('ImgDouble').first();
    image.props().onClick({
      target: {
        id: 1,
      },
    });

    wrapper.find('ButtonFlag').first().simulate('click');
    expect(wrapper.find('FlagPopup').length).toBe(1);
    expect(typeof wrapper.find('FlagPopup').props().closeFlagPopup).toBe('function');
    expect(wrapper.find('ImgBig').props().src).toBe('mockUrl1');

    const nextButton = wrapper.find('ButtonNextImage');
    nextButton.simulate('click');
    expect(wrapper.find('ImgBig').props().src).toBe('mockUrl1');

    const previousButton = wrapper.find('ButtonPreviousImage');
    previousButton.simulate('click');
    expect(wrapper.find('ImgBig').props().src).toBe('mockUrl1');

    wrapper.find('XButtonPopup').simulate('click');
    expect(wrapper.find('FlagPopup').length).toBe(0);

    image.props().onClick({
      target: {
        id: 0,
      },
    });

    expect(wrapper.find('FlagPopup').length).toBe(0);

    wrapper.find('ButtonFlag').first().simulate('click');
    expect(wrapper.find('FlagPopup').length).toBe(1);

    wrapper.instance().closeFlagPopup();
    expect(wrapper.find('FlagPopup').length).toBe(0);
  });
});
