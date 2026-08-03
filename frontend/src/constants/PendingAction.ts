export const PendingAction = {

    NONE: "NONE",

    CHECKOUT: "CHECKOUT",

    ORDERS: "ORDERS"

} as const;

export type PendingActionType =
    typeof PendingAction[keyof typeof PendingAction];