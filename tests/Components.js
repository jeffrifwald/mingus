import React from 'react';


export class EmptyList extends React.Component {
    render() {
        return (
            <ul className="empty-list">
            </ul>
        );
    }

    getName() {
        return 'Empty';
    }
}

export class LargeList extends React.Component {
    render() {
        return (
            <ul className="large-list">
                <li className="large-list-item">1</li>
                <li className="large-list-item">2</li>
                <li className="large-list-item">3</li>
            </ul>
        );
    }

    getName() {
        return 'Large';
    }
}

export class SmallList extends React.Component {
    render() {
        return (
            <ul className="small-list">
                <li className="small-list-item">1</li>
            </ul>
        );
    }

    getName() {
        return 'Small';
    }
}
