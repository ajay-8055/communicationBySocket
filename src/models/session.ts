import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user";

@Table
export class Session extends Model<Session> {

    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    id?: number;

    @Column({ allowNull: false })
    token!: string

    @Column({ allowNull: false })
    ipAddress!: string

    @Column({ allowNull: false })
    expiresAt!: Date;

    @Column({ allowNull: false })
    userAgent!: string;

    @ForeignKey(() => User)
    @Column({})
    userID!: number;

    @BelongsTo(() => User)
    user!: typeof User;
}