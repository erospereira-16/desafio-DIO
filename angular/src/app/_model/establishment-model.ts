
export class Establishment {
    id: number | undefined;
    name: string | undefined;
    contactName: string | undefined;
    isActive: boolean | undefined;
    description: string | undefined;
    address: string | undefined;
    cnpj: string | undefined;
    phone: string | undefined;
    imageName: string | undefined;

    public constructor(init?: Partial<Establishment>) {
        Object.assign(this, init);
    }
}
