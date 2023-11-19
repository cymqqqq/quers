import { Collection, Entity, OneToMany, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from './BaseEntity';

/**
 * Entity to represent the user in the database and throughout the server 
 */
@Entity()
export class ProfileData extends BaseEntity {
    @Property({ type: 'text', nullable: true }) icpAddress: string;
    @Property({ type: 'text', nullable: true }) twitter_id: string;
    @Property({ type: 'text', nullable: true }) username: string;
    @Property({ type: 'text', nullable: true }) name: string;
    @Property({ type: 'text', nullable: true }) description: string;
    @Property({ type: 'text', nullable: true }) profile_image_url: string;
    @Property({ type: 'number' }) followers_count: number;
    @Property({ type: 'number' }) following_count: number;
    @Property({ type: 'number' }) tweet_count: number;
    @Property({ type: 'number' }) listed_count: number;
    @Property({ type: 'number' }) like_count: number;
    @Property({ type: 'number' }) holder: number;
    @Property({ type: 'number' }) holding: number;
    @Property({ type: 'number' }) tvl: number;
    @Property({ type: 'number' }) tickets: number;

}