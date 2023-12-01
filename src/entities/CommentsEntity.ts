import { Collection, Entity, OneToMany, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from './BaseEntity';

/**
 * Entity to represent the user in the database and throughout the server 
 */
@Entity()
export class Comment extends BaseEntity {
    @Property({ type: 'text' }) comment_content: string;
    @Property({ type: 'text' }) comment_date: string;
    @Property({ type: 'number' }) up_comment: number;
    @Property({ type: 'text'}) comment_pid: string;

}