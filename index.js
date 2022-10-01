require("dotenv").config();
const { Pool } = require("pg");
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const TABLE = "any_table";
const path = require('path')

const app = express();
app.use(cors());
app.use(bodyParser.json());

// for prod
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect();

// отправка запроса в бд
const execute = async (query) => {
  try {
    return pool.query(query);
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

// метод добавление новых данных
const addNewTableField = (name, count, destination, date) =>
  execute(
    `INSERT INTO "${TABLE}" ("name", "count", "destination", "date")  
             VALUES ('${name}', ${count}, ${destination}, '${date}')`
  );

// метод для создания моков
const createMockData = async () => {
  const { result } = await getTableData();

  if (result.rows.length) return;

  // добавляем данные если их нету
  addNewTableField("lorem", 344, 531, "1980-01-01");
  addNewTableField("ipsum", 99, 236, "1985-05-05");
  addNewTableField("dolor", 221, 347, "2000-12-29");
  addNewTableField("sit", 2, 3562, "2022-07-21");
  addNewTableField("amet", 14, 245, "2022-12-24");
  addNewTableField("consectetur", 523, 357, "2022-02-12");
  addNewTableField("adipiscing", 134, 3642, "2022-06-27");
  addNewTableField("elit", 5, 346, "2022-09-26");
  addNewTableField("sed", 634, 354, "2022-02-11");
  addNewTableField("do", 12, 745, "2012-09-29");
  addNewTableField("eiusmod", 6, 6342, "2015-02-24");
  addNewTableField("tempor", 10, 135, "2018-11-23");
  addNewTableField("incididunt", 7, 36, "2019-08-24");
  addNewTableField("ut", 12, 462, "2021-09-15");
  addNewTableField("labore", 85, 37, "2020-09-11");
};

// CREATE USERS TABLE IF EXISTS
const createTableIfNotExists = async () => {
  const createUsersTableIfExistsSQL = `
    CREATE TABLE IF NOT EXISTS "${TABLE}" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "count" INTEGER NOT NULL,
	    "destination" INTEGER NOT NULL,
	    "date" DATE NOT NULL,
	    PRIMARY KEY ("id")
    );`;
  await execute(createUsersTableIfExistsSQL);
  await createMockData();
};

const generateOrderByString = (params) => {
  if (!params || !params.sort) return '';

  const sort = JSON.parse(params.sort);

  return ` ORDER BY ${sort.field} ${sort.orderBy}`;
};

const generatePaginationQuery = (offset, limit) => {
  return ` OFFSET ${offset} LIMIT ${limit}`;
};

const generateGeneralSqlFilter = (filter) => {
  const operatorsMap = {
    'equal': '=',
    'contain': 'like',
    'more': '>',
    'less': '<',
  };

  if (filter.operator === 'contain') {
    return ` WHERE ${filter.fieldName} ${operatorsMap[filter.operator]} '%${filter.value}%'`;
  }

  return ` WHERE ${filter.fieldName} ${operatorsMap[filter.operator]} '${filter.value}'`;
};

const generateGeneralSql = (filter) => {
  const operatorsMap = {
    'equal': '=',
    'contain': 'like',
    'more': '>',
    'less': '<',
  };

  if (filter.operator === 'contain') {
    return `select * from ${TABLE} WHERE ${filter.fieldName}
                     ${operatorsMap[filter.operator]} '%${filter.value}%'`;
  }

  return `select * from ${TABLE} 
                     WHERE ${filter.fieldName}
                     ${operatorsMap[filter.operator]} '${filter.value}'`;
};

const getTableData = async (params) => {
  const offset = params && params.offset || 0;
  const limit = params && params.limit || 5;

  const paginationString = generatePaginationQuery(offset, limit);

  // Есть ли данные для фильтрации и сортировки
  if (params && (params.filter || params.sort)) {
    const orderByString = generateOrderByString(params);

    if (params.filter) {
      const filter = JSON.parse(params.filter);
      const generalSqlFilter = generateGeneralSqlFilter(filter);
      const generalSql = generateGeneralSql(filter);
      const totalCount = await getTotalCountTableData(generalSqlFilter);
      const sql = generalSql + orderByString + paginationString;

      return {
        result: await execute(sql),
        totalCount,
      };
    }

    const sql = `SELECT * FROM "${TABLE}"` + orderByString + paginationString;
    const totalCount = await getTotalCountTableData(orderByString);

    return {
      result: await execute(sql),
      totalCount,
    };
  }

  const sql = `SELECT * from "${TABLE}"` + paginationString;
  const totalCount = await getTotalCountTableData();

  return {
    result: await execute(sql),
    totalCount,
  };
};

const getTotalCountTableData = async (sql = '') => {
  const generatedSQL = `SELECT * FROM ${TABLE}` + sql;
  const response = await execute(generatedSQL);

  return response.rows.length;
};

// API REQUESTS
app.get("/getTableData", async ({ query }, res) => {
  const tableDataResponse = await getTableData(query);
  const rows = tableDataResponse.result.rows;

  res.json({
    items: rows,
    totalCount: tableDataResponse.totalCount,
  });
});

// for prod
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

createTableIfNotExists();

app.listen(process.env.PORT || 8080);
