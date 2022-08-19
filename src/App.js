import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './app/store'
import { Grommet } from 'grommet';
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

import { listen } from './app/listener';

// components
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import Login from './pages/Login';

const theme = {
  global: {
    breakpoints: {
      xsmall: {
        value: 500,
      },
      small: {
        value: 900,
      },
      medium: undefined,
      middle: {
        value: 2000,
      },
    },
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
    button: {
      default: {
        border: undefined,
      }
    }
  }
}

function App() {
  useEffect(() =>{
    listen()
  }, [])

  return (
    <Provider store={store}>
      <Grommet theme={theme} full>
        <HashRouter>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/register/berhasil' element={<RegisterSuccess />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </HashRouter>
      </Grommet>
    </Provider>
  );
}

export default App;
