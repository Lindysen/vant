import Tag from '..';
import { mount } from '../../../test';

test('click event', () => {
  const click = jest.fn();
  const wrapper = mount(Tag, {
    context: {
      on: {
        click
      }
    }
  });

  wrapper.trigger('click');
  expect(click).toHaveBeenCalledTimes(1);
});

test('close event', () => {
  const close = jest.fn();
  const wrapper = mount(Tag, {
    propsData: {
      closeable: true
    },
    context: {
      on: {
        close
      }
    }
  });

  wrapper.find('.van-tag__close').trigger('click');
  expect(close).toHaveBeenCalledTimes(1);
});
