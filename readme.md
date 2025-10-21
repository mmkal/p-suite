# p-suite

A collection of all of sindresorhus promise modules. This is a fork of [promise-fun](https://github.com/sindresorhus/promise-fun). It will be periodically updated with the latest upstream changes - package additions/removals etc.

## Contents

- [Packages](#packages)
- [Installation](#installation)
- [Usage](#usage)
- [FAQ](#faq)
- [Contributing](#contributing)

## Installation

```
npm install p-suite
```

## Usage

```ts
import pMemoize from 'p-suite/p-memoize';

const memoized = pMemoize(myFunction);
```

Or you can use the barrel file if you are confident in your tree-shaker:

```ts
import {pMemoize} from 'p-suite';

const memoized = pMemoize.default(myFunction);
```

Note that that you need to use `.default` explicitly - there's no mapping of default to named exports.

## When should you use p-suite?

If you're not sure which promise module you want to use yet, or you want to use a combination of them, you can get them all from a single install. However, it's very unlikely that you'll need them all, so if you are concerned about the size of your node_modules, you should install the individual packages.

For browser usage, or if bundle size is a concern for any other reason, you can use the individual exports (for example `import pMemoize from 'p-suite/p-memoize'`) without negatively impacting your bundle size.

Please consider [sponsoring sindresorhus](https://github.com/sponsors/sindresorhus) if you find this package useful.

<!-- begin generated package docs -->

## Packages

- [**pify**](#pify): Promisify a callback-style function
- [**delay**](#delay): Delay a promise a specified amount of time
- [**yoctodelay**](#yoctodelay): Delay a promise a specified amount of time
- [**p-map**](#p-map): Map over promises concurrently
- [**p-all**](#p-all): Run promise-returning & async functions concurrently with optional limited concurrency
- [**p-event**](#p-event): Promisify an event by waiting for it to be emitted
- [**p-debounce**](#p-debounce): Debounce promise-returning & async functions
- [**p-throttle**](#p-throttle): Throttle promise-returning & async functions
- [**p-timeout**](#p-timeout): Timeout a promise after a specified amount of time
- [**p-retry**](#p-retry): Retry a promise-returning or async function
- [**p-any**](#p-any): Wait for any promise to be fulfilled
- [**p-some**](#p-some): Wait for a specified number of promises to be fulfilled
- [**p-mutex**](#p-mutex): Async mutex lock for managing access to a shared resource
- [**p-locate**](#p-locate): Get the first fulfilled promise that satisfies the provided testing function
- [**p-limit**](#p-limit): Run multiple promise-returning & async functions with limited concurrency
- [**p-series**](#p-series): Run promise-returning & async functions in series
- [**p-memoize**](#p-memoize): Memoize promise-returning & async functions
- [**p-pipe**](#p-pipe): Compose promise-returning & async functions into a reusable pipeline
- [**p-props**](#p-props): Like `Promise.all()` but for `Map` and `Object`
- [**p-waterfall**](#p-waterfall): Run promise-returning & async functions in series, each passing its result to the next
- [**p-cancelable**](#p-cancelable): Create a promise that can be canceled
- [**p-progress**](#p-progress): Create a promise that reports progress
- [**p-reflect**](#p-reflect): Make a promise always fulfill with its actual fulfillment value or rejection reason
- [**p-filter**](#p-filter): Filter promises concurrently
- [**p-reduce**](#p-reduce): Reduce a list of values using promises into a promise for a value
- [**p-settle**](#p-settle): Settle promises concurrently and get their fulfillment value or rejection reason with optional limited concurrency
- [**p-map-series**](#p-map-series): Map over promises serially
- [**p-each-series**](#p-each-series): Iterate over promises serially
- [**p-times**](#p-times): Run promise-returning & async functions a specific number of times concurrently
- [**p-lazy**](#p-lazy): Create a lazy promise that defers execution until it's awaited or when `.then()`, `.catch()`, or `.finally()` is called
- [**p-whilst**](#p-whilst): While a condition returns true, calls a function repeatedly, and then resolves the promise
- [**p-do-whilst**](#p-do-whilst): Calls a function repeatedly while a condition returns true and then resolves the promise
- [**p-forever**](#p-forever): Run promise-returning & async functions repeatedly until you end it
- [**p-wait-for**](#p-wait-for): Wait for a condition to be true
- [**p-min-delay**](#p-min-delay): Delay a promise a minimum amount of time
- [**p-try**](#p-try): `Start a promise chain
- [**p-race**](#p-race): A better `Promise.race()`
- [**p-immediate**](#p-immediate): Returns a promise resolved in the next event loop - think `setImmediate()`
- [**p-time**](#p-time): Measure the time a promise takes to resolve
- [**p-defer**](#p-defer): Create a deferred promise
- [**p-is-promise**](#p-is-promise): Check if something is a promise
- [**p-state**](#p-state): Inspect the state of a promise
- [**p-queue**](#p-queue): Promise queue with concurrency control
- [**make-synchronous**](#make-synchronous): Make an asynchronous function synchronous

## Other useful promise-related packages

_Not part of promise-fun but often useful in combination with some of the packages above_

- [**expiry-map**](#expiry-map): A Map implementation with expirable items
- [**stale-while-revalidate-cache**](#stale-while-revalidate-cache): undefined
- [**memoize**](#memoize): Memoize functions - An optimization used to speed up consecutive function calls by caching the result of calls with identical input
- [**dataloader**](#dataloader): A data loading utility to reduce requests to a backend via batching and caching.

## `.then`/`.catch`-based packages

_You should generally avoid using `.then` except in edge cases_

- [**p-catch-if**](#p-catch-if): Conditional promise catch handler
- [**p-if**](#p-if): Conditional promise chains
- [**p-tap**](#p-tap): Tap into a promise chain without affecting its value or state
- [**p-log**](#p-log): Log the value/error of a promise
- [**p-break**](#p-break): Break out of a promise chain

## Docs

### pify

_Documenation from [source package](https://github.com/sindresorhus/pify)_ | _[Back to packages](#packages)_

> Promisify a callback-style function

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import fs from 'fs';
import pify from 'p-suite/pify';

// Promisify a single function.
const data = await pify(fs.readFile)('package.json', 'utf8');
console.log(JSON.parse(data).name);
//=> 'pify'

// Promisify all methods in a module.
const data2 = await pify(fs).readFile('package.json', 'utf8');
console.log(JSON.parse(data2).name);
//=> 'pify'
```

##### API

#####(input, options?)

Returns a `Promise` wrapped version of the supplied function or module.

##### input

Type: `Function | object`

Callback-style function or module whose methods you want to promisify.

##### options

Type: `object`

##### multiArgs

Type: `boolean`\
Default: `false`

By default, the promisified function will only return the second argument from the callback, which works fine for most APIs. This option can be useful for modules like `request` that return multiple arguments. Turning this on will make it return an array of all arguments from the callback, excluding the error argument, instead of just the second argument. This also applies to rejections, where it returns an array of all the callback arguments, including the error.

```js
import request from 'request';
import pify from 'p-suite/pify';

const pRequest = pify(request, {multiArgs: true});

const [httpResponse, body] = await pRequest('https://sindresorhus.com');
```

_see the rest of the docs in the [source package](https://github.com/sindresorhus/pify)_

### delay

_Documenation from [source package](https://github.com/sindresorhus/delay)_ | _[Back to packages](#packages)_

> Delay a promise a specified amount of time

_If you target Node.js 16 or later, you can use `import {setTimeout} from 'node:timers/promises'; await setTimeout(1000);` instead. This package can still be useful if you need browser support or the extra features._

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import delay from 'p-suite/delay';

bar();

await delay(100);

// Executed 100 milliseconds later
baz();
```

##### API

#####(milliseconds, options?) <sup>default import</sup>

Create a promise which resolves after the specified `milliseconds`.

##### rangeDelay(minimum, maximum, options?)

Create a promise which resolves after a random amount of milliseconds between `minimum` and `maximum` has passed.

Useful for tests and web scraping since they can have unpredictable performance. For example, if you have a test that asserts a method should not take longer than a certain amount of time, and then run it on a CI, it could take longer. So with this method, you could give it a threshold instead.

##### milliseconds

##### mininum

##### maximum

Type: `number`

Milliseconds to delay the promise.

##### options

Type: `object`

##### value

Type: `unknown`

A value to resolve in the returned promise.

```js
import delay from 'p-suite/delay';

const result = await delay(100, {value: '🦄'});

// Executed after 100 milliseconds
console.log(result);
//=> '🦄'
```

_see the rest of the docs in the [source package](https://github.com/sindresorhus/delay)_

### yoctodelay

_Documenation from [source package](https://github.com/sindresorhus/yoctodelay)_ | _[Back to packages](#packages)_

> Delay a promise a specified amount of time

It's less than half the size of the [`nanodelay`](https://github.com/ai/nanodelay) module.

**Note:** If you target Node.js 16 or later, you can use the built-in functionality instead:

```js
import {setTimeout as delay} from 'node:timers/promises';

await delay(100);
```

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import delay from 'p-suite/yoctodelay';

foo();

await delay(100);

// Executed 100 milliseconds later
bar();
```

##### API

##### delay(milliseconds)

Delay the promise and then resolve.

##### milliseconds

Type: `number`

The duration to delay the promise.

##### FAQ

##### What is yocto?

[It's the smallest official unit prefix in the metric system.](https://en.wikipedia.org/wiki/Yocto-) Much smaller than nano.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/yoctodelay)_

### p-map

_Documenation from [source package](https://github.com/sindresorhus/p-map)_ | _[Back to packages](#packages)_

> Map over promises concurrently

Useful when you need to run promise-returning & async functions multiple times with different inputs concurrently.

This is different from `Promise.all()` in that you can control the concurrency and also decide whether or not to stop iterating when there's an error.

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pMap from 'p-suite/p-map';
import got from 'got';

const sites = [
	getWebsiteFromUsername('sindresorhus'), //=> Promise
	'https://avajs.dev',
	'https://github.com'
];

const mapper = async site => {
	const {requestUrl} = await got.head(site);
	return requestUrl;
};

const result = await pMap(sites, mapper, {concurrency: 2});

console.log(result);
//=> ['https://sindresorhus.com/', 'https://avajs.dev/', 'https://github.com/']
```

##### API

##### pMap(input, mapper, options?)

Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `mapper` are fulfilled, or rejects if any of the promises reject. The fulfilled value is an `Array` of the fulfilled values returned from `mapper` in `input` order.

##### pMapIterable(input, mapper, options?)

Returns an async iterable that streams each return value from `mapper` in order.

```js
import {pMapIterable} from 'p-suite/p-map';

// Multiple posts are fetched concurrently, with limited concurrency and backpressure
for await (const post of pMapIterable(postIds, getPostMetadata, {concurrency: 8})) {
	console.log(post);
}
```

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-map)_

### p-all

_Documenation from [source package](https://github.com/sindresorhus/p-all)_ | _[Back to packages](#packages)_

> Run promise-returning & async functions concurrently with optional limited concurrency

Similar to `Promise.all()`, but accepts functions instead of promises directly so you can limit the concurrency.

If you're doing the same work in each function, use [`p-map`](#p-map) instead.

See [`p-series`](#p-series) for a serial counterpart.

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pAll from 'p-suite/p-all';
import got from 'got';

const actions = [
	() => got('https://sindresorhus.com'),
	() => got('https://avajs.dev'),
	() => checkSomething(),
	() => doSomethingElse()
];

console.log(await pAll(actions, {concurrency: 2}));
```

##### API

##### pAll(tasks, options?)

Returns a `Promise` that is fulfilled when all promises returned from calling the functions in `tasks` are fulfilled, or rejects if any of the promises reject. The fulfilled value is an `Array` of the fulfilled values in `tasks` order.

##### tasks

Type: `Iterable<Function>`

Iterable with promise-returning/async functions.

##### options

Type: `object`

##### concurrency

Type: `number` _(Integer)_\
Default: `Infinity`\
Minimum: `1`

Number of concurrently pending promises.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-all)_

### p-event

_Documenation from [source package](https://github.com/sindresorhus/p-event)_ | _[Back to packages](#packages)_

> Promisify an event by waiting for it to be emitted

Useful when you need only one event emission and want to use it with promises or await it in an async function.

It works with any event API in Node.js and the browser (using a bundler).

If you want multiple individual events as they are emitted, you can use the `pEventIterator()` method. [Observables](https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87) can be useful too.

##### Install

```sh
npm install p-suite
```

##### Usage

In Node.js:

```js
import {pEvent} from 'p-suite/p-event';
import emitter from './some-event-emitter';

try {
	const result = await pEvent(emitter, 'finish');

	// `emitter` emitted a `finish` event
	console.log(result);
} catch (error) {
	// `emitter` emitted an `error` event
	console.error(error);
}
```

In the browser:

```js
import {pEvent} from 'p-suite/p-event';

await pEvent(document, 'DOMContentLoaded');
console.log('😎');
```

Async iteration:

```js
import {pEventIterator} from 'p-suite/p-event';
import emitter from './some-event-emitter';

const asyncIterator = pEventIterator(emitter, 'data', {
	resolutionEvents: ['finish']
});

for await (const event of asyncIterator) {
	console.log(event);
}
```

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-event)_

### p-debounce

_Documenation from [source package](https://github.com/sindresorhus/p-debounce)_ | _[Back to packages](#packages)_

> [Debounce](https://css-tricks.com/debouncing-throttling-explained-examples/) promise-returning & async functions

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pDebounce from 'p-suite/p-debounce';

const expensiveCall = async input => input;

const debouncedFunction = pDebounce(expensiveCall, 200);

for (const number of [1, 2, 3]) {
	(async () => {
		console.log(await debouncedFunction(number));
	})();
}
//=> 3
//=> 3
//=> 3
```

##### API

##### pDebounce(fn, wait, options?)

Returns a function that delays calling `fn` until after `wait` milliseconds have elapsed since the last time it was called.

##### fn

Type: `Function`

Promise-returning/async function to debounce.

##### wait

Type: `number`

Milliseconds to wait before calling `fn`.

##### options

Type: `object`

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-debounce)_

### p-throttle

_Documenation from [source package](https://github.com/sindresorhus/p-throttle)_ | _[Back to packages](#packages)_

> Throttle promise-returning & async functions

Also works with normal functions.

It rate-limits function calls without discarding them, making it ideal for external API interactions where avoiding call loss is crucial.

##### Install

```sh
npm install p-suite
```

##### Usage

This calls the function at most twice per second:

```js
import pThrottle from 'p-suite/p-throttle';

const now = Date.now();

const throttle = pThrottle({
	limit: 2,
	interval: 1000
});

const throttled = throttle(async index => {
	const secDiff = ((Date.now() - now) / 1000).toFixed();
	return `${index}: ${secDiff}s`;
});

for (let index = 1; index <= 6; index++) {
	(async () => {
		console.log(await throttled(index));
	})();
}
//=> 1: 0s
//=> 2: 0s
//=> 3: 1s
//=> 4: 1s
//=> 5: 2s
//=> 6: 2s
```

##### API

##### pThrottle(options)

Returns a throttle function.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-throttle)_

### p-timeout

_Documenation from [source package](https://github.com/sindresorhus/p-timeout)_ | _[Back to packages](#packages)_

> Timeout a promise after a specified amount of time

> [!NOTE]
> You may want to use `AbortSignal.timeout()` instead. [Learn more.](#abortsignal)

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import {setTimeout} from 'node:timers/promises';
import pTimeout from 'p-suite/p-timeout';

const delayedPromise = setTimeout(200);

await pTimeout(delayedPromise, {
	milliseconds: 50
});
//=> [TimeoutError: Promise timed out after 50 milliseconds]
```

##### API

##### pTimeout(input, options)

Returns a decorated `input` that times out after `milliseconds` time. It has a `.clear()` method that clears the timeout.

If you pass in a cancelable promise, specifically a promise with a `.cancel()` method, that method will be called when the `pTimeout` promise times out.

##### input

Type: `Promise`

Promise to decorate.

##### options

Type: `object`

##### milliseconds

Type: `number`

Milliseconds before timing out.

Passing `Infinity` will cause it to never time out.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-timeout)_

### p-retry

_Documenation from [source package](https://github.com/sindresorhus/p-retry)_ | _[Back to packages](#packages)_

> Retry a promise-returning or async function

It does exponential backoff and supports custom retry strategies for failed operations.

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pRetry, {AbortError} from 'p-suite/p-retry';

const run = async () => {
	const response = await fetch('https://sindresorhus.com/unicorn');

	// Abort retrying if the resource doesn't exist
	if (response.status === 404) {
		throw new AbortError(response.statusText);
	}

	return response.blob();
};

console.log(await pRetry(run, {retries: 5}));
```

##### API

##### pRetry(input, options?)

Returns a `Promise` that is fulfilled when calling `input` returns a fulfilled promise. If calling `input` returns a rejected promise, `input` is called again until the max retries are reached, it then rejects with the last rejection reason.

Does not retry on most `TypeErrors`, with the exception of network errors. This is done on a best case basis as different browsers have different [messages](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful) to indicate this. See [whatwg/fetch#526 (comment)](https://github.com/whatwg/fetch/issues/526#issuecomment-554604080)

##### input

Type: `Function`

Receives the number of attempts as the first argument and is expected to return a `Promise` or any value.

##### options

Type: `object`

##### onFailedAttempt(context)

Type: `Function`

Callback invoked on each failure. Receives a context object containing the error and retry state information.

The function is called _before_ `shouldConsumeRetry` and `shouldRetry`, for all errors _except_ `AbortError`.

If the function throws, all retries will be aborted and the original promise will reject with the thrown error.

```js
import pRetry from 'p-suite/p-retry';

const run = async () => {
	const response = await fetch('https://sindresorhus.com/unicorn');

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return response.json();
};

const result = await pRetry(run, {
	onFailedAttempt: ({error, attemptNumber, retriesLeft, retriesConsumed}) => {
		console.log(`Attempt ${attemptNumber} failed. ${retriesLeft} retries left. ${retriesConsumed} retries consumed.`);
		// 1st request => Attempt 1 failed. 5 retries left. 0 retries consumed.
		// 2nd request => Attempt 2 failed. 4 retries left. 1 retries consumed.
		// …
	},
	retries: 5
});

console.log(result);
```

The `onFailedAttempt` function can return a promise. For example, to add a [delay](#delay):

```js
import pRetry from 'p-suite/p-retry';
import delay from 'delay';

const run = async () => { … };

const result = await pRetry(run, {
	onFailedAttempt: async () => {
		console.log('Waiting for 1 second before retrying');
		await delay(1000);
	}
});
```

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-retry)_

### p-any

_Documenation from [source package](https://github.com/sindresorhus/p-any)_ | _[Back to packages](#packages)_

> Wait for any promise to be fulfilled

Useful when you need the fastest promise.

You probably want this instead of `Promise.race()`. [Reason.](http://bluebirdjs.com/docs/api/promise.race.html)

_With [Node.js 15](https://medium.com/@nodejs/node-js-v15-0-0-is-here-deb00750f278), there's now a built-in [`Promise#any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) method. The benefit of this package is that it has cancellation functionality._

##### Install

```
$ npm install p-suite
```

##### Usage

Checks 3 websites and logs the fastest.

```js
import pAny from 'p-suite/p-any';
import got from 'got';

const first = await pAny([
	got.head('https://github.com').then(() => 'github'),
	got.head('https://google.com').then(() => 'google'),
	got.head('https://twitter.com').then(() => 'twitter')
]);

console.log(first);
//=> 'google'
```

##### API

##### pAny(input, options?)

Returns a [cancelable `Promise`](#p-cancelable) that is fulfilled when any promise from `input` is fulfilled. If all the `input` promises reject, it will reject with an [`AggregateError`](https://github.com/sindresorhus/aggregate-error) error.

##### input

Type: `Iterable<Promise | unknown>`

##### options

Type: `object`

##### filter

Type: `Function`

Receives the value resolved by the promise. Used to filter out values that doesn't satisfy a condition.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-any)_

### p-some

_Documenation from [source package](https://github.com/sindresorhus/p-some)_ | _[Back to packages](#packages)_

> Wait for a specified number of promises to be fulfilled

Useful when you need the fastest of multiple promises.

##### Install

```sh
npm install p-suite
```

##### Usage

Checks 4 websites and logs the 2 fastest.

```js
import got from 'got';
import pSome from 'p-suite/p-some';

const input = [
	got.head('github.com').then(() => 'github'),
	got.head('google.com').then(() => 'google'),
	got.head('twitter.com').then(() => 'twitter'),
	got.head('medium.com').then(() => 'medium')
];

const [first, second] = await pSome(input, {count: 2});

console.log(first, second);
//=> 'google twitter'
```

##### API

##### pSome(input, options)

Returns a `Promise` that is fulfilled when `count` promises from `input` are fulfilled. The fulfilled value is an `Array` of the values from the `input` promises in the order they were fulfilled. If it becomes impossible to satisfy `count`, for example, too many promises rejected, it will reject with an `AggregateError`. The promise can be aborted using the `signal` option.

##### input

Type: `Iterable<Promise | unknown>`

An `Iterable` collection of promises/values to wait for.

##### options

Type: `object`

##### count

_Required_\
Type: `number`\
Minimum: `1`

Number of promises from `input` that have to be fulfilled until the returned promise is fulfilled.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-some)_

### p-mutex

_Documenation from [source package](https://github.com/sindresorhus/p-mutex)_ | _[Back to packages](#packages)_

> Async [mutex lock](<https://en.wikipedia.org/wiki/Lock_(computer_science)>) for managing access to a shared resource

It provides a safe and easy way to ensure that only one operation accesses a particular resource at a time, preventing race conditions and ensuring data integrity.

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import Mutex from 'p-suite/p-mutex';

const mutex = new Mutex();

const sharedArray = [];

async function addToSharedArray(item) {
	await mutex.withLock(async () => {
		const item = await getItem();
		sharedArray.push(item);
	});
}

addToSharedArray('A');
addToSharedArray('B');
```

##### API

##### `Mutex()`

Creates a new mutex object.

##### `.withLock(task)`

Automatically manages the lock during the execution of the given `task`.

It ensures that the mutex is locked before the `task` executes and automatically releases the lock afterward, even if an error occurs during the execution.

Parameters:

- `task`: A function that performs the actions you want to execute while the lock is held. It can be async.

Returns the result of the `task` function.

> [!TIP]
> Prefer using this method for most use cases as it handles the complexities of lock management and is less prone to errors. Use the lock and unlock methods directly only when you need more control over the lock management process.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-mutex)_

### p-locate

_Documenation from [source package](https://github.com/sindresorhus/p-locate)_ | _[Back to packages](#packages)_

> Get the first fulfilled promise that satisfies the provided testing function

Think of it like an async version of [`Array#find`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/find).

##### Install

```
$ npm install p-suite
```

##### Usage

Here we find the first file that exists on disk, in array order.

```js
import {pathExists} from 'path-exists';
import pLocate from 'p-suite/p-locate';

const files = [
	'unicorn.png',
	'rainbow.png', // Only this one actually exists on disk
	'pony.png'
];

const foundPath = await pLocate(files, file => pathExists(file));

console.log(foundPath);
//=> 'rainbow'
```

_The above is just an example. Use [`locate-path`](https://github.com/sindresorhus/locate-path) if you need this._

##### API

##### pLocate(input, tester, options?)

Returns a `Promise` that is fulfilled when `tester` resolves to `true` or the iterable is done, or rejects if any of the promises reject. The fulfilled value is the current iterable value or `undefined` if `tester` never resolved to `true`.

##### input

Type: `Iterable<Promise | unknown>`

An iterable of promises/values to test.

##### tester(element)

Type: `Function`

This function will receive resolved values from `input` and is expected to return a `Promise<boolean>` or `boolean`.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-locate)_

### p-limit

_Documenation from [source package](https://github.com/sindresorhus/p-limit)_ | _[Back to packages](#packages)_

> Run multiple promise-returning & async functions with limited concurrency

_Works in Node.js and browsers._

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pLimit from 'p-suite/p-limit';

const limit = pLimit(1);

const input = [limit(() => fetchSomething('foo')), limit(() => fetchSomething('bar')), limit(() => doSomething())];

// Only one promise is run at once
const result = await Promise.all(input);
console.log(result);
```

##### API

##### pLimit(concurrency) <sup>default export</sup>

Returns a `limit` function.

##### concurrency

Type: `number`\
Minimum: `1`

Concurrency limit.

##### limit(fn, ...args)

Returns the promise returned by calling `fn(...args)`.

##### fn

Type: `Function`

Promise-returning/async function.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-limit)_

### p-series

_Documenation from [source package](https://github.com/sindresorhus/p-series)_ | _[Back to packages](#packages)_

> Run promise-returning & async functions in series

_Note:_ You can just use `await` in a for-loop to get the same behavior. This package was useful before async/await existed.

If you're doing the same work in each function, use [`p-each-series`](#p-each-series) instead.

See [`p-all`](#p-all) for a concurrent counterpart.

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import pSeries from 'p-suite/p-series';
import got from 'got';

const tasks = [() => got('https://sindresorhus.com'), () => checkSomething(), () => doSomethingElse()];

console.log(await pSeries(tasks));
```

##### API

##### pSeries(tasks)

Returns a `Promise` that is fulfilled when all promises returned from calling the functions in `tasks` are fulfilled, or rejects if any of the promises reject. The fulfilled value is an `Array` of the fulfilled values.

##### tasks

Type: `Iterable<Function>`

Functions are expected to return a value. If a Promise is returned, it's awaited before continuing with the next task.

##### Related

- [p-all](#p-all) - Run promise-returning & async functions concurrently with optional limited concurrency
- [p-waterfall](#p-waterfall) - Run promise-returning & async functions in series, each passing its result to the next
- [p-each-series](#p-each-series) - Iterate over promises serially
- [More…](#packages)

### p-memoize

_Documenation from [source package](https://github.com/sindresorhus/p-memoize)_ | _[Back to packages](#packages)_

> [Memoize](https://en.wikipedia.org/wiki/Memoization) promise-returning & async functions

Useful for speeding up consecutive function calls by caching the result of calls with identical input.

<!-- Please keep this section in sync with https://github.com/sindresorhus/memoize/blob/main/readme.md -->

By default, **only the memoized function's first argument is considered** via strict equality comparison. If you need to cache multiple arguments or cache `object`s _by value_, have a look at alternative [caching strategies](#caching-strategy) below.

This package is similar to [memoize](#memoize) but with async-specific enhancements; in particular, it allows for asynchronous caches and does not cache rejected promises.

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pMemoize from 'p-suite/p-memoize';
import got from 'got';

const memoizedGot = pMemoize(got);

await memoizedGot('https://sindresorhus.com');

// This call is cached
await memoizedGot('https://sindresorhus.com');
```

##### Caching strategy

Similar to the [caching strategy for `memoize`](https://github.com/sindresorhus/memoize#options) with the following exceptions:

- Promises returned from a memoized function are locally cached until resolving, when their value is added to `cache`. Special properties assigned to a returned promise will not be kept after resolution and every promise may need to resolve with a serializable object if caching results in a database.
- `.get()`, `.has()` and `.set()` methods on `cache` can run asynchronously by returning a promise.
- Instead of `.set()` being provided an object with the properties `value` and `maxAge`, it will only be provided `value` as the first argument. If you want to implement time-based expiry, consider [doing so in `cache`](#time-based-cache-expiration).

##### API

##### pMemoize(fn, options?)

Returns a memoized version of the given function.

##### fn

Type: `Function`

Promise-returning or async function to be memoized.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-memoize)_

### p-pipe

_Documenation from [source package](https://github.com/sindresorhus/p-pipe)_ | _[Back to packages](#packages)_

> Compose promise-returning & async functions into a reusable pipeline

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import pPipe from 'p-suite/p-pipe';

const addUnicorn = async string => `${string} Unicorn`;
const addRainbow = async string => `${string} Rainbow`;

const pipeline = pPipe(addUnicorn, addRainbow);

console.log(await pipeline('❤️'));
//=> '❤️ Unicorn Rainbow'
```

##### API

##### pPipe(input…)

The `input` functions are applied from left to right.

##### input

Type: `Function`

Expected to return a `Promise` or any value.

##### Related

- [p-each-series](#p-each-series) - Iterate over promises serially
- [p-series](#p-series) - Run promise-returning & async functions in series
- [p-waterfall](#p-waterfall) - Run promise-returning & async functions in series, each passing its result to the next
- [More…](#packages)

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-p-pipe?utm_source=npm-p-pipe&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>

### p-props

_Documenation from [source package](https://github.com/sindresorhus/p-props)_ | _[Back to packages](#packages)_

> Like [`Promise.all()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) but for `Map` and `Object`

Useful when you need to run multiple promises concurrently and keep track of the fulfilled values by name.

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pProps from 'p-suite/p-props';
import got from 'got';

const fetch = async url => {
	const {body} = await got(url);
	return body;
};

const sites = {
	ava: fetch('https://avajs.dev'),
	todomvc: fetch('https://todomvc.com'),
	github: fetch('https://github.com'),
	foo: 'bar'
};

console.log(await pProps(sites));
/*
{
	ava: '<!doctype …',
	todomvc: '<!doctype …',
	github: '<!doctype …',
	foo: 'bar'
}
*/
```

##### API

##### pProps(input, mapper?, options?)

Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `mapper` are fulfilled, or rejects if any of the promises reject. The fulfilled value is the same as `input`, but with a fulfilled version of each entry value, or the fulfilled value returned from `mapper`, if defined.

##### input

Type: `Map | object`

Resolves entry values that are promises. Other values are passed through.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-props)_

### p-waterfall

_Documenation from [source package](https://github.com/sindresorhus/p-waterfall)_ | _[Back to packages](#packages)_

> Run promise-returning & async functions in series, each passing its result to the next

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import pWaterfall from 'p-suite/p-waterfall';

const tasks = [initialValue => getEmoji(initialValue), previousValue => `I ❤️ ${previousValue}`];

console.log(await pWaterfall(tasks, 'unicorn'));
//=> 'I ❤️ 🦄'
```

##### API

##### pWaterfall(tasks, initialValue?)

Returns a `Promise` that is fulfilled when all promises returned from calling the functions in `tasks` are fulfilled, or rejects if any of the promises reject. The fulfilled value is the value returned from the last task.

##### tasks

Type: `Iterable<Function>`

Functions are expected to return a value. If a `Promise` is returned, it's awaited before continuing with the next task.

##### initialValue

Type: `unknown`

Value to use as `previousValue` in the first task.

##### Related

- [p-series](#p-series) - Run promise-returning & async functions in series
- [p-each-series](#p-each-series) - Iterate over promises serially
- [More…](#packages)

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-p-waterfall?utm_source=npm-p-waterfall&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>

### p-cancelable

_Documenation from [source package](https://github.com/sindresorhus/p-cancelable)_ | _[Back to packages](#packages)_

> Create a promise that can be canceled

Useful for animation, loading resources, long-running async computations, async iteration, etc.

_If you target [Node.js 16](https://medium.com/@nodejs/node-js-v15-0-0-is-here-deb00750f278) or later, this package is [less useful](https://github.com/sindresorhus/p-cancelable/issues/27) and you should probably use [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) instead._

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import PCancelable from 'p-suite/p-cancelable';

const cancelablePromise = new PCancelable((resolve, reject, onCancel) => {
	const worker = new SomeLongRunningOperation();

	onCancel(() => {
		worker.close();
	});

	worker.on('finish', resolve);
	worker.on('error', reject);
});

// Cancel the operation after 10 seconds
setTimeout(() => {
	cancelablePromise.cancel('Unicorn has changed its color');
}, 10000);

try {
	console.log('Operation finished successfully:', await cancelablePromise);
} catch (error) {
	if (cancelablePromise.isCanceled) {
		// Handle the cancelation here
		console.log('Operation was canceled');
		return;
	}

	throw error;
}
```

##### API

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-cancelable)_

### p-progress

_Documenation from [source package](https://github.com/sindresorhus/p-progress)_ | _[Back to packages](#packages)_

> Create a promise that reports progress

Useful for reporting progress to the user during long-running async operations.

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pProgress from 'p-suite/p-progress';

const runJob = async name =>
	pProgress(async progress => {
		const job = new Job(name);

		job.on('data', data => {
			progress(data.length / job.totalSize);
		});

		await job.run();
	});

const progressPromise = runJob('Gather rainbows');

progressPromise.onProgress(console.log);
//=> 0.09
//=> 0.23
//=> 0.59
//=> 0.75
//=> 1

await progressPromise;
```

##### API

##### pProgress(function)

Convenience method to make your promise-returning or async function report progress.

The function you specify will be passed the `progress()` function as a parameter.

##### instance = new PProgress(executor)

Same as the [`Promise` constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), but with an appended `progress` parameter in `executor`.

`PProgress` is a subclass of `Promise`.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-progress)_

### p-reflect

_Documenation from [source package](https://github.com/sindresorhus/p-reflect)_ | _[Back to packages](#packages)_

> Make a promise always fulfill with its actual fulfillment value or rejection reason

Useful when you want a promise to fulfill no matter what and would rather handle the actual state afterwards.

##### Install

```
$ npm install p-suite
```

##### Usage

Here, `Promise.all` would normally fail early because one of the promises rejects, but by using `p-reflect`, we can ignore the rejection and handle it later on.

```js
import pReflect from 'p-suite/p-reflect';

const promises = [getPromise(), getPromiseThatRejects(), getPromise()];

const results = await Promise.all(promises.map(pReflect));

console.log(results);
/*
[
	{
		status: 'fulfilled',
		value: '🦄'
		isFulfilled: true,
		isRejected: false
	},
	{
		status: 'rejected',
		reason: [Error: 👹]
		isFulfilled: false,
		isRejected: true
	},
	{
		status: 'fulfilled',
		value: '🐴'
		isFulfilled: true,
		isRejected: false
	}
]
*/

const resolvedString = results
	.filter(result => result.isFulfilled)
	.map(result => result.value)
	.join('');

console.log(resolvedString);
//=> '🦄🐴'
```

The above is just an example. Use [`p-settle`](#p-settle) if you need exactly that.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-reflect)_

### p-filter

_Documenation from [source package](https://github.com/sindresorhus/p-filter)_ | _[Back to packages](#packages)_

> Filter promises concurrently

Useful when you need to run promise-returning & async functions multiple times with different inputs concurrently and get a filtered down result.

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pFilter from 'p-suite/p-filter';
import getWeather from 'get-weather'; // Not a real module

const places = [getCapital('Norway').then(info => info.name), 'Bangkok, Thailand', 'Berlin, Germany', 'Tokyo, Japan'];

const filterer = async place => {
	const weather = await getWeather(place);
	return weather.temperature > 30;
};

const result = await pFilter(places, filterer);

console.log(result);
//=> ['Bangkok, Thailand']
```

##### API

##### pFilter(input, filterer, options?)

Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `filterer` are fulfilled, or rejects if any of the promises reject. The fulfilled value is an `Array` of the fulfilled values returned from `filterer` in `input` order.

##### input

Type: `Iterable<Promise<unknown> | unknown>`

Iterated over concurrently in the `filterer` function.

##### filterer(element, index)

Type: `Function`

The filterer function that decides whether an element should be included into result. Expected to return `boolean | Promise<boolean>`.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-filter)_

### p-reduce

_Documenation from [source package](https://github.com/sindresorhus/p-reduce)_ | _[Back to packages](#packages)_

> Reduce a list of values using promises into a promise for a value

Useful when you need to calculate some accumulated value based on async resources.

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import pReduce from 'p-suite/p-reduce';
import humanInfo from 'human-info'; // Not a real module

const names = [getUser('sindresorhus').then(info => info.name), 'Addy Osmani', 'Pascal Hartig', 'Stephen Sawchuk'];

const totalAge = await pReduce(
	names,
	async (total, name) => {
		const info = await humanInfo(name);
		return total + info.age;
	},
	0
);

console.log(totalAge);
//=> 125
```

##### API

##### pReduce(input, reducer, initialValue?)

Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `reducer` are fulfilled, or rejects if any of the promises reject. The fulfilled value is the result of the reduction.

##### input

Type: `Iterable<Promise|any>`

Iterated over serially in the `reducer` function.

##### reducer(previousValue, currentValue, index)

Type: `Function`

Expected to return a value. If a `Promise` is returned, it's awaited before continuing with the next iteration.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-reduce)_

### p-settle

_Documenation from [source package](https://github.com/sindresorhus/p-settle)_ | _[Back to packages](#packages)_

> Settle promises concurrently and get their fulfillment value or rejection reason with optional limited concurrency

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import fs from 'node:fs/promises';
import pSettle from 'p-suite/p-settle';

const files = [
	'a.txt',
	'b.txt' // Doesn't exist
].map(filename => fs.readFile(filename, 'utf8'));

console.log(await pSettle(files));
/*
[
	{
		status: 'fulfilled',
		value: '🦄',
		isFulfilled: true,
		isRejected: false,
	},
	{
		status: 'rejected',
		reason: [Error: ENOENT: no such file or directory, open 'b.txt'],
		isFulfilled: false,
		isRejected: true,
	}
]
*/
```

With a `mapper` function:

```js
import fs from 'node:fs/promises';
import pSettle from 'p-suite/p-settle';

const files = ['a.txt', 'b.txt']; // Filenames

console.log(
	await pSettle(files, {
		mapper: filename => fs.readFile(filename, 'utf8'),
		concurrency: 2
	})
);
/*
[
	{
		status: 'fulfilled',
		value: '🦄',
		isFulfilled: true,
		isRejected: false,
	},
	{
		status: 'rejected',
		reason: [Error: ENOENT: no such file or directory, open 'b.txt'],
		isFulfilled: false,
		isRejected: true,
	}
]
*/
```

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-settle)_

### p-map-series

_Documenation from [source package](https://github.com/sindresorhus/p-map-series)_ | _[Back to packages](#packages)_

> Map over promises serially

Useful as a side-effect mapper. Use [`p-map`](#p-map) if you don't need side-effects, as it's concurrent.

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import pMapSeries from 'p-suite/p-map-series';

const keywords = [
	getTopKeyword() //=> Promise
	'rainbow',
	'pony'
];

let scores = [];

const mapper = async keyword => {
	const score = await fetchScore(keyword);
	scores.push(score);
	return {keyword, score};
});

console.log(await pMapSeries(keywords, mapper));
/*
[
	{
		keyword: 'unicorn',
		score: 99
	},
	{
		keyword: 'rainbow',
		score: 70
	},
	{
		keyword: 'pony',
		score: 79
	}
]
*/
```

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-map-series)_

### p-each-series

_Documenation from [source package](https://github.com/sindresorhus/p-each-series)_ | _[Back to packages](#packages)_

> Iterate over promises serially

Useful as a side-effect iterator. Prefer [`p-map`](#p-map) if you don't need side-effects, as it's concurrent.

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import pEachSeries from 'p-suite/p-each-series';

const keywords = [
	getTopKeyword(), //=> Promise
	'rainbow',
	'pony'
];

const iterator = async element => saveToDiskPromise(element);

console.log(await pEachSeries(keywords, iterator));
//=> ['unicorn', 'rainbow', 'pony']
```

##### API

##### pEachSeries(input, iterator)

Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `iterator` are fulfilled, or rejects if any of the promises reject. The fulfillment value is the original `input`.

##### input

Type: `Iterable<Promise | unknown>`

Iterated over serially in the `iterator` function.

##### iterator(element, index)

Type: `Function`

Return value is ignored unless it's `Promise`, then it's awaited before continuing with the next iteration.

##### pEachSeries.stop

Stop iterating through items by returning `pEachSeries.stop` from the iterator function.

```js
import pEachSeries from 'p-suite/p-each-series';

// Logs `a` and `b`.
const result = await pEachSeries(['a', 'b', 'c'], value => {
	console.log(value);

	if (value === 'b') {
		return pEachSeries.stop;
	}
});

console.log(result);
//=> ['a', 'b', 'c']
```

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-each-series)_

### p-times

_Documenation from [source package](https://github.com/sindresorhus/p-times)_ | _[Back to packages](#packages)_

> Run promise-returning & async functions a specific number of times concurrently

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import pTimes from 'p-suite/p-times';

const result = await pTimes(5, index => createFixture(`🦄-${index + 1}`));

console.log(`Created fixtures: ${result.join(' ')}`);
//=> 'Created fixtures: 🦄-1 🦄-2 🦄-3 🦄-4 🦄-5'
```

##### API

##### pTimes(count, mapper, options?)

Returns a `Promise` that is fulfilled when all promises returned from `mapper` are fulfilled, or rejects if any of the promises reject. The fulfilled value is an `Array` of the fulfilled values returned from `mapper` in order.

##### count

Type: `number`

Number of times to call `mapper`.

##### mapper(index)

Type: `Function`

Expected to return a `Promise` or value.

##### options

Type: `object`

##### concurrency

Type: `number`\
Default: `Infinity`\
Minimum: `1`

Number of concurrently pending promises returned by `mapper`.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-times)_

### p-lazy

_Documenation from [source package](https://github.com/sindresorhus/p-lazy)_ | _[Back to packages](#packages)_

> Create a lazy promise that defers execution until it's awaited or when `.then()`, or `.catch()`, or `.finally()` is called

Useful if you're doing some heavy operations and would like to only do it when the promise is actually used.

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import PLazy from 'p-suite/p-lazy';

const lazyPromise = new PLazy(resolve => {
	someHeavyOperation(resolve);
});

// `someHeavyOperation` is not yet called

await doSomethingFun;

// `someHeavyOperation` is called
console.log(await lazyPromise);
```

##### API

##### new PLazy(executor)

Same as the [`Promise` constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise). `PLazy` is a subclass of `Promise`.

##### PLazy.from(fn)

Create a `PLazy` promise from a promise-returning or async function.

##### PLazy.resolve(value)

Create a `PLazy` promise that is resolved with the given `value`, or the promise passed as `value`.

##### PLazy.reject(reason)

Create a `PLazy` promise that is rejected with the given `reason`.

##### Related

- [p-cancelable](#p-cancelable) - Create a promise that can be canceled
- [p-defer](#p-defer) - Create a deferred promise
- [lazy-value](https://github.com/sindresorhus/lazy-value) - Create a lazily evaluated value
- [define-lazy-prop](https://github.com/sindresorhus/define-lazy-prop) - Define a lazily evaluated property on an object
- [More…](#packages)

### p-whilst

_Documenation from [source package](https://github.com/sindresorhus/p-whilst)_ | _[Back to packages](#packages)_

> While a condition returns true, calls a function repeatedly, and then resolves the promise

Think async version of the [`while` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while).

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pWhilst from 'p-suite/p-whilst';

let count = 0;

await pWhilst(
	() => count < 5,
	() => count++
);

console.log(count);
//=> 5
```

##### API

##### pWhilst(condition, action, initialValue?)

While `condition` returns `true`, executes `action` repeatedly, and then resolves the promise to the result of the last call to `action`. Rejects if `action` returns a promise that rejects or if an error is thrown anywhere.

##### condition

Type: `Function`
Arguments: The value the `action` function returns or `initialValue` for the first iteration.

Expected to return a `boolean` or a `Promise<boolean>` that indicates whether to execute `action`.

##### action

Type: `Function`
Arguments: The value the last call to `action` function returns.

Action to run for each iteration.

You can return a promise and it will be handled.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-whilst)_

### p-do-whilst

_Documenation from [source package](https://github.com/sindresorhus/p-do-whilst)_ | _[Back to packages](#packages)_

> Calls a function repeatedly while a condition returns true and then resolves the promise

Think async version of the [`do…while` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while).

##### Install

```sh
npm install p-suite
```

##### Usage

Choose your preferred style:

```js
import pDoWhilst from 'p-suite/p-do-whilst';

let count = 0;

await pDoWhilst(
	() => count++,
	() => count < 5
);

console.log(count);
//=> 5
```

Or:

```js
import pDoWhilst from 'p-suite/p-do-whilst';

const count = await pDoWhilst(
	currentCount => currentCount + 1,
	currentCount => currentCount < 5,
	0
);

console.log(count);
//=> 5
```

##### API

##### pDoWhilst(action, condition, initialValue?)

Executes `action` repeatedly while `condition` returns `true` and then resolves to the result of the last call to `action`. Rejects if `action` returns a promise that rejects or if an error is thrown anywhere.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-do-whilst)_

### p-forever

_Documenation from [source package](https://github.com/sindresorhus/p-forever)_ | _[Back to packages](#packages)_

> Run promise-returning & async functions until you end it

Think of it like an async version of `while (true) {}`.

##### Install

```
$ npm install p-suite
```

##### Usage

Here we create some numbered fixtures. The `createFixture()` function returns a Promise.

```js
import pForever from 'p-suite/p-forever';

pForever(async index => {
	index++;

	if (index > 100) {
		return pForever.end;
	}

	await createFixture(index);

	return index;
}, 0);
```

or

```js
import pForever from 'p-suite/p-forever';

let index = 0;

pForever(async () => {
	index++;

	if (index > 100) {
		return pForever.end;
	}

	await createFixture(index);
});
```

##### API

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-forever)_

### p-wait-for

_Documenation from [source package](https://github.com/sindresorhus/p-wait-for)_ | _[Back to packages](#packages)_

> Wait for a condition to be true

Can be useful for polling.

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pWaitFor from 'p-suite/p-wait-for';
import {pathExists} from 'path-exists';

await pWaitFor(() => pathExists('unicorn.png'));
console.log('Yay! The file now exists.');
```

##### API

##### pWaitFor(condition, options?)

Returns a `Promise` that resolves when `condition` returns `true`. Rejects if `condition` throws or returns a `Promise` that rejects.

##### condition

Type: `Function`

Expected to return `Promise<boolean> | boolean` or a value from `pWaitFor.resolveWith()`.

##### options

Type: `object`

##### interval

Type: `number`\
Default: `20`

Number of milliseconds to wait after `condition` resolves to `false` before calling it again.

##### timeout

Type: `number | TimeoutOptions`\
Default: `Infinity`

Number of milliseconds to wait before automatically rejecting with a `TimeoutError`.

You can customize the timeout `Error` by specifying `TimeoutOptions`.

```js
import pWaitFor from 'p-suite/p-wait-for';
import {pathExists} from 'path-exists';

await pWaitFor(() => pathExists('unicorn.png'), {
	timeout: {
		milliseconds: 100,
		message: new Error('Time’s up!')
	}
});

console.log('Yay! The file now exists.');
```

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-wait-for)_

### p-min-delay

_Documenation from [source package](https://github.com/sindresorhus/p-min-delay)_ | _[Back to packages](#packages)_

> Delay a promise a minimum amount of time

While the [`delay`](#delay) module delays the promise a specified amount of time and then resolves it, this module ensures the promise resolves after the specified amount of time.

Useful when you have a promise that may settle immediately or may take some time, and you want to ensure it doesn't settle too fast. For example, if you want to show a loading indicator for at least 1 second (but longer if needed) to prevent a confusing flash in the UI.

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pMinDelay from 'p-suite/p-min-delay';

// With a promise
const value = await pMinDelay(somePromise, 1000);
// Executed after minimum 1 second even if `somePromise` fulfills before that

// With a function
const delayedFunction = pMinDelay(async () => {
	const result = await fetch('/api/data');
	return result.json();
}, 1000);

// The returned function will ensure a minimum delay
const data = await delayedFunction();
// Executed after minimum 1 second even if the fetch completes before that
```

##### API

##### pMinDelay(input, minimumDelay, options?)

##### input

Type: `Promise | Function`

Promise to delay or function to wrap with a delay.

When a function is passed, `pMinDelay` returns a new function that wraps the original. Each call to the returned function will ensure the promise it returns takes at least the specified minimum delay to settle.

##### minimumDelay

Type: `number`

Time in milliseconds.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-min-delay)_

### p-try

_Documenation from [source package](https://github.com/sindresorhus/p-try)_ | _[Back to packages](#packages)_

> Start a promise chain

[How is it useful?](http://cryto.net/~joepie91/blog/2016/05/11/what-is-promise-try-and-why-does-it-matter/)

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pTry from 'p-suite/p-try';

try {
	const value = await pTry(() => {
		return synchronousFunctionThatMightThrow();
	});
	console.log(value);
} catch (error) {
	console.error(error);
}
```

##### API

##### pTry(fn, ...arguments)

Returns a `Promise` resolved with the value of calling `fn(...arguments)`. If the function throws an error, the returned `Promise` will be rejected with that error.

Support for passing arguments on to the `fn` is provided in order to be able to avoid creating unnecessary closures. You probably don't need this optimization unless you're pushing a _lot_ of functions.

##### fn

The function to run to start the promise chain.

##### arguments

Arguments to pass to `fn`.

##### Related

- [More…](#packages)

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-p-try?utm_source=npm-p-try&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>

### p-race

_Documenation from [source package](https://github.com/sindresorhus/p-race)_ | _[Back to packages](#packages)_

> A better [`Promise.race()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

Improvements:

- Fixes the [silly behavior](https://github.com/domenic/promises-unwrapping/issues/75) of `Promise.race()` returning a forever pending promise when supplied an empty iterable, which could create some really hard to debug problems. `Promise.race()` returns the first promise to fulfill or reject. Check out [`p-any`](#p-any) if you like to get the first promise to fulfill.
- Supports aborting promises using [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal).

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pRace from 'p-suite/p-race';

Promise.race([]);
// Returns a forever pending promise…

pRace([]);
//=> [RangeError: Expected the input to contain at least one item]
```

##### API

##### pRace(iterable | executor)

##### iterable

Type: `Iterable<Promise | unknown>`

##### executor

Type: `signal => Iterable<Promise | unknown>`

##### signal

Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)

You can pass the `signal` to each iterable's element to abort remaining promises when resolve the first promise.

_Requires Node.js 16 or later._

```js
import pRace from 'p-suite/p-race';

pRace(signal => [fetch('/api', {signal}), setTimeout(10, {signal})]);
// Remaining promises other than first one will be aborted.
```

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-race)_

### p-immediate

_Documenation from [source package](https://github.com/sindresorhus/p-immediate)_ | _[Back to packages](#packages)_

> Returns a promise resolved in the next event loop - think [`setImmediate()`](https://nodejs.org/api/timers.html#timers_setimmediate_callback_arg)

Promises are by default [resolved in a microtask](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) (current event loop).

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import pImmediate from 'p-suite/p-immediate';

await pImmediate();

// Executed in the next event loop
console.log('🦄');
```

##### Related

- [delay](#delay) - Delay a promise a specified amount of time
- [p-min-delay](#p-min-delay) - Delay a promise a minimum amount of time
- [p-timeout](#p-timeout) - Timeout a promise after a specified amount of time
- [More…](#packages)

### p-time

_Documenation from [source package](https://github.com/sindresorhus/p-time)_ | _[Back to packages](#packages)_

> Measure the time a promise takes to resolve

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pTime from 'p-suite/p-time';
import {execa} from 'execa';

const promise = pTime(execa)('sleep', ['1']);

await promise;
console.log(promise.time);
//=> 1016
```

##### API

##### pTime(asyncFunction)

Returns a decorated version of `asyncFunction` that when called returns a `Promise` with a `time` property of the elapsed time in milliseconds.

##### pTime.log(asyncFunction)

Returns a decorated version of `asyncFunction` that when called logs the elapsed time in milliseconds of the `Promise`.

##### asyncFunction

Type: `Function`

Promise-returning/async function.

##### Related

- [p-log](#p-log) - Log the value/error of a promise
- [More…](#packages)

### p-defer

_Documenation from [source package](https://github.com/sindresorhus/p-defer)_ | _[Back to packages](#packages)_

> Create a deferred promise

[Don't use this unless you know what you're doing.](https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns#the-deferred-anti-pattern) Prefer the `Promise` constructor.

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import pDefer from 'p-suite/p-defer';

function delay(milliseconds) {
	const deferred = pDefer();
	setTimeout(deferred.resolve, milliseconds, '🦄');
	return deferred.promise;
}

console.log(await delay(100));
//=> '🦄'
```

_The above is just an example. Use [`delay`](#delay) if you need to delay a promise._

##### API

##### pDefer()

Returns an `object` with a `promise` property and functions to `resolve()` and `reject()`.

##### Related

- [p-lazy](#p-lazy) - Create a lazy promise that defers execution until `.then()` or `.catch()` is called
- [More…](#packages)

### p-is-promise

_Documenation from [source package](https://github.com/sindresorhus/p-is-promise)_ | _[Back to packages](#packages)_

> Check if something is a promise

Why not [`is-promise`](https://github.com/then/is-promise)? That module [checks for a thenable](https://github.com/then/is-promise/issues/6), not an ES2015 promise. This one is stricter.

You most likely don't need this. Just pass your value to `Promise.resolve()` and let it handle it.

Can be useful if you need to create a fast path for a synchronous operation.

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import isPromise from 'p-suite/p-is-promise';
import Bluebird from 'bluebird';

isPromise(Promise.resolve('🦄'));
//=> true

isPromise(Bluebird.resolve('🦄'));
//=> true

isPromise('🦄');
//=> false
```

##### Related

- [is](https://github.com/sindresorhus/is) - Type check values
- [More…](#packages)

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-p-is-promise?utm_source=npm-p-is-promise&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>

### p-state

_Documenation from [source package](https://github.com/sindresorhus/p-state)_ | _[Back to packages](#packages)_

> Inspect the state of a promise

You would usually not need this as you can just `await` the promise at any time to get its value even after it's resolved. This package could be useful if you need to check the state of the promise before doing a heavy operation or for assertions when writing tests.

**Vote up [this issue](https://github.com/nodejs/node/issues/40054) if you want to see this feature being included in Node.js itself.**

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import timers from 'node:timers/promises';
import {promiseStateSync} from 'p-suite/p-state';

const timeoutPromise = timers.setTimeout(100);

console.log(promiseStateSync(timeoutPromise));
//=> 'pending'

await timeoutPromise;

console.log(promiseStateSync(timeoutPromise));
//=> 'fulfilled'
```

##### API

##### `promiseStateAsync(promise: Promise)`

Asynchronously inspect the state of a promise.

Returns a promise for the state as a string with the possible values: `'pending'`, `'fulfilled'`, `'rejected'`.

Note: While this is async, it does return the state in the next [microtask](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide), which is almost right away.

```js
import timers from 'node:timers/promises';
import {promiseStateAsync} from 'p-suite/p-state';

const timeoutPromise = timers.setTimeout(100);

console.log(await promiseStateAsync(timeoutPromise));
//=> 'pending'

await timeoutPromise;

console.log(await promiseStateAsync(timeoutPromise));
//=> 'fulfilled'
```

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-state)_

### p-queue

_Documenation from [source package](https://github.com/sindresorhus/p-queue)_ | _[Back to packages](#packages)_

> Promise queue with concurrency control

Useful for rate-limiting async (or sync) operations. For example, when interacting with a REST API or when doing CPU/memory intensive tasks.

For servers, you probably want a Redis-backed [job queue](https://github.com/sindresorhus/awesome-nodejs#job-queues) instead.

Note that the project is feature complete. We are happy to review pull requests, but we don't plan any further development. We are also not answering email support questions.

---

<br>
<div align="center">
	<p>
		<p>
			<sup>
				<a href="https://github.com/sponsors/sindresorhus">Sindre's open source work is supported by the community</a><br>Special thanks to:
			</sup>
		</p>
		<br>
		<br>
		<a href="https://fetchfox.ai?ref=sindre">
			<div>
				<img src="https://sindresorhus.com/assets/thanks/fetchfox-logo.svg" height="200"/>
			</div>
			<b>Scrape anything with FetchFox</b>
			<div>
				<sup>FetchFox is an AI powered scraping tool that lets you scrape data from any website</sup>
			</div>
		</a>
	</p>
	<br>
	<br>
</div>

---

##### Install

```sh
npm install p-suite
```

**Warning:** This package is native [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and no longer provides a CommonJS export. If your project uses CommonJS, you'll have to [convert to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c). Please don't open issues for questions regarding CommonJS / ESM.

##### Usage

Here we run only one promise at a time. For example, set `concurrency` to 4 to run four promises at the same time.

```js
import PQueue from 'p-suite/p-queue';
import got from 'got';

const queue = new PQueue({concurrency: 1});

(async () => {
	await queue.add(() => got('https://sindresorhus.com'));
	console.log('Done: sindresorhus.com');
})();

(async () => {
	await queue.add(() => got('https://avajs.dev'));
	console.log('Done: avajs.dev');
})();
```

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-queue)_

### make-synchronous

_Documenation from [source package](https://github.com/sindresorhus/make-synchronous)_ | _[Back to packages](#packages)_

> Make an asynchronous function synchronous

**This is the wrong tool for most tasks!** Prefer async APIs whenever possible.

The benefit of this package over packages like [`deasync`](https://github.com/abbr/deasync) is that this one is not a native Node.js addon (which comes with a lot of problems). Instead, this package executes the given function synchronously in a [`worker`](https://nodejs.org/api/worker_threads.html) or [`subprocess`](https://nodejs.org/api/child_process.html).

Works in Node.js only — not the browser.

##### Install

```sh
npm install p-suite
```

##### Usage

Runs in a worker thread by default:

```js
import makeSynchronous from 'p-suite/make-synchronous';

const fn = makeSynchronous(async number => {
	const {default: delay} = await import('delay');

	await delay(100);

	return number * 2;
});

console.log(fn(2));
//=> 4
```

To run in a subprocess instead:

```js
import makeSynchronous from 'make-synchronous/subprocess';

makeSynchronous(async () => {
	// Runs in a subprocess.
});
```

Subprocess execution is slower, but has the benefit of full process isolation.

##### API

##### makeSynchronous(asyncFunction | string)

Returns a wrapped version of the given async function or a string representation to a async function which executes synchronously. This means no other code will execute (not even async code) until the given async function is done.

The function is executed in a worker or subprocess, so you cannot access variables or imports from outside its scope. Use `await import(…)` to import dependencies inside the function.

Uses [`MessagePort#postMessage()`](https://nodejs.org/api/worker_threads.html#portpostmessagevalue-transferlist) or the V8 serialization API to transfer arguments, return values, errors between the worker or subprocess and the current process. Most values are supported — except functions and symbols.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/make-synchronous)_

### expiry-map

_Documenation from [source package](https://github.com/SamVerschueren/expiry-map)_ | _[Back to packages](#packages)_

![CI](https://github.com/SamVerschueren/expiry-map/workflows/CI/badge.svg) [![codedov](https://codecov.io/gh/SamVerschueren/expiry-map/branch/master/graph/badge.svg)](https://codecov.io/gh/SamVerschueren/expiry-map)

> A [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) implementation with expirable items

Memory is automatically released when an item expires by removing it from the `Map`.

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import ExpiryMap = require('expiry-map');

const map = new ExpiryMap(1000, [
	['unicorn', '🦄']
]);

map.get('unicorn');
//=> 🦄

map.set('rainbow', '🌈');

console.log(map.size);
//=> 2

// Wait for 1 second...
map.get('unicorn');
//=> undefined

console.log(map.size);
//=> 0
```

##### API

##### ExpiryMap(maxAge, [iterable])

##### maxAge

Type: `number`

Milliseconds until an item in the `Map` expires.

_see the rest of the docs in the [source package](https://github.com/SamVerschueren/expiry-map)_

### stale-while-revalidate-cache

_Documenation from [source package](https://www.npmjs.com/package/stale-while-revalidate-cache)_ | _[Back to packages](#packages)_

# Stale While Revalidate Cache

This small battle-tested TypeScript library is a storage-agnostic helper that implements a configurable stale-while-revalidate caching strategy for any functions, for any JavaScript environment.

> The library will take care of deduplicating any function invocations (requests) for the same cache key so that making concurrent requests will not unnecessarily bypass your cache.

##### Installation

The library can be installed from [NPM](#stale-while-revalidate-cache) using your favorite package manager.

To install via `npm`:

```sh
npm install p-suite
```

##### Usage

At the most basic level, you can import the exported `createStaleWhileRevalidateCache` function that takes some config and gives you back the cache helper.

This cache helper (called `swr` in example below) is an asynchronous function that you can invoke whenever you want to run your cached function. This cache helper takes two arguments, a key to identify the resource in the cache, and the function that should be invoked to retrieve the data that you want to cache. (An optional third argument can be used to override the cache config for the specific invocation.) This function would typically fetch content from an external API, but it could be anything like some resource intensive computation that you don't want the user to wait for and a cache value would be acceptable.

Invoking this `swr` function returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to an object of the following shape:

```typescript
type ResponseObject = {
	/* The value is inferred from the async function passed to swr */
	value: ReturnType<typeof yourAsyncFunction>;
	/**
	 * Indicates the cache status of the returned value:
	 *
	 * `fresh`: returned from cache without revalidating, ie. `cachedTime` < `minTimeToStale`
	 * `stale`: returned from cache but revalidation running in background, ie. `minTimeToStale` < `cachedTime` < `maxTimeToLive`
	 * `expired`: not returned from cache but fetched fresh from async function invocation, ie. `cachedTime` > `maxTimeToLive`
	 * `miss`: no previous cache entry existed so waiting for response from async function before returning value
	 */
	status: 'fresh' | 'stale' | 'expired' | 'miss';
	/* `minTimeToStale` config value used (see configuration below) */
	minTimeToStale: number;
	/* `maxTimeToLive` config value used (see configuration below) */
	maxTimeToLive: number;
	/* Timestamp when function was invoked */
	now: number;
	/* Timestamp when value was cached */
	cachedAt: number;
	/* Timestamp when cache value will be stale */
	staleAt: number;
	/* Timestamp when cache value will expire */
	expireAt: number;
};
```

The cache helper (`swr`) is also a fully functional event emitter, but more about that later.

```typescript
import {createStaleWhileRevalidateCache} from 'p-suite/stale-while-revalidate-cache';

const swr = createStaleWhileRevalidateCache({
	storage: window.localStorage
});

const cacheKey = 'a-cache-key';

const result = await swr(cacheKey, async () => 'some-return-value');
// result.value: 'some-return-value'

const result2 = await swr(cacheKey, async () => 'some-other-return-value');
// result2.value: 'some-return-value' <- returned from cache while revalidating to new value for next invocation

const result3 = await swr(cacheKey, async () => 'yet-another-return-value');
// result3.value: 'some-other-return-value' <- previous value (assuming it was already revalidated and cached by now)
```

_see the rest of the docs in the [source package](https://www.npmjs.com/package/stale-while-revalidate-cache)_

### memoize

_Documenation from [source package](https://github.com/sindresorhus/memoize)_ | _[Back to packages](#packages)_

> [Memoize](https://en.wikipedia.org/wiki/Memoization) functions - An optimization used to speed up consecutive function calls by caching the result of calls with identical input

Memory is automatically released when an item expires or the cache is cleared.

<!-- Please keep this section in sync with https://github.com/sindresorhus/p-memoize/blob/main/readme.md -->

By default, **only the memoized function's first argument is considered** via strict equality comparison. If you need to cache multiple arguments or cache `object`s _by value_, have a look at alternative [caching strategies](#caching-strategy) below.

If you want to memoize Promise-returning functions (like `async` functions), you might be better served by [p-memoize](#p-memoize).

##### Install

```sh
npm install p-suite
```

##### Usage

```js
import memoize from 'p-suite/memoize';

let index = 0;
const counter = () => ++index;
const memoized = memoize(counter);

memoized('foo');
//=> 1

// Cached as it's the same argument
memoized('foo');
//=> 1

// Not cached anymore as the argument changed
memoized('bar');
//=> 2

memoized('bar');
//=> 2

// Only the first argument is considered by default
memoized('bar', 'foo');
//=> 2
```

##### Works well with Promise-returning functions

But you might want to use [p-memoize](#p-memoize) for more Promise-specific behaviors.

```js
import memoize from 'p-suite/memoize';

let index = 0;
const counter = async () => ++index;
const memoized = memoize(counter);

console.log(await memoized());
//=> 1

// The return value didn't increase as it's cached
console.log(await memoized());
//=> 1
```

```js
import memoize from 'p-suite/memoize';
import got from 'got';
import delay from 'delay';

const memoizedGot = memoize(got, {maxAge: 1000});

await memoizedGot('https://sindresorhus.com');

// This call is cached
await memoizedGot('https://sindresorhus.com');

await delay(2000);

// This call is not cached as the cache has expired
await memoizedGot('https://sindresorhus.com');
```

_see the rest of the docs in the [source package](https://github.com/sindresorhus/memoize)_

### dataloader

_Documenation from [source package](https://github.com/graphql/dataloader)_ | _[Back to packages](#packages)_

# DataLoader

DataLoader is a generic utility to be used as part of your application's data
fetching layer to provide a simplified and consistent API over various remote
data sources such as databases or web services via batching and caching.

[![Build Status](https://github.com/graphql/dataloader/actions/workflows/validation.yml/badge.svg)](https://github.com/graphql/dataloader/actions/workflows/validation.yml)
[![Coverage Status](https://coveralls.io/repos/graphql/dataloader/badge.svg?branch=master&service=github)](https://coveralls.io/github/graphql/dataloader?branch=main)

A port of the "Loader" API originally developed by [@schrockn][] at Facebook in
2010 as a simplifying force to coalesce the sundry key-value store back-end
APIs which existed at the time. At Facebook, "Loader" became one of the
implementation details of the "Ent" framework, a privacy-aware data entity
loading and caching layer within web server product code. This ultimately became
the underpinning for Facebook's GraphQL server implementation and type
definitions.

DataLoader is a simplified version of this original idea implemented in
JavaScript for Node.js services. DataLoader is often used when implementing a
[graphql-js][] service, though it is also broadly useful in other situations.

This mechanism of batching and caching data requests is certainly not unique to
Node.js or JavaScript, it is also the primary motivation for
[Haxl](https://github.com/facebook/Haxl), Facebook's data loading library
for Haskell. More about how Haxl works can be read in this [blog post](https://code.facebook.com/posts/302060973291128/open-sourcing-haxl-a-library-for-haskell/).

DataLoader is provided so that it may be useful not just to build GraphQL
services for Node.js but also as a publicly available reference implementation
of this concept in the hopes that it can be ported to other languages. If you
port DataLoader to another language, please open an issue to include a link from
this repository.

##### Getting Started

First, install DataLoader using npm.

```sh
npm install --save dataloader
```

To get started, create a `DataLoader`. Each `DataLoader` instance represents a
unique cache. Typically instances are created per request when used within a
web-server like [express][] if different users can see different things.

> Note: DataLoader assumes a JavaScript environment with global ES6 `Promise`
> and `Map` classes, available in all supported versions of Node.js.

##### Batching

Batching is not an advanced feature, it's DataLoader's primary feature.
Create loaders by providing a batch loading function.

```js
const DataLoader = require('dataloader');

const userLoader = new DataLoader(keys => myBatchGetUsers(keys));
```

A batch loading function accepts an Array of keys, and returns a Promise which
resolves to an Array of values[<sup>\*</sup>](#batch-function).

Then load individual values from the loader. DataLoader will coalesce all
individual loads which occur within a single frame of execution (a single tick
of the event loop) and then call your batch function with all requested keys.

```js
const user = await userLoader.load(1);
const invitedBy = await userLoader.load(user.invitedByID);
console.log(`User 1 was invited by ${invitedBy}`);

// Elsewhere in your application
const user = await userLoader.load(2);
const lastInvited = await userLoader.load(user.lastInvitedID);
console.log(`User 2 last invited ${lastInvited}`);
```

A naive application may have issued four round-trips to a backend for the
required information, but with DataLoader this application will make at most
two.

DataLoader allows you to decouple unrelated parts of your application without
sacrificing the performance of batch data-loading. While the loader presents an
API that loads individual values, all concurrent requests will be coalesced and
presented to your batch loading function. This allows your application to safely
distribute data fetching requirements throughout your application and maintain
minimal outgoing data requests.

_see the rest of the docs in the [source package](https://github.com/graphql/dataloader)_

### p-catch-if

_Documenation from [source package](https://github.com/sindresorhus/p-catch-if)_ | _[Back to packages](#packages)_

> Conditional promise catch handler

Useful for handling only some types of errors and let the rest pass through.

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import pCatchIf from 'p-suite/p-catch-if';

// Error constructor
getData().catch(pCatchIf(TimeoutError, () => retry(getData)));

// Multiple error constructors
getData().catch(pCatchIf([NetworkError, TimeoutError], () => retry(getData)));

// Boolean
getData().catch(pCatchIf(isProduction, error => recordError(error)));

// Function
const hasUnicornMessage = error => error.message.includes('unicorn');
getData().catch(pCatchIf(hasUnicornMessage, console.error));

// Promise-returning function
const handler = error => sendError(error).then(checkResults);
getData().catch(pCatchIf(handler, console.error));

// Can also be nested
const validateMessage = error => error.message === 'Too many rainbows';
getData().catch(pCatchIf(UnicornError, pCatchIf(validateMessage, console.error)));
```

##### API

##### pCatchIf(predicate, catchHandler)

Returns a [thunk](https://en.wikipedia.org/wiki/Thunk) that returns a `Promise`.

##### predicate

Type: `Error.constructor` `Error.constructor[]` `boolean` `Function -> Promise<boolean>|boolean`

Specify either an error constructor, array of error constructors, boolean, or function that returns a promise for a boolean or a boolean.

If the function returns a promise, it's awaited.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-catch-if)_

### p-if

_Documenation from [source package](https://github.com/sindresorhus/p-if)_ | _[Back to packages](#packages)_

> Conditional promise chains

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import pIf from 'p-suite/p-if';

getData()
	.then(pIf(process.env.NODE_ENV !== 'production', addDebugInfo))
	.then(data => {
		console.log(data);
	});
```

Can also be nested:

```js
import pIf from 'p-suite/p-if';

getList()
	.then(pIf(shouldSort, pIf(sortDirection === 'ascending', sort.asc, sort.desc)))
	.then(list => {
		console.log(list);
	});
```

##### API

##### pIf(condition, doIf, doElse?)

It's just a passthrough if `condition` is `false` and `doElse` is not provided.

Returns a [thunk](https://en.wikipedia.org/wiki/Thunk) that returns a `Promise`.

##### condition

Type: `boolean | Function`

Decides whether `doIf` or `doElse` is executed.

Can be a `boolean`, or a `Function` returning a `boolean` or a `Promise` for a `boolean`.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-if)_

### p-tap

_Documenation from [source package](https://github.com/sindresorhus/p-tap)_ | _[Back to packages](#packages)_

> Tap into a promise chain without affecting its value or state

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import pTap from 'p-suite/p-tap';

Promise.resolve('unicorn')
	.then(pTap(console.log)) // Logs `unicorn`
	.then(value => {
		// `value` is still `unicorn`
	});
```

```js
import pTap from 'p-suite/p-tap';

getUser()
	.then(pTap(user => recordStatsAsync(user))) // Stats are saved about `user` async before the chain continues
	.then(user => {
		// `user` is the user from getUser(), not recordStatsAsync()
	});
```

```js
import pTap from 'p-suite/p-tap';

Promise.resolve(() => doSomething())
	.catch(pTap.catch(console.error)) // Prints any errors
	.then(handleSuccess)
	.catch(handleError);
```

##### API

##### pTap(tapHandler)

Use this in a `.then()` method.

Returns a [thunk](https://en.wikipedia.org/wiki/Thunk) that returns a `Promise`.

##### pTap.catch(tapHandler)

Use this in a `.catch()` method.

Returns a [thunk](https://en.wikipedia.org/wiki/Thunk) that returns a `Promise`.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-tap)_

### p-log

_Documenation from [source package](https://github.com/sindresorhus/p-log)_ | _[Back to packages](#packages)_

> Log the value/error of a promise

##### Install

```
$ npm install p-suite
```

##### Usage

```js
import pLog from 'p-suite/p-log';

Promise.resolve('unicorn')
	.then(pLog()) // Logs `unicorn`
	.then(value => {
		// `value` is still `unicorn`
	});
```

```js
import pLog from 'p-suite/p-log';

Promise.resolve()
	.then(() => {
		throw new Error('pony');
	})
	.catch(pLog.catch()) // Logs `Error: pony`
	.catch(error => {
		// `error` is still `Error: pony`
	});
```

##### API

##### pLog(logger?)

Use this in a `.then()` method.

Returns a [thunk](https://en.wikipedia.org/wiki/Thunk) that returns a `Promise`.

##### pLog.catch(logger?)

Use this in a `.catch()` method.

Returns a [thunk](https://en.wikipedia.org/wiki/Thunk) that returns a `Promise`.

##### logger

Type: `Function`\
Default: `console.log`

The logger to use. Any return value or exception is ignored.

_see the rest of the docs in the [source package](https://github.com/sindresorhus/p-log)_

### p-break

_Documenation from [source package](https://github.com/sindresorhus/p-break)_ | _[Back to packages](#packages)_

> Break out of a promise chain

See ["How do I break out of a promise chain?"](https://github.com/sindresorhus/promise-fun#how-do-i-break-out-of-a-promise-chain) for a better way.

##### Install

```
$ npm install p-suite
```

##### Usage

Here the `onlyRunConditional` promises are skipped if `conditional` is falsy:

```js
import pBreak from 'p-suite/p-break';

alwaysRun1()
	.then(() => alwaysRun2())
	.then(conditional => conditional || pBreak('🦄'))
	.then(() => onlyRunConditional1())
	.then(() => onlyRunConditional2())
	.then(() => onlyRunConditional3())
	.then(() => onlyRunConditional4())
	.catch(pBreak.end)
	.then(console.log);
//=> '🦄'
```

##### API

##### pBreak([value])

Starts the break. Any `.then()`'s between here and `pBreak.end()` are skipped.

##### value

Value to pass down the chain after `pBreak.end()`.

##### pBreak.end

Ends the break. Make sure not to have any other `.catch()` handlers between `pBreak()` and here.

##### Related

- [p-if](#p-if) - Conditional promise chains
- [More…](#packages)

<!-- end generated package docs -->

## FAQ

### How can I run 100 async/promise-returning functions with only 5 running at once?

This is a good use-case for [`p-map`](#p-map). You might ask why you can't just specify an array of promises. Promises represent values of a computation and not the computation itself - they are eager. So by the time `p-map` starts reading the array, all the actions creating those promises have already started running. `p-map` works by executing a promise-returning function in a mapper function. This way the promises are created lazily and can be concurrency limited. Check out [`p-all`](https://github.com/sindresorhus/p-all) instead if you're using different functions to get each promise.

```js
import pMap from 'p-suite/p-map';

const urls = [
	'https://sindresorhus.com',
	'https://avajs.dev',
	'https://github.com',
	…
];

console.log(urls.length);
//=> 100

const mapper = url => fetchStats(url); //=> Promise

const result = await pMap(urls, mapper, {concurrency: 5});

console.log(result);
//=> [{url: 'https://sindresorhus.com', stats: {…}}, …]
```

### Is this affiliated with sindresorhus?

No. It's a fork of the [promise-fun](https://github.com/sindresorhus/promise-fun) repo, but that only consists of a hand-written readme file pointing to the various other packages. Sindre very reasonably [did not want to maintain](https://github.com/sindresorhus/promise-fun/pull/26) a generated monopackage. It's also worth noting that as JavaScript develops some of the packages are less necessary - a handful of them existed before async/await, so only use as needed.

### When is p-suite updated and published?

There is a scheduled GitHub Actions workflow that will update p-suite with the latest versions of all its dependencies, once per day. Publishing is _not_ automated, however, so major version updates will be made ad-hoc. In general, there will likely be a major version update whenever at least one of the dependency packages is updated.

[pkg.pr.new](https://pkg.pr.new) is enabled on the repository, so you can try a prerelease version even without an npm publish of p-suite by looking at the checks for the default branch.

## Contributing

The package.json dependencies and exports are generated from this readme. So, to add a new package, it should be added to the readme with the same format as the others. There is an automated GitHub Actions workflow that will automatically update the package.json exports and dependencies, as well as the javascript and typescript files.

If you need to change the code in the `source/` folder, don't modify it directly. Instead, make the change in `generate.js` which generates it.

Implementation (what this fork adds to sindresorhus's original repo):

- adds a package.json (named `p-suite` rather than `promise-fun` since that npm package name is taken on npm)
- add a `generate.js` script which:
  - parses the readme to get all the packages that should be included
  - installs the latest versions of all packages
  - creates `.js` and `.d.ts` files for each package (e.g. `export * from 'p-memoize'`)
  - creates a barrel file re-exporting all the packages (e.g. `export * as pMemoize from 'p-memoize'`)
  - adds an `exports` definition pointing to each re-export file
  - calculates an `engines.node` range that satisfies all the sub-packages\*
- add tests (right now, just making sure an example module works at runtime and typescript-compile time)
- add CI:
  - run the generate script to make sure everything's up to date
  - use autofix.ci to push an update if not
  - run some tests (right now, just makes sure that types + runtime were generated properly for p-memoize)
  - use pkg.pr.new to publish a prerelease version (so you can try this out right now: `npm install https://pkg.pr.new/mmkal/p-suite@8c181db` - [link](https://github.com/mmkal/p-suite/runs/31040343982))

The idea is that everything should be fully automated, so maintenance should be as simple as `git pull && pnpm install && pnpm generate`.

---

\*note: the algorithm to detect the minimum required node version depends on the `semver` package's various helpers. It isn't bullet-proof, but from debugging manually it seems good enough. This unfortunately isn't part of semver: https://github.com/npm/node-semver/issues/527. If it breaks down in future it will show up in the generated package.json though.
