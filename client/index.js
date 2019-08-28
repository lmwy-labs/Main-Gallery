import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(<App path={window.location.pathname} />, document.getElementById('root'));
