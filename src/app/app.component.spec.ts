import {interval, map, shareReplay} from 'rxjs';
import {TestScheduler} from 'rxjs/testing';

describe('interval', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should repeat forever without shareReplay', () => {
    testScheduler.run(({ expectObservable }) => {
      const foreverStream$ = interval(1).pipe(map(() => 'a'));

      // Omitting this arg may crash the test suite.
      const unsub = '------!';

      expectObservable(foreverStream$, unsub).toBe('-aaaaa');
    });
  });

  it('should repeat forever with shareReplay', () => {
    testScheduler.run(({ expectObservable }) => {
      const foreverStream$ = interval(1).pipe(map(() => 'a'), shareReplay(1));

      // Omitting this arg may crash the test suite.
      const unsub = '------!';

      expectObservable(foreverStream$, unsub).toBe('-aaaaa');
    });
  });
});
