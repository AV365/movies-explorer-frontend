import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import Preloader from "./components/Preloader/Preloader";

 const LoadingIndicator = props => {
       const { promiseInProgress } = usePromiseTracker();

       return (
           promiseInProgress && <Preloader/>
       );
     }

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <LoadingIndicator/>
          <App />


      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
