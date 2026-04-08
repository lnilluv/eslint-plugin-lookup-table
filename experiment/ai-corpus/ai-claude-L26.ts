export type EventMap = Record<string, any[]>;

type Listener<Args extends any[]> = (...args: Args) => void;

export class EventEmitter<Events extends EventMap> {
  private listeners = new Map<keyof Events, Set<Listener<any[]>>>();

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): this {
    const existing = this.listeners.get(event) ?? new Set<Listener<any[]>>();
    existing.add(listener as Listener<any[]>);
    this.listeners.set(event, existing);
    return this;
  }

  off<K extends keyof Events>(event: K, listener: Listener<Events[K]>): this {
    const existing = this.listeners.get(event);
    if (!existing) {
      return this;
    }

    existing.delete(listener as Listener<any[]>);
    if (existing.size === 0) {
      this.listeners.delete(event);
    }

    return this;
  }

  once<K extends keyof Events>(event: K, listener: Listener<Events[K]>): this {
    const wrapped: Listener<Events[K]> = (...args) => {
      this.off(event, wrapped);
      listener(...args);
    };

    return this.on(event, wrapped);
  }

  emit<K extends keyof Events>(event: K, ...args: Events[K]): boolean {
    const existing = this.listeners.get(event);
    if (!existing || existing.size === 0) {
      return false;
    }

    for (const listener of [...existing]) {
      (listener as Listener<Events[K]>)(...args);
    }

    return true;
  }
}
