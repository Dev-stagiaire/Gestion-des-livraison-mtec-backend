import { Configuration } from "../entities/configuration.entity";
import { PartialType } from "@nestjs/mapped-types";

export class ConfigurationDto extends PartialType(Configuration) {

}