import React from 'react';

import {EmptyList, LargeList, SmallList} from './Components';
import Mingus from '../src/mingus';


Mingus.createTestCase('createTestCaseTest', {
    before() {
        this.component = this.createComponent(<LargeList />);
        this.rendered = this.renderComponent(<LargeList />);
    },

    testAssertDeepEqual() {
        let caught = false;

        this.assertDeepEqual({a: 1}, {a: 1});

        try {
            this.assertDeepEqual({a: 1}, {a: 2});
        } catch(err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertEqual() {
        let caught = false;

        this.assertEqual(1, 1);

        try {
            this.assertEqual(1, 2);
        } catch(err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertTrue() {
        let caught = false;

        this.assertTrue(true);

        try {
            this.assertTrue(false);
        } catch(err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertFalse() {
        let caught = false;

        this.assertFalse(false);

        try {
            this.assertFalse(true);
        } catch(err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertHasClass() {
        this.assertHasClass(this.rendered, 'large-list');
    },

    testAssertIsType() {
        this.assertIsType(this.rendered, 'ul');
    },

    testAssertEveryChildHasClass() {
        this.assertEveryChildHasClass(this.rendered, 'large-list-item');
    },

    testAssertEveryChildIsType() {
        this.assertEveryChildIsType(this.rendered, 'li');
    },

    testAssertNthChildHasClass() {
        this.assertNthChildHasClass(this.rendered, 0, 'large-list-item');
    },

    testAssertNthChildIsType() {
        this.assertNthChildIsType(this.rendered, 0, 'li');
    },

    testAssertNumChildren() {
        this.assertNumChildren(this.rendered, 3);
    },

    testAssertNumChildrenWithClass() {
        this.assertNumChildrenWithClass(this.rendered, 3, 'large-list-item');
    },

    testAssertNumChildrenOfType() {
        this.assertNumChildrenOfType(this.rendered, 3, 'li');
    },

    testAssertSomeChildHasClass() {
        this.assertSomeChildHasClass(this.rendered, 'large-list-item');
    },

    testAssertSomeChildIsType() {
        this.assertSomeChildIsType(this.rendered, 'li');
    },

    testGetChildren() {
        this.assertDeepEqual(
            this.getChildren(this.rendered),
            this.rendered.props.children
        );
    },

    testGetChildrenNoChildren() {
        const rendered = this.renderComponent(<EmptyList />);

        this.assertDeepEqual(this.getChildren(rendered), []);
    },

    testGetChildrenOneChild() {
        const rendered = this.renderComponent(<SmallList />);

        this.assertDeepEqual(
            this.getChildren(rendered),
            [rendered.props.children]
        );
    },

    testHasClass() {
        this.assertTrue(this.hasClass(this.rendered, 'large-list'));
    },

    testIsType() {
        this.assertTrue(this.isType(this.rendered, 'ul'));
    },

    testStub() {
        this.stub(this.component, 'getName', () => 'Cool');
        this.assertEqual(this.component.getName(), 'Cool');
    },

    testStubReset() {
        this.assertEqual(this.component.getName(), 'Large');
    },

    testCreateComponent() {
        this.assertDeepEqual(
            this.createComponent(LargeList),
            this.createComponent(<LargeList />)
        );
    }
});

// Make sure things don't break when creating with an empty config
Mingus.createTestCase();
