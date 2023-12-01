import { Collection, Entity, OneToMany, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from './BaseEntity';
import { Comment } from "./CommentsEntity";
/**
 * Entity to represent the user in the database and throughout the server 
 */
@Entity()
export class Answer extends BaseEntity {
    @Property({ type: 'text' }) answer_content: string;
    @Property({ type: 'text' }) answer_date: string;
    @Property({ type: 'number' }) up_thumb: number;
    @Property({ type: 'text'}) answer_pid: string;
    @Property({ type: 'Comment'}) comments: Comment[];

}