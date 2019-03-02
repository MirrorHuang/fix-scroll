import React from 'react';
import FixScroll from '../src/FixScroll';
import './index.scss';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    const list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    return (
      <div className='main'>
        <div className="fix-scroll">
          fixElement    
        </div>
          <FixScroll
            ref={this.scrollRef}
          >
          <img
              src="http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg"
              className="image"
            />
            {list.map((item,index)=>(
              <div key={index}>{item}</div>
            ))}
          </FixScroll>
      </div>
    );
  }
}