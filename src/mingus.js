import chai from 'chai';

import {clearStubs, initTests, stub} from './helpers';


export class TestCase {
    constructor() {
        this.stubs = [];
        initTests(this);
    }

    // Assertion methods
    assertDeepEqual(...args) {
        return chai.assert.deepEqual(...args);
    }

    assertEqual(...args) {
        return chai.assert.equal(...args);
    }

    assertTrue(...args) {
        return chai.assert.isTrue(...args);
    }

    assertFalse(...args) {
        return chai.assert.isFalse(...args);
    }

    assertHasClass(component, cls) {
        return this.assertTrue(this.hasClass(component, cls));
    }

    assertIsType(component, type) {
        return this.assertTrue(this.isType(component, type));
    }

    assertEveryChildHasClass(component, cls) {
        const everyChildHasClass = this.getChildren(component).every(
            (child) => this.hasClass(child, cls)
        );

        return this.assertTrue(everyChildHasClass);
    }

    assertEveryChildIsType(component, type) {
        const everyChildIsType = this.getChildren(component).every(
            (child) => this.isType(child, type)
        );

        return this.assertTrue(everyChildIsType);
    }

    assertNthChildHasClass(component, n, cls) {
        const child = this.getChildren(component)[n];

        return this.assertTrue(this.hasClass(child, cls));
    }

    assertNthChildIsType(component, n, type) {
        const child = this.getChildren(component)[n];

        return this.assertTrue(this.isType(child, type));
    }

    assertNumChildrenOfType(component, num, type) {
        const numChildrenOfType = this.getChildren(component).filter(
            (child) => this.isType(child, type)
        ).length;

        return this.assertEqual(numChildrenOfType, num);
    }

    assertNumChildrenWithClass(component, num, cls) {
        const numChildrenWithClass = this.getChildren(component).filter(
            (child) => this.hasClass(child, cls)
        ).length;

        return this.assertEqual(numChildrenWithClass, num);
    }

    assertSomeChildHasClass(component, cls) {
        const someChildHasClass = this.getChildren(component).some(
            (child) => this.hasClass(child, cls)
        );

        return this.assertTrue(someChildHasClass);
    }

    assertSomeChildIsType(component, type) {
        const someChildIsType = this.getChildren(component).some(
            (child) => this.isType(child, type)
        );

        return this.assertTrue(someChildIsType);
    }

    // Mocha hooks
    after() {

    }

    afterEach() {
        clearStubs(this);
    }

    before() {

    }

    beforeEach() {

    }

    // React helpers
    createComponent(cls) {
        const Component = cls.type;

        return new Component(
            cls.props,
            cls._context //eslint-disable-line
        );
    }

    getChildren(component) {
        const children = component.props.children;

        if (children && children.length) {
            return children;
        } else if (children && !children.length) {
            return [children];
        } else {
            return [];
        }
    }

    hasClass(component, cls) {
        return component.props.className.indexOf(cls) >= 0;
    }

    isType(component, type) {
        return component.type === type;
    }

    renderComponent(cls) {
        return this.createComponent(cls).render();
    }

    // Mock helpers
    stub(...args) {
        return stub(this, ...args);
    }
}
