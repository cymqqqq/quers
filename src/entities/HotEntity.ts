import { Collection, Entity, OneToMany, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from './BaseEntity';
import { Answer } from "./AnswerEntity";
/**
 * Entity to represent the user in the database and throughout the server 
 */
@Entity()
export class HotEntity extends BaseEntity {
    @Property({ type: 'number' }) hot: number;
    @Property({ type: 'text' }) question_id: string;
    @Property({ type: 'text' }) question_title: string;
    @Property({ type: 'text', nullable: true }) question_date: string;
    @Property({ type: 'number' }) votes: number;
    @Property({ type: 'Answer' }) answers: Answer[];

    
    @Property({ type: 'text'}) question_asker: string;
    @Property({ type: 'text', nullable: true }) question_logo: string[];
    @Property({ type: 'text', nullable: true }) question_description: string;
    @Property({ type: 'text'}) tags: string[];
    @Property({ type: 'text'}) question_image: string[];

    
}