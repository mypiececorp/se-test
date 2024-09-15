jest.mock('mobx-react-lite', () => ({
  observer: jest.fn(component => component),
}));
