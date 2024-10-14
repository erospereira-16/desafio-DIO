import { UnitOfMeasurement } from "./unit-of-measurement-model";

export class Input {
    id: number | undefined;
    unitOfMeasurementId: number | undefined;
    description: string | undefined;
    unitOfMeasurement: UnitOfMeasurement | undefined;
    establishmentId: number | undefined;
    isActive: boolean | undefined;
}
