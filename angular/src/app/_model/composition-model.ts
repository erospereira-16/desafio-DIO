import { UnitOfMeasurement } from "./unit-of-measurement-model";

export class Composition {
    id: number | undefined;
    unitOfMeasurementId: number | undefined;
    description: string | undefined;
    unitOfMeasurement: UnitOfMeasurement | undefined;
    establishmentId: number | undefined;
    value: number | undefined;
    isActive: boolean | undefined;
    type: boolean | undefined;
}
