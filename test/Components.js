import React from 'react';


export class EmptyList extends React.Component {
    constructor(...args) {
        super(...args);

        this.getNameCalled = 0;
    }

    render() {
        return (
            <ul className="empty-list">
            </ul>
        );
    }

    getName() {
        this.getNameCalled += 1;

        return 'Empty';
    }
}

export class LargeList extends React.Component {
    constructor(...args) {
        super(...args);

        this.getNameCalled = 0;
        this.config = {large: true};
    }

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
        this.getNameCalled += 1;

        return 'Large';
    }
}

export class SmallList extends React.Component {
    constructor(...args) {
        super(...args);

        this.getNameCalled = 0;
    }

    render() {
        return (
            <ul className="small-list">
                <li className="small-list-item">1</li>
            </ul>
        );
    }

    getName() {
        this.getNameCalled += 1;

        return 'Small';
    }
}
