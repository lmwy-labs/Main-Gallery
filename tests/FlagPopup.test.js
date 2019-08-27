/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import { shallow, mount } from 'enzyme';
import React from 'react';
import FlagPopup from '../client/components/FlagPopup.jsx';

describe('FlagPopup', () => {
  test('should render a Container, Header, three Buttons, and Cancel Button upon its own render', () => {
    const wrapper = shallow(<FlagPopup />);
    expect(wrapper.find('Container').length).toEqual(1);
    expect(wrapper.find('Header').length).toEqual(1);
    expect(wrapper.find('Button').length).toEqual(3);
    expect(wrapper.find('CancelButton').length).toEqual(1);
  });

  test('should invoke handleClick when any of the buttons are clicked', () => {
    let wrapper = mount(<FlagPopup />);
    wrapper.props().closeFlagPopup();

    wrapper = mount(<FlagPopup closeFlagPopup={jest.fn()} />);
    wrapper.find('Button').at(0).simulate('click');
    wrapper.find('Button').at(1).simulate('click');
    wrapper.find('Button').at(2).simulate('click');
    wrapper.find('CancelButton').first().simulate('click');
    expect(wrapper.props().closeFlagPopup).toHaveBeenCalledTimes(4);
  });
});
