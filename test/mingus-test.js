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
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertEqual() {
        let caught = false;

        this.assertEqual(1, 1);

        try {
            this.assertEqual(1, 2);
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertTrue() {
        let caught = false;

        this.assertTrue(true);

        try {
            this.assertTrue(false);
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertFalse() {
        let caught = false;

        this.assertFalse(false);

        try {
            this.assertFalse(true);
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertNotNull() {
        let caught = false;

        this.assertNotNull(1);

        try {
            this.assertNotNull(null);
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertNull() {
        let caught = false;

        this.assertNull(null);

        try {
            this.assertNull(1);
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertTypeOf() {
        let caught = false;

        this.assertTypeOf('', 'string');

        try {
            this.assertTypeOf('', 'number');
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertUndefined() {
        let caught = false;

        this.assertUndefined(undefined);

        try {
            this.assertUndefined(null);
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertInstanceOf() {
        let caught = false;

        this.assertInstanceOf(this.component, LargeList);

        try {
            this.assertInstanceOf(this.component, SmallList);
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertNotInstanceOf() {
        let caught = false;

        this.assertNotInstanceOf(this.component, SmallList);

        try {
            this.assertNotInstanceOf(this.component, LargeList);
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertHasClass() {
        let caught = false;

        this.assertHasClass(this.rendered, 'large-list');

        try {
            this.assertHasClass(this.rendered, 'large-lists');
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertIsType() {
        let caught = false;

        this.assertIsType(this.rendered, 'ul');

        try {
            this.assertIsType(this.rendered, 'li');
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertEveryChildHasClass() {
        let caught = false;

        this.assertEveryChildHasClass(this.rendered, 'large-list-item');

        try {
            this.assertEveryChildHasClass(this.rendered, 'small-list-item');
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertEveryChildIsType() {
        let caught = false;

        this.assertEveryChildIsType(this.rendered, 'li');

        try {
            this.assertEveryChildIsType(this.rendered, 'ul');
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertNthChildHasClass() {
        let caught = false;

        this.assertNthChildHasClass(this.rendered, 0, 'large-list-item');

        try {
            this.assertNthChildHasClass(this.rendered, 0, 'small-list-item');
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertNthChildIsType() {
        let caught = false;

        this.assertNthChildIsType(this.rendered, 0, 'li');

        try {
            this.assertNthChildIsType(this.rendered, 0, 'ul');
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertNumChildren() {
        let caught = false;

        this.assertNumChildren(this.rendered, 3);

        try {
            this.assertNumChildren(this.rendered, 4);
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertNumChildrenOfType() {
        let caught = false;

        this.assertNumChildrenOfType(this.rendered, 3, 'li');

        try {
            this.assertNumChildrenOfType(this.rendered, 4, 'li');
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertNumChildrenWithClass() {
        let caught = false;

        this.assertNumChildrenWithClass(this.rendered, 3, 'large-list-item');

        try {
            this.assertNumChildrenWithClass(
                this.rendered,
                4,
                'large-list-item'
            );
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertSomeChildHasClass() {
        let caught = false;

        this.assertSomeChildHasClass(this.rendered, 'large-list-item');

        try {
            this.assertSomeChildHasClass(this.rendered, 'small-list-item');
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertSomeChildIsType() {
        let caught = false;

        this.assertSomeChildIsType(this.rendered, 'li');

        try {
            this.assertSomeChildIsType(this.rendered, 'ul');
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
    },

    testAssertText() {
        let caught = false;

        this.assertText(<span>Cool</span>, 'Cool');

        try {
            this.assertText(<span>Cool</span>, 'Uncool');
        } catch (err) {
            caught = true;
        }

        this.assertTrue(caught);
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

    testSpy() {
        this.spy(this.component, 'getName');
        this.assertEqual(this.component.getName(), 'Large');
        this.assertEqual(this.component.getNameCalled, 1);
        this.assertEqual(this.component.getName.callCount, 1);

        this.component.getNameCalled = 0;
    },

    testSpyReset() {
        this.assertEqual(this.component.getName(), 'Large');
        this.assertEqual(this.component.getNameCalled, 1);
        this.assertUndefined(this.component.getName.callCount);

        this.component.getNameCalled = 0;
    },

    testOrphanSpy() {
        const spy = this.spy();

        spy();
        this.assertEqual(spy.callCount, 1);
    },

    testStub() {
        this.stub(this.component, 'getName', () => 'Cool');
        this.assertEqual(this.component.getName(), 'Cool');
        this.assertEqual(this.component.getNameCalled, 0);
    },

    testStubReset() {
        this.assertEqual(this.component.getName(), 'Large');
    },

    testOrphanStub() {
        const stub = this.stub();

        stub();
        this.assertEqual(stub.callCount, 1);
    },

    testCreateComponent() {
        this.assertDeepEqual(
            this.createComponent(LargeList),
            this.createComponent(<LargeList />)
        );
    }
});

//make sure things don't break when creating with an empty config
Mingus.createTestCase();
