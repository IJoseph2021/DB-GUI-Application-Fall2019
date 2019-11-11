import React from 'react';
import './CandidatePage.css';
import Candidate from './Candidate';

export class CandidatePage extends React.Component {

    state = {
        candidateName: 'Donald Trump',
        party: 'Republican',
        candidateInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium aenean pharetra magna ac placerat vestibulum lectus. Arcu cursus euismod quis viverra nibh cras. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Semper quis lectus nulla at volutpat diam ut venenatis. Amet tellus cras adipiscing enim eu turpis egestas. Sagittis id consectetur purus ut faucibus pulvinar. Volutpat lacus laoreet non curabitur. Velit ut tortor pretium viverra suspendisse. Cras ornare arcu dui vivamus. Quis lectus nulla at volutpat diam ut. Felis eget nunc lobortis mattis. Platea dictumst vestibulum rhoncus est. Turpis egestas integer eget aliquet nibh praesent tristique. At imperdiet dui accumsan sit amet nulla facilisi. Eu tincidunt tortor aliquam nulla facilisi. Amet volutpat consequat mauris nunc congue.',
        candidateNews: ['This is a fun piece of news', 'Heres some more news',  'Wow! Even more news!', 'So much news this is crazy'],
        questions: []
    };

    render () {
        return ( 
            <div>
                <div className="header-republican">
                    <h1 style={{color: 'black'}}>{this.state.candidateName}</h1>
                    <h3 style={{color: 'black'}}>{this.state.party}</h3>
                </div>

                <div className="candidateInfo">

                </div>
            </div>  
        )
    }
}
