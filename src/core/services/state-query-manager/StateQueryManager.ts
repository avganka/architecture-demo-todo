import { queryClient } from '@/core/store/query-client';
import {
  type DefaultError,
  type QueryKey,
  QueryObserver,
  type QueryObserverOptions,
} from '@tanstack/query-core';
import { createAtom, makeAutoObservable, reaction } from 'mobx';

export class StateQueryManager<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> {
  // https://mobx.js.org/custom-observables.html
  private readonly _atom = createAtom(
    // 1st parameter:
    // - Atom's name, for debugging purposes.
    'DataFetchManager',
    // 2nd (optional) parameter:
    // - Callback for when this atom transitions from unobserved to observed.
    () => this._startTicking(),
    // 3rd (optional) parameter:
    // - Callback for when this atom transitions from observed to unobserved.
    () => this._stopTicking(),
    // The same atom transitions between these two states multiple times.
  );

  private _queryClient = queryClient;
  // private _queryObserver: QueryObserver<
  //   TQueryFnData,
  //   TError,
  //   TData,
  //   TQueryData,
  //   TQueryKey
  // > | null = null;
  private _queryObserver = new QueryObserver(
    this._queryClient,
    this._getOptions(),
  );

  constructor(
    private readonly _getOptions: () => QueryObserverOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryData,
      TQueryKey
    >,
  ) {
    makeAutoObservable(this);
  }

  // init() {
  //   // this._atom.reportObserved();
  //   this._queryObserver = new QueryObserver(
  //     this._queryClient,
  //     this._getOptions(),
  //   );
  // }

  fetch() {
    return this._queryObserver?.fetchOptimistic(this._getDefaultOptions);
  }

  get results() {
    this._atom.reportObserved();
    this._queryObserver.setOptions(this._getDefaultOptions);
    return this._queryObserver?.getOptimisticResult(this._getDefaultOptions);
  }

  private _startTicking() {
    const unsubscribeReaction = reaction(
      () => this._getDefaultOptions,
      () => {
        this._queryObserver.setOptions(this._getDefaultOptions);
      },
    );

    const unsubscribeObserver = this._queryObserver.subscribe(() => {
      this._atom.reportChanged();
    });

    this._unsubscribe = () => {
      unsubscribeObserver();
      unsubscribeReaction();
    };
  }

  private _stopTicking() {
    this._unsubscribe();
  }

  private get _getDefaultOptions() {
    return queryClient.defaultQueryOptions(this._getOptions());
  }

  private _unsubscribe() {}
}
