/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: import explicitly to use the types shipped with jest.
import {render} from '@testing-library/react-native';
import {App} from '../src/app';

test.skip('renders correctly', async () => {
  const wrapper = () => (
    <App />
  );
  render(wrapper());
});