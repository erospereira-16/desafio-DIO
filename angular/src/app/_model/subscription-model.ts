import { Plan } from "./plan-model";

export class Subscription {
    id: number | undefined;
    paymentId: string | undefined;
    couponId?: number;
    value?: number | undefined;
    subscriptionDate: Date | undefined;
    establishmentId: number | undefined;
    planId: number | undefined;
    tolerance?: number | undefined;
    paymentMethodId?: number | undefined;
    isActive: boolean | undefined;
    plan: Plan | undefined;
 
    public constructor(init?: Partial<Subscription>) {
        Object.assign(this, init);
    }
}