import React from 'react';

function ErrorPage(props) {
  return (

      <div className="container">
        <div className="sec_main">
          <div className="sec_main_wrapper">
            <h2 className="sub_heading">Error</h2>
            <p>{props.message}</p>
          </div>
        </div>
      </div>
  );
}

export default ErrorPage;
