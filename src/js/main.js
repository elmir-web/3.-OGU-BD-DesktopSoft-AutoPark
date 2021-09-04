const remote = require("electron").remote;
const wnd = remote.getCurrentWindow();

window.onload = function () {
  // кнопки управления окном
  document.querySelector(".btn-min").addEventListener("click", () => {
    wnd.minimize();
  });

  document.querySelector(".btn-close").addEventListener("click", () => {
    wnd.close();
  });
  // кнопки управления окном

  // кнопки навигации по программе
  document.querySelector(".butt-base").addEventListener("click", async () => {
    // кнопка показа баз
    document.querySelector(".nav").style.display = "none"; // скрыть навигацию
    document.querySelector(".display").style.display = "block"; // показать общий блок
    document.querySelector(".all-base").style.display = "block"; // показать все базы

    await showAllBase(); // вывод всех баз из таблицы
  });

  document.querySelector(".butt-garage").addEventListener("click", () => {
    // кнопка показа гаражей
    document.querySelector(".nav").style.display = "none"; // скрыть навигацию
    document.querySelector(".display").style.display = "block"; // показать общий блок
    document.querySelector(".all-garages").style.display = "block"; // показать все гаражи
  });

  document.querySelector(".butt-auto").addEventListener("click", () => {
    // кнопка показа авто
    document.querySelector(".nav").style.display = "none"; // скрыть навигацию
    document.querySelector(".display").style.display = "block"; // показать общий блок
    document.querySelector(".all-autos").style.display = "block"; // показать все авто
  });

  document.querySelector(".butt-gsm").addEventListener("click", () => {
    // кнопка показа гсм
    document.querySelector(".nav").style.display = "none"; // скрыть навигацию
    document.querySelector(".display").style.display = "block"; // показать общий блок
    document.querySelector(".types-fuels-and-lubs").style.display = "block"; // показать все гсм
  });

  document.querySelector(".butt-sheet").addEventListener("click", () => {
    // кнопка показа ведомостей
    document.querySelector(".nav").style.display = "none"; // скрыть навигацию
    document.querySelector(".display").style.display = "block"; // показать общий блок
    document.querySelector(".all-sheets").style.display = "block"; // показать все ведомости
  });

  document.querySelector(".butt-worker").addEventListener("click", () => {
    // кнопка показа работников
    document.querySelector(".nav").style.display = "none"; // скрыть навигацию
    document.querySelector(".display").style.display = "block"; // показать общий блок
    document.querySelector(".all-works").style.display = "block"; // показать всех работников
  });

  document.querySelector(".butt-to-navs").addEventListener("click", () => {
    document.querySelector(".nav").style.display = "block";
    document.querySelector(".display").style.display = "none";
    document.querySelector(".all-base").style.display = "none";
    document.querySelector(".all-garages").style.display = "none";
    document.querySelector(".all-autos").style.display = "none";
    document.querySelector(".types-fuels-and-lubs").style.display = "none";
    document.querySelector(".all-sheets").style.display = "none";
    document.querySelector(".all-works").style.display = "none";
  });
  // кнопки навигации по программе

  // кнопки на странице базы
  document
    .querySelector(".butt-change-base")
    .addEventListener("click", async () => {
      // кнопка изменения названия базы
      let baseID = document.querySelector(".input-id-change").value;
      let newNameBase = document.querySelector(".input-name-change").value;

      const [rows, fields] = await remote
        .getGlobal("connectMySQL")
        .execute(
          `update base set Name = '${newNameBase}' where id = ${baseID}`
        );

      if (rows["affectedRows"]) {
        window.alert(`База ID:${baseID} изменила название на "${newNameBase}"`);
      } else window.alert(`База для переименования не найдена!`);

      await showAllBase(); // вывод всех баз из таблицы
    });

  document
    .querySelector(".butt-create-base")
    .addEventListener("click", async () => {
      // кнопка создания базы
      let newName = document.querySelector(".input-name-create").value;

      const [rows, fields] = await remote
        .getGlobal("connectMySQL")
        .execute(`insert into base (Name) values ('${newName}')`);

      window.alert(`База "${newName}" была создана`);

      await showAllBase(); // вывод всех баз из таблицы
    });

  document
    .querySelector(".butt-remove-base")
    .addEventListener("click", async () => {
      // кнопка удаления базы
      let baseID = document.querySelector(".input-id-remove").value;

      let decisionRequest = confirm(
        "Вы действительно хотите удалить базу?\n" +
          "(Все связанные с этой базой данные будут удалены (гаражи -> sheet -> record, гаражи -> их автомобили))\n" +
          'Кнопка "OK" - удалит базу ID: ' +
          baseID +
          ".\n" +
          'Кнопка "Отмена" - закроет текущий диалог (база не будет удалена)'
      );
      if (decisionRequest) {
        let [rowsAllBase, fieldsAllBase] = await remote // получаем все строки баз по этому ID
          .getGlobal("connectMySQL")
          .execute(`SELECT * FROM base WHERE ID = ${baseID}`);

        if (rowsAllBase.length) {
          // есть автомобильные базы по этому ID

          let [rowsAllGarages, fieldsAllGarages] = await remote // получаем все строки гаражей по этому ID базы
            .getGlobal("connectMySQL")
            .execute(`SELECT * FROM garage WHERE IDbase = ${baseID}`);

          if (rowsAllGarages.length) {
            // есть гаражи базы по этому ID автомобильной базы
            let IDsAllGarages = []; // массив всех ID гаражей по этому ID базы

            for (let i = 0; i < rowsAllGarages.length; i++) {
              IDsAllGarages.push(rowsAllGarages[i]["ID"]);
            }

            for (let i = 0; i < IDsAllGarages.length; i++) {
              let [rowsAllSheets, fieldsAllSheets] = await remote // получаем все строки SHEETS по этому ID гаража
                .getGlobal("connectMySQL")
                .execute(
                  `SELECT * FROM sheet WHERE IDgarage = ${IDsAllGarages[i]}`
                );

              if (rowsAllSheets.length) {
                // есть SHEETS по этому ID гаража
                let IDsAllSheets = [];

                for (let j = 0; j < rowsAllSheets.length; j++) {
                  IDsAllSheets.push(rowsAllSheets[j]["ID"]);
                }

                for (let j = 0; j < IDsAllSheets.length; j++) {
                  let [rowsAllRecords, fieldsAllRecords] = await remote // получаем все строки RECORD по этому ID SHEETS
                    .getGlobal("connectMySQL")
                    .execute(
                      `SELECT * FROM record WHERE IDsheet = ${IDsAllSheets[j]}`
                    );

                  if (rowsAllRecords.length) {
                    // есть RECORDS по этому ID SHEETS
                    let IDsAllRecords = [];

                    for (let z = 0; z < rowsAllRecords.length; z++) {
                      IDsAllRecords.push(rowsAllRecords[z]["ID"]);
                    }

                    for (let z = 0; z < IDsAllRecords.length; z++) {
                      // DELETE
                      let [rowsDeleteRecords, fieldsDeleteRecords] =
                        await remote // удаляем все RECORDS по этому ID SHEETS
                          .getGlobal("connectMySQL")
                          .execute(
                            `DELETE FROM record WHERE ID = ${IDsAllRecords[z]}`
                          );
                    }
                  }

                  // удаление всех SHEETS по этому ID гаража
                  // DELETE
                  let [rowsDeleteSheets, fieldsDeleteSheets] = await remote // удаляем все SHEETS по этому ID гаража
                    .getGlobal("connectMySQL")
                    .execute(`DELETE FROM sheet WHERE ID = ${IDsAllSheets[j]}`);
                }
              }

              let [rowsAllCars, fieldsAllCars] = await remote // получаем все автомобили по этому ID гаража
                .getGlobal("connectMySQL")
                .execute(
                  `SELECT * FROM car WHERE IDgarage = ${IDsAllGarages[i]}`
                );

              if (rowsAllCars.length) {
                // есть автомобили по этому ID гаража
                let IDsAllCars = [];

                for (let j = 0; j < rowsAllCars.length; j++) {
                  IDsAllCars.push(rowsAllCars[j]["ID"]);
                }

                for (let j = 0; j < IDsAllCars.length; j++) {
                  // DELETE
                  let [rowsDeleteCars, fieldsDeleteCars] = await remote // получаем все автомобили по этому ID гаража
                    .getGlobal("connectMySQL")
                    .execute(`DELETE FROM car WHERE ID = ${IDsAllCars[j]}`);
                }
              }
            }

            // удаление всех гаражей по этому ID базы
            // DELETE
            let [rowsDeleteGarage, fieldsDeleteGarage] = await remote // удаляем все строки гаражей по этому ID базы
              .getGlobal("connectMySQL")
              .execute(`DELETE FROM garage WHERE IDbase = ${baseID}`);
          }

          let [rowsAllWorkers, fieldsAllWorkers] = await remote // получаем все строки работников по этому ID базы
            .getGlobal("connectMySQL")
            .execute(`SELECT * FROM worker WHERE IDbase = ${baseID}`);

          if (rowsAllWorkers.length) {
            // есть работники по этому ID автомобильной базы
            let IDsAllWorkers = [];

            for (let i = 0; i < rowsAllWorkers.length; i++) {
              IDsAllWorkers.push(rowsAllWorkers[i]["ID"]);
            }

            for (let i = 0; i < IDsAllWorkers.length; i++) {
              // удаление всех работников по этому ID базы
              // DELETE
              let [rowsDeleteWorkers, fieldsDeleteWorkers] = await remote // удаляем всех работников по ID базы
                .getGlobal("connectMySQL")
                .execute(`DELETE FROM worker WHERE ID = ${IDsAllWorkers[i]}`);
            }
          }

          // удаление всех баз по этому ID
          // DELETE
          let [rowsDeleteBase, fieldsDeleteBase] = await remote // удаляем все строки баз по этому ID
            .getGlobal("connectMySQL")
            .execute(`DELETE FROM base WHERE ID = ${baseID}`);

          window.alert(
            `Выбранная база (${baseID}) была успешно удалена, а с ней были удалены гаражи -> sheet -> record, гаражи -> их автомобили`
          );

          await showAllBase(); // вывод всех баз из таблицы
        } else window.alert(`База не найдена`);
      }
    });
  // кнопки на странице базы
};

async function showAllBase() {
  // вывод всех баз из таблицы
  const [rows, fields] = await remote
    .getGlobal("connectMySQL")
    .execute("select * from base");

  let construntBlock = `
  <table class="table_col">
    <colgroup>
      <col style="background: #555555" />
    </colgroup>
    <tr>
      <th>ID базы</th>
      <th>Название базы</th>
    </tr>
  `;

  if (rows.length) {
    for (let i = 0; i < rows.length; i++) {
      construntBlock += `
    <tr>
      <td>${rows[i]["ID"]}</td>
      <td>${rows[i]["Name"]}</td>
    </tr>
    `;
    }
  } else {
    construntBlock += `<tr><td rowspan="1" colspan="2">Нету автомобильных баз</td></tr>`;
  }

  construntBlock += `</table>`;

  document.querySelector(".display-print").innerHTML = construntBlock;
}
