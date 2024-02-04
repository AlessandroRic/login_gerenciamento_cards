/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Card extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    titulo!: string;

    @Column({ type: 'text' })
    conteudo!: string;

    @Column({ type: 'varchar', length: 255 })
    lista!: string;
}
