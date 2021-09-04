/*

[15:00, 03.09.2021] ВИТЯ IT ММСК: В phpmyadmin есть в ещё дизайнер там можно увидеть как связаны таблички
[15:02, 03.09.2021] ВИТЯ IT ММСК: base автобаза номер и название
[15:03, 03.09.2021] ВИТЯ IT ММСК: Garage гараж какой-то базы
[15:05, 03.09.2021] ВИТЯ IT ММСК: В phpmyadmin в базе выбираем структура и связи там показано как связаны таблицы
[15:05, 03.09.2021] ВИТЯ IT ММСК: car авто какого-то гаража
[15:07, 03.09.2021] ВИТЯ IT ММСК: Worker сотрудник базы поле function говорит 1 это водитель 2 подписант
[15:09, 03.09.2021] ВИТЯ IT ММСК: Gsm топливо forkilo это перевод литров liter в кг kilo берём 10 л умножаем на forkilo получаем кг
[15:10, 03.09.2021] ВИТЯ IT ММСК: Sheet ведомость на дату номер дата какой гараж кто подписант
[15:11, 03.09.2021] ВИТЯ IT ММСК: Record записи ведомость тут связи с ведомость ю авто ГСМ водителя и кол-во л и кг
[15:12, 03.09.2021] ВИТЯ IT ММСК: По скриптам гараж и подписант по базе думаю понятно уже
[15:16, 03.09.2021] ВИТЯ IT ММСК: Ведомость шапка это инфа по ведомости , там полям понятно там гараж номер дата подписант, пример, бланк чегото
[15:17, 03.09.2021] ВИТЯ IT ММСК: А ведомость записи ну записи. Этой ведомости по заданию какие поля выводить

*/

const mysql = require("mysql2/promise");

const config = {
  host: "localhost",
  user: "root",
  database: "bd_test1",
  password: "root",
};

window.onload = async function () {
  document.querySelector("#gogogo").addEventListener("click", async () => {
    let fname = document.querySelector("#fname").value;
    let lname = document.querySelector("#lname").value;
    let email = document.querySelector("#email").value;

    // вставка
    await conn.execute(
      `insert into users (id, firstname, lastname, email) values (NULL, '${fname}', '${lname}', '${email}')`
    );
  });

  const conn = await mysql.createConnection(config);

  // выборка
  const [rows, fields] = await remote
    .getGlobal("connectMySQL")
    .execute("select * from users");

  document.querySelector("#all-users").innerHTML = JSON.stringify(rows); // вывести rows

  // const [rows, fields] = await remote
  //   .getGlobal("connectMySQL")
  //   .execute(
  //     "SELECT car.Model, car.Number, record.NumberPL, `worker`.`FIO`, gsm.Name, record.Liter, record.Kilo FROM `sheet` INNER JOIN `record` ON `record`.`IDsheet` = `sheet`.`ID` INNER JOIN `car` ON `car`.`ID` = `record`.`IDcar` INNER JOIN `gsm` ON `gsm`.`ID` = `record`.`IDgsm` INNER JOIN `worker` ON worker.ID = record.IDdriver WHERE sheet.ID = 2"
  //   ); // Ведомость Записи.sql

  // const [rows, fields] = await remote
  //   .getGlobal("connectMySQL")
  //   .execute(
  //     "SELECT `base`.`Name`, `garage`.`Name`, `sheet`.`NumberSheet`, `sheet`.`DateSheet`, `worker`.`FIO` FROM `sheet` INNER JOIN `garage` ON `garage`.`ID` = `sheet`.`IDgarage` INNER JOIN `base` ON `base`.`ID` = `garage`.`IDbase` INNER JOIN `worker` ON `base`.`ID` = `worker`.`IDbase` and worker.ID = sheet.IDsigner where sheet.ID = 3"
  //   ); // Ведомость Шапка.sql

  // const [rows, fields] = await remote
  //   .getGlobal("connectMySQL")
  //   .execute(
  //     "select worker.ID, worker.FIO from worker INNER JOIN base ON base.ID = worker.IDbase AND worker.Function = 1 where base.ID = 1"
  //   ); // Водитель по базе.sql

  // const [rows, fields] = await remote
  //   .getGlobal("connectMySQL")
  //   .execute(
  //     "select garage.ID, garage.Name from garage INNER JOIN base ON base.ID = garage.IDbase where base.ID = 1"
  //   ); // Гараж по базе.sql

  // const [rows, fields] = await remote
  //   .getGlobal("connectMySQL")
  //   .execute(
  //     "SELECT `garage`.`Name`, `gsm`.`Name`,  SUM(record.Liter) as Liter, SUM(record.Kilo) as Kilo FROM `gsm` INNER JOIN `record` ON `gsm`.`ID` = `record`.`IDgsm` INNER JOIN `sheet` ON `sheet`.`ID` = `record`.`IDsheet` INNER JOIN `garage` ON garage.`ID` = `sheet`.`IDgarage` WHERE sheet.DateSheet = '2021-09-01' and garage.ID = 1 GROUP BY `garage`.`Name`, `gsm`.`Name`"
  //   ); // ГСМ за день по гаражу.sql

  // const [rows, fields] = await remote
  //   .getGlobal("connectMySQL")
  //   .execute(
  //     "select worker.ID, worker.FIO from worker INNER JOIN base ON base.ID = worker.IDbase AND worker.Function = 2 where base.ID = 1"
  //   ); // Подписант по базе.sql

  // document.querySelector(".main pre").innerHTML = JSON.stringify(rows, null, 2); // вывести rows
};
