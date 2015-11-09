import chai from 'chai';
import mocha from 'mocha';
import React from 'react';

import {
    clearPatches,
    clearSpies,
    clearStubs,
    fakeRequire,
    getHooks,
    initTests,
    patch,
    spy,
    stub,
    throwAssertionError
} from './helpers';


const Mingus = {
    after: mocha.after,
    afterEach: mocha.afterEach,
    before: mocha.before,
    beforeEach: mocha.beforeEach,
    it: mocha.it
};

export class TestCase {
    constructor(name={}, config={}) {
        this.Mingus = Mingus;
        this.patches = [];
        this.spies = [];
        this.stubs = [];
        this.name = name;
        this.config = config;
        this.hooks = getHooks(this);
    }

    assertCallCount(fn, n) {
        throwAssertionError(
            fn.callCount !== n,
            `expected call count to be ${n}, but was ${fn.callCount}`
        );
    }

    assertCalledWith(fn, ...args) {
        throwAssertionError(
            !fn.calledWith(...args),
            `expected to be called with ${JSON.stringify(args)}`
        );
    }

    assertCalledOnceWith(fn, ...args) {
        throwAssertionError(
            fn.callCount !== 1 || !fn.calledWith(...args),
            `expected to be called once with ${JSON.stringify(args)}`
        );
    }

    assertHasClass(component, cls) {
        throwAssertionError(
            !this.hasClass(component, cls),
            `expected component to have class '${cls}'`
        );
    }

    assertIsType(component, type) {
        throwAssertionError(
            !this.isType(component, type),
            `expected component to be type '${type}'`
        );
    }

    assertEveryChildHasClass(component, cls) {
        const everyChildHasClass = this.getChildren(component).every(
            (child) => this.hasClass(child, cls)
        );

        throwAssertionError(
            !everyChildHasClass,
            `expected every child to have class '${cls}'`
        );
    }

    assertEveryChildIsType(component, type) {
        const everyChildIsType = this.getChildren(component).every(
            (child) => this.isType(child, type)
        );

        throwAssertionError(
            !everyChildIsType,
            `expected every child to be type '${type}'`
        );
    }

    assertNthChildHasClass(component, n, cls) {
        const child = this.getChildren(component)[n];

        throwAssertionError(
            !this.hasClass(child, cls),
            `expected child ${n} to have class '${cls}'`
        );
    }

    assertNthChildIsType(component, n, type) {
        const child = this.getChildren(component)[n];

        throwAssertionError(
            !this.isType(child, type),
            `expected child ${n} to be type '${type}'`
        );
    }

    assertNumChildren(component, num) {
        const numChildren = this.getChildren(component).length;

        throwAssertionError(
            numChildren !== num,
            `expected component with ${numChildren} ` +
            `children to have ${num} children`
        );
    }

    assertNumChildrenOfType(component, num, type) {
        const numChildrenOfType = this.getChildren(component).filter(
            (child) => this.isType(child, type)
        ).length;

        throwAssertionError(
            numChildrenOfType !== num,
            `expected component with ${numChildrenOfType} children ` +
            `of type '${type}' ` +
            `to have ${num} children of type '${type}'`
        );
    }

    assertNumChildrenWithClass(component, num, cls) {
        const numChildrenWithClass = this.getChildren(component).filter(
            (child) => this.hasClass(child, cls)
        ).length;

        throwAssertionError(
            numChildrenWithClass !== num,
            `expected component with ${numChildrenWithClass} children ` +
            `with class '${cls}' ` +
            `to have ${num} children with class '${cls}'`
        );
    }

    assertSomeChildHasClass(component, cls) {
        const someChildHasClass = this.getChildren(component).some(
            (child) => this.hasClass(child, cls)
        );

        throwAssertionError(
            !someChildHasClass,
            `expected component to have some child with class '${cls}'`
        );
    }

    assertSomeChildIsType(component, type) {
        const someChildIsType = this.getChildren(component).some(
            (child) => this.isType(child, type)
        );

        throwAssertionError(
            !someChildIsType,
            `expected component to have some child of type '${type}'`
        );
    }

    assertText(component, text) {
        throwAssertionError(
            component.props.children !== text,
            `expected component to have text '${text}'`
        );
    }

    //mocha hooks
    after() {
        this.hooks.after();
    }

    afterEach() {
        this.hooks.afterEach();
        clearPatches(this);
        clearSpies(this);
        clearStubs(this);
    }

    before() {
        this.hooks.before();
    }

    beforeEach() {
        this.hooks.beforeEach();
    }

    //react helpers
    createComponent(component, props) {
        const Component = component;
        const cls = (
            Component.type ?
            Component :
            React.createElement(Component, props)
        );

        return new cls.type(
            cls.props,
            cls._context //eslint-disable-line
        );
    }

    getChildren(component) {
        const children = component.props.children;

        if (children && children.length) {
            return children;
        }

        if (children && !children.length) {
            return [children];
        }

        return [];
    }

    hasClass(component, cls) {
        return component.props.className.split(' ').indexOf(cls) >= 0;
    }

    isType(component, type) {
        return component.type === type;
    }

    renderComponent(...args) {
        return this.createComponent(...args).render();
    }

    //mock helpers
    spy(...args) {
        return spy(this, ...args);
    }

    stub(...args) {
        return stub(this, ...args);
    }

    patch(...args) {
        return patch(this, ...args);
    }

    require(...args) {
        return Mingus.require(...args);
    }
}

//add chai assertions to TestCase
Object.keys(chai.assert).forEach((chaiKey) => {
    const updatedKey = chaiKey.slice(0, 2) === 'is' ? chaiKey.slice(2) : chaiKey;
    const mingusKey = `assert${updatedKey[0].toUpperCase()}${updatedKey.slice(1)}`;

    TestCase.prototype[mingusKey] = chai.assert[chaiKey];
});

Mingus.createTestCase = (name, config) => initTests(new TestCase(name, config));
Mingus.require = (...args) => fakeRequire(...args);

export default Mingus;
