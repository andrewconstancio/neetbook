import React, { Component } from 'react'
import BookSection from '../../components/BookSection';

export default class AllBooksBySubject extends Component {
    render() {
        return (
            <div className="center">
                <BookSection subject={this.props.match.params.name} limit={100}/>
            </div>
        )
    }
}

