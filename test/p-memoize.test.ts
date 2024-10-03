import pMemoize from '../source/p-memoize'
import { pMemoize as pMemoizeFromBarrel } from '../source'
import { vi } from 'vitest'
import { expect, test, expectTypeOf } from 'vitest'

test('pMemoize', async () => {
    const fn = vi.fn(async (input: number) => [input])
    const memoized = pMemoize(fn)
    await memoized(1)
    await memoized(1)
    expect(fn).toHaveBeenCalledTimes(1)

    expectTypeOf(memoized).returns.toEqualTypeOf<Promise<number[]>>()
})


test('pMemoize from barrel', async () => {
    const fn = vi.fn(async (input: number) => [input])
    const memoized = pMemoizeFromBarrel.default(fn)
    await memoized(1)
    await memoized(1)
    expect(fn).toHaveBeenCalledTimes(1)

    expectTypeOf(memoized).returns.toEqualTypeOf<Promise<number[]>>()
})
