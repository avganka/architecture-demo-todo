import { queryClient } from '@/core/store/query-client';
import {
  type DefaultError,
  type QueryKey,
  QueryObserver,
  type QueryObserverOptions,
} from '@tanstack/query-core';
import { createAtom, makeAutoObservable, reaction } from 'mobx';

/**
 * Менеджер состояния для управления запросами данных.
 * Объединяет TanStack Query с MobX для реактивного обновления UI.
 */
export class QueryManager<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> {
  /**
   * MobX атом для отслеживания изменений состояния
   * https://mobx.js.org/custom-observables.html
   */
  private readonly _atom = createAtom(
    // 1st parameter:
    // - Atom's name, for debugging purposes.
    'QueryManager',
    // 2nd (optional) parameter:
    // - Callback for when this atom transitions from unobserved to observed.
    () => {
      this._startTicking();
    },
    // 3rd (optional) parameter:
    // - Callback for when this atom transitions from observed to unobserved.
    () => {
      this._stopTicking();
    },
    // The same atom transitions between these two states multiple times.
  );

  private _queryClient = queryClient;
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
  /**
   * Текущее состояние запроса (данные, статус загрузки, ошибки)
   * Реактивно обновляется при изменении данных
   */
  get results() {
    this._atom.reportObserved();
    this._queryObserver.setOptions(this._getDefaultOptions);
    return this._queryObserver.getOptimisticResult(this._getDefaultOptions);
  }

  /** Принудительно запрашивает свежие данные с сервера */
  fetch() {
    return this._queryObserver.fetchOptimistic(this._getDefaultOptions);
  }

  /** Отменяет текущие запросы с этим queryKey. Нужен для оптимистического обновления данных */
  async cancelQuery() {
    await this._queryClient.cancelQueries({
      queryKey: this._getOptions().queryKey,
    });
  }

  /** Вручную обновляет данные в кеше без запроса к серверу. Используется для оптимистического обновления данных */
  setData(newData?: TData) {
    this._queryClient.setQueryData<TData>(this._getOptions().queryKey, newData);
  }

  private get _getDefaultOptions() {
    return queryClient.defaultQueryOptions(this._getOptions());
  }
  // Внутренние методы для работы с MobX
  private _startTicking() {
    // Следим за изменением опций запроса
    const unsubscribeReaction = reaction(
      () => this._getDefaultOptions,
      () => {
        this._queryObserver.setOptions(this._getDefaultOptions);
      },
    );

    // Подписываемся на обновления состояния запроса
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

  private _unsubscribe() {
    return;
  }
}
