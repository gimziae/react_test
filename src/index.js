import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 라우터 설정
import {HashRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    
    {/* 라우터 태그로 감싸준다 */}
    <HashRouter>
      <App />
    </HashRouter>

  </React.StrictMode>,
  document.getElementById('root')
);


