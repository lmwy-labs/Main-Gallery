import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import FlagPopup from '../client/components/FlagPopup.jsx';

describe('FlagPopup', () => {
  it('renders successfully', () => {
    const wrapper = shallow(<FlagPopup />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Container').length).toEqual(1);
    expect(wrapper.find('Button').length).toEqual(3);
    expect(wrapper.find('Header').length).toEqual(1);
    expect(wrapper.find('CancelButton').length).toEqual(1);
  });
  it('stops rendering when any of the buttons are clicked', () => {
    const wrapper = shallow(<FlagPopup />);
    wrapper.find('Button').first().simulate('click');
    console.log(wrapper.find('Button').length);
  });
});
