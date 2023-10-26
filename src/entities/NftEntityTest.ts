import { Collection, Entity, OneToMany, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from './BaseEntity';

/**
 * Entity to represent the user in the database and throughout the server 
 */
@Entity()
export class YumiNftTest extends BaseEntity {
    @Property({ type: 'string', nullable: true }) owner: string;
    @Property({ type: 'string', nullable: true }) icpAddress: string;

    @Property({ type: 'number', nullable: true }) tokenid: number;
    @Property({ type: 'string', nullable: true }) url: string;
    @Property({ type: 'string', nullable: true }) name: string;
    @Property({ type: 'string', nullable: true }) price: string;
    @Property({ type: 'string', nullable: true }) collection: string;
    @Property({ type: 'string', nullable: true }) token: string;
}