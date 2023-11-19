import { Collection, Entity, OneToMany, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from './BaseEntity';

/**
 * Entity to represent the user in the database and throughout the server 
 */
@Entity()
export class PrivateData extends BaseEntity {
    @Property({ type: 'text', nullable: true }) twitter_id: string;
    @Property({ type: 'text', nullable: true }) icpAddress: string;
    @Property({ type: 'text', nullable: true }) account_id: string;
    @Property({ type: 'text', nullable: true }) phase: string;

}