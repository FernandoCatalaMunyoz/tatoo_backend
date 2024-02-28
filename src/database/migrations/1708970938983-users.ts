import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1708970938983 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "first_name",
            type: "varchar",
            length: "255",
          },
          {
            name: "last_name",
            type: "varchar",
            length: "255",
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
          },
          {
            name: "role_id",
            type: "int",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["role_id"],
            referencedTableName: "roles",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
