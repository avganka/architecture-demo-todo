import { queryClient } from '@/core/store/query-client';
import type {
  DefaultError,
  MutationObserverOptions,
} from '@tanstack/query-core';
import { MutationObserver } from '@tanstack/query-core';
import { makeAutoObservable } from 'mobx';

/**
 * Менеджер мутаций для изменения данных на сервере.
 * Объединяет TanStack Query Mutations с MobX для реактивного обновления UI.
 */
export class MutationManager<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> {
  private _mutationObserver: MutationObserver<
    TData,
    TError,
    TVariables,
    TContext
  >;

  constructor(
    private readonly _getOptions: () => MutationObserverOptions<
      TData,
      TError,
      TVariables,
      TContext
    >,
  ) {
    this._mutationObserver = new MutationObserver(
      queryClient,
      this._getOptions(),
    );
    makeAutoObservable(this);
  }

  /**
   * Текущее состояние мутации (isLoading, isError, data и т.д.)
   * Реактивно обновляется при изменении состояния
   */
  get state() {
    return this._mutationObserver.getCurrentResult();
  }
  //   Запускает мутацию с переданными данными
  async mutate(variables: TVariables) {
    return await this._mutationObserver.mutate(variables);
  }
}
