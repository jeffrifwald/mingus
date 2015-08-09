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
    mocha.describe(testCase.constructor.name, () => {
        addAfter(testCase);
        addAfterEach(testCase);
        addBefore(testCase);
        addBeforeEach(testCase);
        addIt(testCase);
    });
}

export function addIt(testCase) {
    Object.getOwnPropertyNames(Object.getPrototypeOf(testCase)).filter(
        (key) => isTestMethod(key, testCase)
    ).forEach(
        (key) => mocha.it(key, testCase[key].bind(testCase))
    );
}

export function clearStubs(testCase) {
    testCase.stubs.forEach((stub) => stub.restore());
    testCase.stubs = [];
}

export function initTests(testCase) {
    addDescribe(testCase);
}

export function isTestMethod(key, testCase) {
    return key.slice(0, 4) === 'test' && typeof testCase[key] === 'function';
}

export function stub(testCase, ...args) {
    testCase.stubs.push(sinon.stub(...args));

    return testCase.stubs[testCase.stubs.length - 1];
}
