export type OrderState = "draft" | "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export type OrderAction = "submit" | "confirm" | "ship" | "deliver" | "cancel";

const transitions: Record<OrderState, Partial<Record<OrderAction, OrderState>>> = {
  draft: { submit: "pending", cancel: "cancelled" },
  pending: { confirm: "confirmed", cancel: "cancelled" },
  confirmed: { ship: "shipped", cancel: "cancelled" },
  shipped: { deliver: "delivered" },
  delivered: {},
  cancelled: {},
};

export class OrderStateMachine {
  private state: OrderState;

  constructor(initialState: OrderState = "draft") {
    this.state = initialState;
  }

  getState(): OrderState {
    return this.state;
  }

  getAvailableActions(): OrderAction[] {
    return Object.keys(transitions[this.state]) as OrderAction[];
  }

  transition(action: OrderAction): OrderState {
    const nextState = transitions[this.state]?.[action];
    if (!nextState) {
      throw new Error(
        `Invalid transition: cannot perform "${action}" from state "${this.state}". Available actions: ${this.getAvailableActions().join(", ") || "none"}`
      );
    }
    this.state = nextState;
    return this.state;
  }

  canPerform(action: OrderAction): boolean {
    return action in transitions[this.state];
  }
}
