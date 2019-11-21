import React, { Component } from 'react';
import './HotTopic.css';


export default class HotTopic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hot Topic Here</h1>
        <div className="jumbotron">
          <h1 className="display-4">Topic to dicuss here</h1>
          <button type="button" class="btn btn-primary">Primary</button>
          <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-4"/>
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <p className="author">Skyler Tran</p>
          <hr className="my-4"/>
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <p className="author">Skyler Tran</p>
        </div>

        <div className="jumbotron">
          <h1 className="display-4">Topic to dicuss here</h1>
          <button type="button" class="btn btn-primary">Primary</button>
          <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-4"/>
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <p className="author">Skyler Tran</p>
          <hr className="my-4"/>
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <p className="author">Skyler Tran</p>
        </div>
      </div>
    );
  }
}
