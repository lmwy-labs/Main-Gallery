import React from 'react';
import { shallow } from 'enzyme';
import Gallery from './Gallery.jsx';


describe('Gallery', () => {
  it('renders nothing when passed an empty images array', () => {
    const wrapper = shallow(
      <Gallery images={[]} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.type()).toEqual(null);
  });
  
  const testData = [
    {url: 'test.com'},
    {url: 'test.com'},
    {url: 'test.com'},
    {url: 'test.com'},
    {url: 'test.com'},
    {url: 'test.com'},
    {url: 'test.com'},
    {url: 'test.com'},
    {url: 'test.com'},
  ];

  it('renders 9 image elements when passed an images array of length 9 or more', () => {
    const wrapper = shallow(
      <Gallery images={testData} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('img').length).toEqual(9);
  });
});
