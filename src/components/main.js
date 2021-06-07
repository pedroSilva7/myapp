import React from 'react';
import {GridContent} from './gridContent';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

  }

    render() {
        return (
          <div className='container'>
            <GridContent/>
          </div>
        );
    }
}
