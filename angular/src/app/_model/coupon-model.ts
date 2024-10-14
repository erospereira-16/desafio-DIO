export class Coupon {
    id: number | undefined;
    description: string | undefined;
    code: string | undefined;
    quantity: number | undefined;
    clientId?: number;
    type: boolean | undefined;
    general: boolean | undefined;
    main: boolean | undefined;
    active: boolean | undefined;
    value: number | undefined;
    initialDate: Date | undefined;
    finalDate: Date | undefined;
    establishmentId: number | undefined;

    public constructor(init?: Partial<Coupon>) {
        Object.assign(this, init);
    }
}