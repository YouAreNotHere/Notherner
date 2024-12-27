import './App.scss';
import { Navigation } from './ui';
import { Provider } from 'react-redux';
import { persistor, store } from '../reducers/index';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <div className='App'>
      <Navigation />
    </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
