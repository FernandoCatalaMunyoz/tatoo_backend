import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class Appointments1708972222075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "apointments",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "appointment_date",
            type: "timestamp",
            onUpdate: "now()",
          },
          {
            name: "user_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "service_id",
            type: "int",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["service_id"],
            referencedTableName: "services",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
        uniques: [
          new TableUnique({
            name: "user_service_unique",
            columnNames: ["user_id", "service_id"],
          }),
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("appointments");
  }
}
