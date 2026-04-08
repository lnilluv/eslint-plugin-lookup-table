export type OrderState = "draft" | "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

const TRANSITIONS: Record<OrderState, OrderState[]> = {
  draft: ["pending", "cancelled"],
  pending: ["confirmed", "cancelled"],
  confirmed: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

export class OrderStateMachine {
  private currentState: OrderState;

  constructor(initialState: OrderState = "draft") {
    this.currentState = initialState;
  }

  get state(): OrderState {
    return this.currentState;
  }

  transition(nextState: OrderState): boolean {
    const allowed = TRANSITIONS[this.currentState];

    if (!allowed.includes(nextState)) {
      return false;
    }

    this.currentState = nextState;
    return true;
  }

  getAvailableActions(): OrderState[] {
    return [...TRANSITIONS[this.currentState]];
  }
}
