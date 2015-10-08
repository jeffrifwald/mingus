import chai from 'chai';
import mocha from 'mocha';
import sinon from 'sinon';


export function noop() {

}

export function maybeFn(fn) {
    return fn && typeof fn === 'function' ? fn : noop;
}

export function isTestMethod(key, testCase) {
    return key.slice(0, 4) === 'test' && typeof testCase[key] === 'function';
}

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

export function addIt(testCase) {
    Object.keys(testCase.config).filter(
        (key) => isTestMethod(key, testCase.config)
    ).forEach(
        (key) => mocha.it(key, testCase.config[key].bind(testCase))
    );
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

export function restoreAll(obj) {
    if (obj.restore && typeof obj.restore === 'function') {
        obj.restore();
    }
}

export function clearStubs(testCase) {
    testCase.stubs.forEach(restoreAll);
    testCase.stubs = [];
}

export function clearSpies(testCase) {
    testCase.spies.forEach(restoreAll);
    testCase.spies = [];
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

export function spy(testCase, ...args) {
    testCase.spies.push(sinon.spy(...args));

    return testCase.spies[testCase.spies.length - 1];
}

export function stub(testCase, ...args) {
    testCase.stubs.push(sinon.stub(...args));

    return testCase.stubs[testCase.stubs.length - 1];
}

export function throwAssertionError(shouldThrow, msg) {
    if (shouldThrow) {
        throw new chai.AssertionError(msg);
    }
}
