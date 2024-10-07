# p-suite

A collection of all of sindresorhus promise modules. This is a fork of [promise-fun](https://github.com/sindresorhus/promise-fun). It will be periodically updated with the latest upstream changes (any package additions/removals etc.).

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
import pMemoize from 'p-suite/p-memoize'

const memoized = pMemoize(myFunction)
```

Or you can use the barrel file if you are confident in your tree-shaker:

```ts
import {pMemoize} from 'p-suite'

const memoized = pMemoize.default(myFunction)
```

Note that that you need to use `.default` explicitly - there's no mapping of default to named exports.

## When should you use p-suite?

If you're not sure which promise module you want to use yet, or you want to use a combination of them, you can get them all from a single install. However, it's very unlikely that you'll need them all, so if you are concerned about the size of your node_modules, you should install the individual packages.

For browser usage, or if bundle size is a concern for any other reason, you should be able to use the individual exports (for example `import pMemoize from 'p-suite/p-memoize'`) without negatively impacting your bundle size. But make sure to test this using a bundle analyzer if you're concerned.

## Packages

*Not accepting additions, but happy to take requests.*

- **[pify](https://github.com/sindresorhus/pify)**: Promisify a callback-style function
- **[delay](https://github.com/sindresorhus/delay)**: Delay a promise a specified amount of time
- **[yoctodelay](https://github.com/sindresorhus/yoctodelay)**: Delay a promise a specified amount of time
- **[p-map](https://github.com/sindresorhus/p-map)**: Map over promises concurrently
- **[p-all](https://github.com/sindresorhus/p-all)**: Run promise-returning & async functions concurrently with optional limited concurrency
- **[p-event](https://github.com/sindresorhus/p-event)**: Promisify an event by waiting for it to be emitted
- **[p-debounce](https://github.com/sindresorhus/p-debounce)**: Debounce promise-returning & async functions
- **[p-throttle](https://github.com/sindresorhus/p-throttle)**: Throttle promise-returning & async functions
- **[p-timeout](https://github.com/sindresorhus/p-timeout)**: Timeout a promise after a specified amount of time
- **[p-retry](https://github.com/sindresorhus/p-retry)**: Retry a promise-returning or async function
- **[p-any](https://github.com/sindresorhus/p-any)**: Wait for any promise to be fulfilled
- **[p-some](https://github.com/sindresorhus/p-some)**: Wait for a specified number of promises to be fulfilled
- **[p-mutex](https://github.com/sindresorhus/p-mutex)**: Ensure that only one operation accesses a particular resource at a time
- **[p-locate](https://github.com/sindresorhus/p-locate)**: Get the first fulfilled promise that satisfies the provided testing function
- **[p-limit](https://github.com/sindresorhus/p-limit)**: Run multiple promise-returning & async functions with limited concurrency
- **[p-series](https://github.com/sindresorhus/p-series)**: Run promise-returning & async functions in series
- **[p-memoize](https://github.com/sindresorhus/p-memoize)**: Memoize promise-returning & async functions
- **[p-pipe](https://github.com/sindresorhus/p-pipe)**: Compose promise-returning & async functions into a reusable pipeline
- **[p-props](https://github.com/sindresorhus/p-props)**: Like `Promise.all()` but for `Map` and `Object`
- **[p-waterfall](https://github.com/sindresorhus/p-waterfall)**: Run promise-returning & async functions in series, each passing its result to the next
- **[p-cancelable](https://github.com/sindresorhus/p-cancelable)**: Create a promise that can be canceled
- **[p-progress](https://github.com/sindresorhus/p-progress)**: Create a promise that reports progress
- **[p-reflect](https://github.com/sindresorhus/p-reflect)**: Make a promise always fulfill with its actual fulfillment value or rejection reason
- **[p-filter](https://github.com/sindresorhus/p-filter)**: Filter promises concurrently
- **[p-reduce](https://github.com/sindresorhus/p-reduce)**: Reduce a list of values using promises into a promise for a value
- **[p-settle](https://github.com/sindresorhus/p-settle)**: Settle promises concurrently and get their fulfillment value or rejection reason with optional limited concurrency
- **[p-map-series](https://github.com/sindresorhus/p-map-series)**: Map over promises serially
- **[p-each-series](https://github.com/sindresorhus/p-each-series)**: Iterate over promises serially
- **[p-times](https://github.com/sindresorhus/p-times)**: Run promise-returning & async functions a specific number of times concurrently
- **[p-lazy](https://github.com/sindresorhus/p-lazy)**: Create a lazy promise that defers execution until `.then()` or `.catch()` is called
- **[p-whilst](https://github.com/sindresorhus/p-whilst)**: While a condition returns true, calls a function repeatedly, and then resolves the promise
- **[p-do-whilst](https://github.com/sindresorhus/p-do-whilst)**: Calls a function repeatedly while a condition returns true and then resolves the promise
- **[p-forever](https://github.com/sindresorhus/p-forever)**: Run promise-returning & async functions repeatedly until you end it
- **[p-wait-for](https://github.com/sindresorhus/p-wait-for)**: Wait for a condition to be true
- **[p-min-delay](https://github.com/sindresorhus/p-min-delay)**: Delay a promise a minimum amount of time
- **[p-try](https://github.com/sindresorhus/p-try)**: `Promise.try()` ponyfill - Starts a promise chain
- **[p-race](https://github.com/sindresorhus/p-race)**: A better `Promise.race()`
- **[p-immediate](https://github.com/sindresorhus/p-immediate)**: Returns a promise resolved in the next event loop - think `setImmediate()`
- **[p-time](https://github.com/sindresorhus/p-time)**: Measure the time a promise takes to resolve
- **[p-defer](https://github.com/sindresorhus/p-defer)**: Create a deferred promise
- **[p-is-promise](https://github.com/sindresorhus/p-is-promise)**: Check if something is a promise
- **[p-state](https://github.com/sindresorhus/p-state)**: Inspect the state of a promise
- **[p-queue](https://github.com/sindresorhus/p-queue)**: Promise queue with concurrency control
- **[make-synchronous](https://github.com/sindresorhus/make-synchronous)**: Make an asynchronous function synchronous

### `.then`/`.catch`-based packages

*You should generally avoid using `.then` except in edge cases.*

- **[p-catch-if](https://github.com/sindresorhus/p-catch-if)**: Conditional promise catch handler
- **[p-if](https://github.com/sindresorhus/p-if)**: Conditional promise chains
- **[p-tap](https://github.com/sindresorhus/p-tap)**: Tap into a promise chain without affecting its value or state
- **[p-log](https://github.com/sindresorhus/p-log)**: Log the value/error of a promise
- **[p-break](https://github.com/sindresorhus/p-break)**: Break out of a promise chain

## FAQ

### How can I run 100 async/promise-returning functions with only 5 running at once?

This is a good use-case for [`p-map`](https://github.com/sindresorhus/p-map). You might ask why you can't just specify an array of promises. Promises represent values of a computation and not the computation itself - they are eager. So by the time `p-map` starts reading the array, all the actions creating those promises have already started running. `p-map` works by executing a promise-returning function in a mapper function. This way the promises are created lazily and can be concurrency limited. Check out [`p-all`](https://github.com/sindresorhus/p-all) instead if you're using different functions to get each promise.

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

There is a scheduled GitHub Actions workflow that will update p-suite with the latest versions of all its dependencies, once per day. Publishing is *not* automated, however, so major version updates will be made ad-hoc. In general, there will likely be a major version update whenever at least one of the dependency packages is updated.

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
   - calculates an `engines.node` range that satisfies all the sub-packages*
- add tests (right now, just making sure an example module works at runtime and typescript-compile time)
- add CI:
   - run the generate script to make sure everything's up to date
   - use autofix.ci to push an update if not
   - run some tests (right now, just makes sure that types + runtime were generated properly for p-memoize)
   - use pkg.pr.new to publish a prerelease version (so you can try this out right now: `npm install https://pkg.pr.new/mmkal/p-suite@8c181db` - [link](https://github.com/mmkal/p-suite/runs/31040343982))

The idea is that everything should be fully automated, so maintenance should be as simple as `git pull && pnpm install && pnpm generate`.

Personally I would be open to adding some other useful tools that fit well with p-* packages like `expiry-map`, but I'll hold off on that until there's an indication one way or another whether @sindresorhus would like to co-maintain this!

I'm creating it as a draft since it'd be a reasonably big ask for you to accept this. I'm happy to leave it for a few days and rely on the pkg.pr.new link before publishing to npm.

---

*note: the algorithm to detect the minimum required node version depends on the `semver` package's various helpers. It isn't bullet-proof, but from debugging manually it seems good enough. This unfortunately isn't part of semver: https://github.com/npm/node-semver/issues/527. If it breaks down in future it will show up in the generated package.json though.
