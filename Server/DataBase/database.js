const Database = require("better-sqlite3");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const console = require("console");

class DataBaseSystem {
  /**
   * Creates Database
   * @param DbName Name of the db
   * @param Data_Loc Location of the db file
   */
  constructor(DbName, Data_Loc) {
    this.name = DbName;
    this.database = new Database(Data_Loc + DbName + ".db");
  }

  /**
   * Imports DDL
   * @param path Location of the ddl file
   */
  importDDL(path) {
    this.database.exec(fs.readFileSync(path, "utf-8"));
  }
  /**
   * Selects all records from a given table with a set value.
   * @param table The table which the db will look at.
   * @param field The field which the db will need to check.
   * @param value The value to check in the where.
   * @returns true if there are records.
   */
  getRecord(table, field, value) {
    const sql = this.database.prepare(
      `SELECT * FROM ${table} WHERE ${field} = ?`
    );
    const rows = sql.all(value);
    if (rows.length == 0) {
      throw "No data";
    }

    return rows;
  }
  /**
   * Selects all records from a given table.
   * @param table The table which the db will look at.
   * @returns All rows in the selected table.
   */
  getAllRecords(table) {
    const sql = this.database.prepare(`SELECT * FROM ${table}`);
    const rows = sql.all();

    return rows;
  }
  /**
   * Selects all records in a specific field with a set value.
   * @param {*} table The table which the db will look at.
   * @param {*} selectfield The field which the select statment will grab.
   * @param {*} field The field which the db will need to check.
   * @param {*} value The value to check in the where.
   * @returns Records in an array.
   */
  getField(table, selectfield, field, value) {
    const sql = this.database.prepare(
      `SELECT ${selectfield} FROM ${table} WHERE ${field} = ?`
    );
    const rows = sql.all(value);

    return rows;
  }
  /**
   * Checks if a given value is in a table.
   * @param {*} table The table which the db look at.
   * @param {*} field The field which the db will check.
   * @param {*} value The value to check in the where.
   * @returns True or False
   */
  inTable(table, field, value) {
    try {
      this.getRecord(table, field, value);
      return true;
    } catch (error) {
      if (error === "No data") return false;
      throw error;
    }
  }

  /**
   * Deletes all records within the given table with a set value.
   * @param {*} table The table which the db look at.
   * @param {*} field The field which the db will check.
   * @param {*} value The value to check in the where.
   */
  deleteRecord(table, field, value) {
    const sql = this.database.prepare(
      `DELETE FROM ${table} WHERE ${field} = ?;`
    );
    try {
      sql.run(value);
    } catch (err) {
      console.log("Field Error");
    }
  }

  deleteTable(tablename) {
    const sql = this.database.prepare(`DROP TABLE ${tablename}`);
    sql.run();
  }

  updateRecord(table, field, newValue, checkedField, value) {
    const sql = this.database.prepare(`
        UPDATE ${table} SET ${field} = ?
        WHERE ${checkedField} = ?;`);
    try {
      sql.run(newValue, value);
    } catch (err) {
      log.error(log.logType.DATABASE, __filename, err);
      throw "some field error";
    }
  }

  generateUUID(table, field) {
    const uuid = uuidv4();
    if (this.inTable(table, field, uuid)) return this.generateUUID();
    return uuid;
  }
}

 module.exports = { DataBaseSystem };