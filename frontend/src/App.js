import React from 'react'
// import Header from './components/Header';
import Login from './components/Login';

const App = () => {
  return (
    <div className='container h-100 mw-100 px-0 mx-0'>
      <div className='row w-full h-100'>
        <div className='col-6 gap-4 bg-dark d-flex flex-column align-items-center justify-content-center'>
          <img
                src={process.env.PUBLIC_URL + '/hris-logo.png'}
                className="w-25"
                alt="React Bootstrap logo"
          />
          <h1 className="display-6 fs-2 text-light">Human Resource Information System</h1>
          <small className='text-light text-center px-3 opacity-50'>
          The Human Resource Information System (HRIS) project aims to streamline and modernize personnel data management through software implementation. By centralizing HR functions and digitizing processes such as recruitment, payroll, and benefits administration, the project enhances efficiency and empowers employees with self-service capabilities.
          </small>
        </div>
        <div className='col-6 d-flex justify-content-center align-items-center'>
          <Login />
        </div>
      </div>
    </div>
  )
}

export default App