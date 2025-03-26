
import { Table, Model, Column, HasMany } from "sequelize-typescript";
import { Session } from "./session";

@Table
export class User extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id?: number;

    @Column({ allowNull: false })
    username!: string;

    @Column({ allowNull: false, unique: true })
    email?: string;

    @Column({ allowNull: false })
    password!: string;

    @HasMany(() => Session)
    session?: Session[];

}