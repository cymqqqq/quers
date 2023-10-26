import { Collection, Entity, OneToMany, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from './BaseEntity';

/**
 * Entity to represent the user in the database and throughout the server 
 */
@Entity()
export class ShikuNftOwner extends BaseEntity {
    @Property({ type: 'string', nullable: true }) owner: string;

    @Property({ type: 'number', nullable: true }) tokenid: number;

}