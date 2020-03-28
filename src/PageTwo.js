import React, { Component} from 'react';
import './PageTwo.css';


class PageTwo extends Component {
  state = {width: '1200px', height: '2100px'};  //100% & 250% was ok.

  iframe = () => {
    return {
      __html: '<iframe scrolling="no" src="graph.html" width=' + this.state.width + ' height=' + this.state.height + '></iframe>'
    }
  };

  render(){
    return (
      <div className="iframeWrapper" dangerouslySetInnerHTML={ this.iframe() } />
    );
  }
}

export default PageTwo;
