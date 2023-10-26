import {Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from './BaseEntity';

/**
 * Entity to represent the user in the database and throughout the server 
 */
@Entity()
export class shikuLandProp extends BaseEntity {
    @Property({ type: 'number', nullable: true }) land_id: number;
    @Property({ type: 'string', nullable: true }) pos: string;
    @Property({ type: 'string', nullable: true }) image_url: string;
    @Property({ type: 'string', nullable: true }) planet: string;
    @Property({ type: 'string', nullable: true }) owner: string;
    @Property({ type: 'string', nullable: true }) area: string;
    @Property({ type: 'string', nullable: true }) name: string;
    @Property({ type: 'string', nullable: true }) borrower: string;
    @Property({ type: 'string', nullable: true }) price_for_borrow: string;
    @Property({ type: 'boolean', nullable: true }) land_type: boolean;
    
    @Property({ type: 'number', nullable: true }) expiration: number;
    @Property({ type: 'number', nullable: true }) rent_cycle: number;
    @Property({ type: 'string', nullable: true }) dimension: string;
    @Property({ type: 'string', nullable: true }) planet_id: string;
    @Property({ type: 'string', nullable: true }) number: string;
    @Property({ type: 'number', nullable: true }) land_price: number;
    @Property({ type: 'string', nullable: true }) land_status: string;
    @Property({ type: 'boolean', nullable: true }) can_borrow: boolean;
}