# mingus

`mingus` is a testing library for React components. It uses mocha, sinon, and chai.

## Install

To install the latest release:
```shell
npm install mingus
```

To build the latest code directly from source:
```shell
npm install git://github.com/jmcriffey/mingus.git
```

## Usage
```js
import {TestCase} from 'mingus';
import React from 'react';
import someLib from 'someLib';


class CoolComponent extends React.Component {
    render() {
        return (
            <ul className="cool-list">
                <li className="cool-list-item">1</li>
                <li className="cool-list-item">2</li>
            </ul>
        );
    }

    getNum() {
        return someLib.getNum();
    }
}

class CoolComponentTest extends TestCase {
    beforeEach() {
        this.rendered = this.renderComponent(<CoolComponent />);
        this.component = this.createComponent(<CoolComponent />);
    }

    testType() {
        this.assertIsType(this.rendered, 'ul')
    }

    testClass() {
        this.assertHasClass(this.rendered, 'cool-list');
    }

    testChildrenClasses() {
        this.assertEveryChildHasClass(this.rendered, 'cool-list-item');
        this.assertSomeChildHasClass(this.rendered, 'cool-list-item');
    }

    testChildrenTypes() {
        this.assertEveryChildIsType(this.rendered, 'li');
        this.assertSomeChildIsType(this.rendered, 'li');
    }

    testNthChildClass() {
        this.assertNthChildHasClass(this.rendered, 0, 'cool-list-item');
    }

    testNthChildType() {
        this.assertNthChildIsType(this.rendered, 0, 'li');
    }

    testGetNum() {
        this.stub(someLib, 'getNum', () => 777);
        this.assertEqual(component.getNum(), 777);
    }
}

new CoolComponentTest();
```

## License

MIT License
