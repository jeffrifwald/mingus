import mocha from 'mocha';
import sinon from 'sinon';


export function addAfter(testCase) {
    mocha.after(() => testCase.after());
}

export function addAfterEach(testCase) {
    mocha.afterEach(() => testCase.afterEach());
}

export function addBefore(testCase) {
    mocha.before(() => testCase.before());
}

export function addBeforeEach(testCase) {
    mocha.beforeEach(() => testCase.beforeEach());
}

export function addDescribe(testCase) {
    mocha.describe(testCase.name, () => {
        addAfter(testCase);
        addAfterEach(testCase);
        addBefore(testCase);
        addBeforeEach(testCase);
        addIt(testCase);
    });
}

export function addIt(testCase) {
    Object.keys(testCase.config).filter(
        (key) => isTestMethod(key, testCase.config)
    ).forEach(
        (key) => mocha.it(key, testCase.config[key].bind(testCase))
    );
}

export function clearStubs(testCase) {
    testCase.stubs.forEach((stub) => {
        if (stub.restore && typeof stub.restore === 'function') {
            stub.restore()
        }
    });
    testCase.stubs = [];
}

export function getHooks(testCase) {
    return {
        after: maybeFn(testCase.config.after).bind(testCase),
        afterEach: maybeFn(testCase.config.afterEach).bind(testCase),
        before: maybeFn(testCase.config.before).bind(testCase),
        beforeEach: maybeFn(testCase.config.beforeEach).bind(testCase)
    };
}

export function initTests(testCase) {
    addDescribe(testCase);
}

export function isTestMethod(key, testCase) {
    return key.slice(0, 4) === 'test' && typeof testCase[key] === 'function';
}

export function maybeFn(fn) {
    return fn && typeof fn === 'function' ? fn : noop;
}

export function noop() {

}

export function stub(testCase, ...args) {
    testCase.stubs.push(sinon.stub(...args));

    return testCase.stubs[testCase.stubs.length - 1];
}
