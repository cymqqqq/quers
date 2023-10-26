import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from './BaseEntity';

/**
 * Entity to represent the user in the database and throughout the server 
 */
@Entity()
export class FileUpload extends BaseEntity {
    @Property({ type: 'number' }) state: number;    // 1、进行中  2、成功  3、失败
    @Property({ type: 'string' }) url: string;
    @Property({ type: 'number' }) uploadProgress: number;     // 进度
    @Property({ type: 'string', nullable: true }) failReason: string;
}