import { EventEmitter } from 'node:events';

export type EventName = string | symbol;

export type ListenerSignature<L> = {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [E in Extract<keyof L, EventName>]: (...args: any[]) => any;
};

export type DefaultListener = {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [k: string]: (...args: any[]) => any;
};

export class TypedEmitter<L extends ListenerSignature<L> = DefaultListener> extends EventEmitter {
  static override defaultMaxListeners: number;

  override addListener<U extends Extract<keyof L, EventName>>(event: U, listener: L[U]): this {
    super.addListener(typeof event === 'number' ? String(event) : event, listener);

    return this;
  }

  override prependListener<U extends Extract<keyof L, EventName>>(event: U, listener: L[U]): this {
    super.prependListener(event, listener);

    return this;
  }

  override prependOnceListener<U extends Extract<keyof L, EventName>>(event: U, listener: L[U]): this {
    super.prependOnceListener(event, listener);

    return this;
  }

  override removeListener<U extends Extract<keyof L, EventName>>(event: U, listener: L[U]): this {
    super.removeListener(event, listener);

    return this;
  }

  override removeAllListeners(event?: Extract<keyof L, EventName>): this {
    super.removeAllListeners(event);

    return this;
  }

  override once<U extends Extract<keyof L, EventName>>(event: U, listener: L[U]): this {
    super.once(event, listener);

    return this;
  }

  override on<U extends Extract<keyof L, EventName>>(event: U, listener: L[U]): this {
    super.on(event, listener);

    return this;
  }

  override off<U extends Extract<keyof L, EventName>>(event: U, listener: L[U]): this {
    super.off(event, listener);

    return this;
  }

  override emit<U extends Extract<keyof L, EventName>>(event: U, ...args: Parameters<L[U]>): boolean {
    return super.emit(event, ...args);
  }

  override eventNames<U extends Extract<keyof L, EventName>>(): U[] {
    return super.eventNames() as U[];
  }

  override listenerCount(type: Extract<keyof L, EventName>): number {
    return super.listenerCount(type);
  }

  override listeners<U extends Extract<keyof L, EventName>>(type: U): L[U][] {
    return super.listeners(type) as L[U][];
  }

  override rawListeners<U extends Extract<keyof L, EventName>>(type: U): L[U][] {
    return super.rawListeners(type) as L[U][];
  }

  override getMaxListeners(): number {
    return super.getMaxListeners();
  }

  override setMaxListeners(n: number): this {
    super.setMaxListeners(n);

    return this;
  }
}
