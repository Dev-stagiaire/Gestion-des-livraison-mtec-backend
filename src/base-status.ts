import { BaseEntity } from "typeorm";

export abstract class BaseStatus extends BaseEntity{

    name: string;
}