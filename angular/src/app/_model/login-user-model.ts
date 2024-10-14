import { Module } from "./module-model";

export class LoginUser {
    email: string | undefined;
    name: string | undefined;
    code: string | undefined;
    establishmentId: number | undefined;
    module: Module | undefined;
}
