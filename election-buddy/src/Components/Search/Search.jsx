import React from 'react';
import {Link} from 'react-router-dom';
import CandidateFunctions from '../../API/CandidateFunctions';
import UserFunctions from '../../API/UserFunctions';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
    }
  
    state = {
        generalNews:[]
    };

    render() {
        return (
            <div>
                Search Results:
            </div>
        )
    }
}