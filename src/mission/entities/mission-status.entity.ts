import { Entity } from "typeorm";
import { BaseStatus } from "../../base-status";

@Entity('mission_entity')
export class MissionStatus extends BaseStatus{

}