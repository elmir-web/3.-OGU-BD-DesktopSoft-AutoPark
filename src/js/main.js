// ______________________________________________________________________ | Расширения
const remote = require("electron").remote;
const wnd = remote.getCurrentWindow();
let moment = require("moment");
// ______________________________________________________________________ | Расширения

// ______________________________________________________________________ | Глобальные переменные файла
let mainAllBasesRows = [];
let mainAllGaragesRows = [];
let mainAllWorkersRows = [];
// ______________________________________________________________________ | Глобальные переменные файла

// ______________________________________________________________________ | Где все начинается
window.onload = function () {
  // ____________________________________________________________ | Управление окном программы
  document //                                             Свернуть окно
    .querySelector(".btn-min")
    .addEventListener("click", () => wnd.minimize());

  document //                                             Закрыть окно
    .querySelector(".btn-close")
    .addEventListener("click", () => wnd.close());
  // ____________________________________________________________ | Управление окном программы

  // ____________________________________________________________ | [КНОПКИ] Навигация в интерфейсе
  document //                                             html.button."Все базы"
    .querySelector(".butt-base")
    .addEventListener(
      "click",
      async () => await ShowDisplayStatus(".all-base")
    );

  document //                                             html.button."Все гаражи"
    .querySelector(".butt-garage")
    .addEventListener(
      "click",
      async () => await ShowDisplayStatus(".all-garages")
    );

  document //                                             html.button."Все автомобили"
    .querySelector(".butt-auto")
    .addEventListener(
      "click",
      async () => await ShowDisplayStatus(".all-autos")
    );

  document //                                             html.button."Виды гсм"
    .querySelector(".butt-gsm")
    .addEventListener(
      "click",
      async () => await ShowDisplayStatus(".types-fuels-and-lubs")
    );

  document //                                             html.button."Ведомости"
    .querySelector(".butt-sheet")
    .addEventListener(
      "click",
      async () => await ShowDisplayStatus(".all-sheets")
    );

  document //                                             html.button."Путевые листы"
    .querySelector(".butt-record")
    .addEventListener(
      "click",
      async () => await ShowDisplayStatus(".all-records")
    );

  document //                                             html.button."Работники"
    .querySelector(".butt-worker")
    .addEventListener(
      "click",
      async () => await ShowDisplayStatus(".all-works")
    );

  document //                                             html.button."Назад"
    .querySelector(".butt-to-navs")
    .addEventListener("click", async () => await ShowDisplayStatus(".nav"));
  // ____________________________________________________________ | [КНОПКИ] Навигация в интерфейсе

  // ____________________________________________________________ | Навигация: "Все базы"
  document //                                             html.button."Изменить"
    .querySelector(".butt-change-base")
    .addEventListener("click", async () => await RenameBase());

  document //                                             html.button."Создать базу"
    .querySelector(".butt-create-base")
    .addEventListener("click", async () => await CreateBase());

  document //                                             html.button."Удалить базу (ОСТОРОЖНО!)"
    .querySelector(".butt-remove-base")
    .addEventListener("click", async () => await DeleteBase());
  // ____________________________________________________________ | Навигация: "Все базы"

  // ____________________________________________________________ | Навигация: "Все гаражи"
  document //                                             html.button."Изменить"
    .querySelector(".butt-change-garage")
    .addEventListener("click", async () => await RenameGarage());

  document //                                            html.button."Создать гараж"
    .querySelector(".butt-create-garage")
    .addEventListener("click", async () => await CreateGarage());

  document //                                             html.button."Удалить гараж (ОСТОРОЖНО!)"
    .querySelector(".butt-remove-garage")
    .addEventListener("click", async () => await DeleteGarage());
  // ____________________________________________________________ | Навигация: "Все гаражи"

  // ____________________________________________________________ | Навигация: "Все автомобили"
  document //                                             html.button."Изменить"
    .querySelector(".butt-change-auto")
    .addEventListener("click", async () => await RenameVehicle());

  document //                                             html.button."Создать автомобиль"
    .querySelector(".butt-create-auto")
    .addEventListener("click", async () => await CreateVehicle());

  document //                                             html.button."Удалить автомобиль"
    .querySelector(".butt-remove-auto")
    .addEventListener("click", async () => await RemoveVehicle());
  // ____________________________________________________________ | Навигация: "Все автомобили"

  // ____________________________________________________________ | Навигация: "Виды ГСМ"
  document //                                             html.button."Изменить"
    .querySelector(".butt-change-gsm")
    .addEventListener("click", async () => await RenameGSM());

  document //                                             html.button."Создать ГСМ"
    .querySelector(".butt-create-gsm")
    .addEventListener("click", async () => await CreateGSM());

  document //                                             html.button."Удалить ГСМ"
    .querySelector(".butt-remove-gsm")
    .addEventListener("click", async () => await RemoveGSM());
  // ____________________________________________________________ | Навигация: "Виды ГСМ"

  // ____________________________________________________________ | Навигация: "Ведомости"
  // ____________________________________________________________ | Навигация: "Ведомости"

  // ____________________________________________________________ | Навигация: "Работники"
  document //                                             html.button."Изменить"
    .querySelector(".butt-change-worker")
    .addEventListener("click", async () => await RenameWorkers());

  document //                                             html.button."Создать"
    .querySelector(".butt-create-worker")
    .addEventListener("click", async () => await CreateWorkers());

  document //                                             html.button."Удалить сотрудника"
    .querySelector(".butt-remove-worker")
    .addEventListener("click", async () => await RemoveWorkers());
  // ____________________________________________________________ | Навигация: "Работники"

  // ____________________________________________________________ | Навигация: "Ведомости"
  document //                                             html.button."Изменить"
    .querySelector(".butt-change-sheets")
    .addEventListener("click", async () => await RenameSheet());

  document //                                             html.button."Создать"
    .querySelector(".butt-create-sheets")
    .addEventListener("click", async () => await CreateSheet());

  document //                                             html.button."Удалить ведомость"
    .querySelector(".butt-remove-sheet")
    .addEventListener("click", async () => await RemoveSheet());
  // ____________________________________________________________ | Навигация: "Ведомости"
};
// ______________________________________________________________________ | Где все начинается

// ______________________________________________________________________ | [ЛОГИКА] Навигация в интерфейсе
async function ShowDisplayStatus(statusName) {
  if (statusName === ".nav" /* html.button."Назад" */) {
    document.querySelector(statusName).style.display = "block";
    document.querySelector(".display").style.display = "none";
    document.querySelector(".all-base").style.display = "none";
    document.querySelector(".all-garages").style.display = "none";
    document.querySelector(".all-autos").style.display = "none";
    document.querySelector(".types-fuels-and-lubs").style.display = "none";
    document.querySelector(".all-sheets").style.display = "none";
    document.querySelector(".all-records").style.display = "none";
    document.querySelector(".all-works").style.display = "none";
    return;
  } else if (statusName === ".all-base" /* html.button."Все базы" */)
    await showAllBase();
  // вывод всех баз из таблицы
  else if (statusName === ".all-garages" /* html.button."Все гаражи" */)
    await ShowAllGarages();
  // вывод всех гаражей из таблицы
  // показать все авто
  else if (statusName === ".all-autos" /* html.button."Все автомобили" */) {
    await ShowAllAutos();
  }
  // показать все гсм
  else if (
    statusName === ".types-fuels-and-lubs" /* html.button."Виды гсм" */
  ) {
    await ShowAllGSM();
  }
  // показать ведомости
  else if (statusName === ".all-sheets" /* html.button."Ведомости" */) {
    await ShowAllSheets();
  }
  // показать путевые листы
  else if (statusName === ".all-records" /* html.button."Путевые листы" */) {
  }
  // показать всех работников
  else if (statusName === ".all-works" /* html.button."Работники" */) {
    await ShowAllWorkers();
  }

  document.querySelector(".nav").style.display = "none"; // скрыть навигацию
  document.querySelector(".display").style.display = "block"; // показать общий блок
  document.querySelector(statusName).style.display = "block"; // показать все базы
}
// ______________________________________________________________________ | [ЛОГИКА] Навигация в интерфейсе

// ______________________________________________________________________ | [ЛОГИКА] Состояние "Все базы"
// ____________________________________________________________ | Функция для загрузки всех баз из таблицы MySQL и отображения в html.table
async function showAllBase() {
  const [rows] = await remote
    .getGlobal("connectMySQL")
    .execute("select * from base"); // MySQL: Показать все базы из таблицы баз и сохранить результат в "rows"

  // __________________________________________________ | Процесс отрисовки html.table
  let construntBlock = `
  <table class="table_col">
    <colgroup>
      <col style="background: #555555" />
    </colgroup>
    <tr>
      <th>ID базы</th>
      <th>Название базы</th>
    </tr>
  `; // Размечаем шапку html.table

  // Если массив "rows" имеет хоть один элемент
  if (rows.length) {
    // Размечаем количество строк в таблице равное количеству элементов в массиве "rows"
    for (let i = 0; i < rows.length; i++) {
      construntBlock += `
    <tr>
      <td>${rows[i]["ID"]}</td>
      <td>${rows[i]["Name"]}</td>
    </tr>
    `;
    }
  } /* ELSE: Если массив "rows" не имеет в себе элементов */ else {
    construntBlock += `<tr><td rowspan="1" colspan="2">Нету автомобильных баз</td></tr>`; // Размечаем информацию о отсутствии элементов
  }

  construntBlock += `</table>`; // Заканчиваем размечать html.table

  document.querySelector(".all-base .display-print").innerHTML = construntBlock; // Окончательно рисуем результаты в родительском html.div
  // __________________________________________________ | Процесс отрисовки html.table
}
// ____________________________________________________________ | Функция для загрузки всех баз из таблицы MySQL и отображения в html.table

// ____________________________________________________________ | Функция для изменения названия базы
async function RenameBase() {
  let baseID = document.querySelector(".input-id-change-base").value;
  let newNameBase = document.querySelector(".input-name-change-base").value;

  const [rows] = await remote
    .getGlobal("connectMySQL")
    .execute(`update base set Name = '${newNameBase}' where id = ${baseID}`); // MySQL: Запрос на обновление названия базы по ее ID

  if (rows["affectedRows"] /* MySQL вернул успешный результат */) {
    window.alert(`База ID:${baseID} изменила название на "${newNameBase}"`);
  } else window.alert(`База для переименования не найдена!`); // MySQL сообщила, что изменять нечего

  await showAllBase();
}
// ____________________________________________________________ | Функция для изменения названия базы

// ____________________________________________________________ | Функция для создания базы
async function CreateBase() {
  let newName = document.querySelector(".input-name-create-base").value;

  await remote
    .getGlobal("connectMySQL")
    .execute(`insert into base (Name) values ('${newName}')`); // MySQL: Запрос на добавление строки в MySQL таблицу

  window.alert(`База "${newName}" была создана`);

  await showAllBase();
}
// ____________________________________________________________ | Функция для создания базы

// ____________________________________________________________ | Функция для удаления базы
async function DeleteBase() {
  let baseID = document.querySelector(".input-id-remove-base").value; // Получаем ID (знаю что строкой, а не числом, но программа учебная)

  let decisionRequest = confirm(
    // Запрашиваем у пользователя программы подтверждение своих действий, ибо это опасно, так как все что связано с этой базой, будет удалено
    "Вы действительно хотите удалить базу?\n" +
      "(Все связанные с этой базой данные будут удалены (гаражи -> ведомости (sheets) -> путевые листы (records), гаражи -> их автомобили))\n" +
      'Кнопка "OK" - удалит базу ID: ' +
      baseID +
      ".\n" +
      'Кнопка "Отмена" - закроет текущий диалог (база не будет удалена)'
  );

  // От пользователя получено подтверждение удаления базы и все что с ней связано
  if (decisionRequest) {
    let [rowsAllBase] = await remote
      .getGlobal("connectMySQL")
      .execute(`SELECT * FROM base WHERE ID = ${baseID}`); // MySQL: Показать все базы по этому ID и сохранить в "rowsAllBase"

    // Если массив "rowsAllBase" имеет хотя бы один элемент
    if (rowsAllBase.length) {
      /* 
                    ДА, мы успешно нашли эту базу, но мы не можем её удалить еще,
                    потому что к ней жестко привязаны и другие данные, например гаражи,
                    а к гаражам, соответственно, водители и так далее.
                    К чему я веду все это разглагольствование, мы не сможем удалить базу,
                    пока к на ней хоть что-то висит, поэтому весь ниже находящейся код очень
                    нужен, хоть возможно это не самое лучшее решение, но оно работает.

                    Внизу я попытался схематично накидать, в первую очередь для себя будущего,
                    как что здесь работает и что на чем завязно, то есть мне по крайней мере
                    на данный момент понятно, что здесь что значит. Надеюсь вы как я, кто возможно
                    читает этот код и ловит от его неоптимизированности дикие фейспалмы,
                    но я пытаюсь быть хорошим программистом и пока что пишу как получается.
                    В общем, самое интересное будет когда я будущий посмотрю эти исходники,
                    возможно тогда у меня уже будет больше опыта, и я буду думать, какой индивидуум
                    это писал, но в общем хватит с меня комментарий, ату чет много пишу не кода в коде,
                    но не суть. В общем, что обещал вот оно:

                              base
                              /   \
                        garage     worker
                        /    \
                    sheet     car
                      |
                    record
      */
      let [rowsAllGarages] = await remote
        .getGlobal("connectMySQL")
        .execute(`SELECT * FROM garage WHERE IDbase = ${baseID}`); // MySQL: Показать все гаражи, которые принадлежат этой базе и сохранить в "rowsAllGarages"

      // Если массив "rowsAllGarages" имеет хотя бы один элемент
      if (rowsAllGarages.length) {
        /*
                    С гаражами обстоит та же самая ситуация, гараж удалить не получится, пока
                    к нему что-то привязано, например пока в нем есть автомобили. Поэтому мы
                    идем дальше, нам надо узнать все гаражи, которые привязаны к этой базе, если
                    такие имеются, узнать все что привязано к этим гаражам, и потом начать удаление.
        */

        let IDsAllGarages = []; // Массив для все ID гаражей, которые принадлежат этой ID базе

        // Устроим цикл по массиву гаражей, потому что там JSON (JavaScript Object Notation), то есть целый объект, а нам надо лишь ID гаражей от туда выдернуть
        for (let i = 0; i < rowsAllGarages.length; i++) {
          IDsAllGarages.push(rowsAllGarages[i]["ID"]); // Ну и соответственно на каждой итерации, количество которых равно количество элементов в массиве "rowsAllGarages", ложим текущий ID гаража в другой массив
        }

        // Устроим цикл уже по новому массиву, в котором у нас тупо только ID гаражей, потому что мы все ненужное нам отсеили
        for (let i = 0; i < IDsAllGarages.length; i++) {
          let [rowsAllSheets] = await remote
            .getGlobal("connectMySQL")
            .execute(
              `SELECT * FROM sheet WHERE IDgarage = ${IDsAllGarages[i]}`
            ); // MySQL: Смотрим есть ли что в таблице "sheets" (то есть ведомости) завязанное на наших гаражах и запишем это в массив "rowsAllSheets"

          // Если массив "rowsAllSheets" (ведомостей) не пуст (имеет хоть один элемент)
          if (rowsAllSheets.length) {
            let IDsAllSheets = []; // Массив для ID ведомостей, которые принадлежат этому (или этим) гаражу (или гаражам, не суть, просто здесь будет не только один гараж, а типа много)

            // Устроим цикл по массиву ведомостей, потому что снова JSON, то есть опять целый объект, а нам надо лишь ID ведомостей
            for (let j = 0; j < rowsAllSheets.length; j++) {
              IDsAllSheets.push(rowsAllSheets[j]["ID"]); // Ложим ID ведомостей выдранные из объекта ведомостей, потому что целый объект нам не нужен, а лишь порядковый ID в таблице MySQL
            }

            // Устроим цикл по новому массиву, в котором у нас только ID ведомостей
            for (let j = 0; j < IDsAllSheets.length; j++) {
              let [rowsAllRecords] = await remote
                .getGlobal("connectMySQL")
                .execute(
                  `SELECT * FROM record WHERE IDsheet = ${IDsAllSheets[j]}`
                ); // MySQL: Смотрим есть ли данные в таблице "Record" (путевые листы) которые завязаны к нашим "sheets" (ведомостям) и сохраним их в массив "rowsAllRecords"

              // Если массив "rowsAllRecords" не пустой
              if (rowsAllRecords.length) {
                let IDsAllRecords = []; // Массив для ID путевых листов, чтобы отсеять все остальное от объекта путевых листов, нам надо только порядковые номера в таблице MySQL

                // Цикл, чтобы отсеять от целиковых объектов (объекты путевых листов) только ID
                for (let z = 0; z < rowsAllRecords.length; z++) {
                  IDsAllRecords.push(rowsAllRecords[z]["ID"]); // Ложим ID в новый массив
                }

                // Цикл по новому массиву, в котором у нас только ID
                for (let z = 0; z < IDsAllRecords.length; z++) {
                  /*
                    Если ты уже успел забыть схему, то я ее напомню:

                              base
                              /   \
                        garage     worker
                        /     \
                    sheet      car
                      |
                    record

                    То есть, если ты уже понял, то мы добрались до самих путевых листов ("records")
                    и этот цикл сработает для каждого ID путевого листа и мы уже можем безболезненно
                    удалить наши путевые листы
                  */
                  await remote // удаляем все RECORDS по этому ID SHEETS
                    .getGlobal("connectMySQL")
                    .execute(
                      `DELETE FROM record WHERE ID = ${IDsAllRecords[z]}`
                    ); // MySQL: Удаляем все путевые листы ("records") по ID текущей итерации цикла из нашего массива всех ID путевых листов. То есть, сколько в массиве элементов, то столько и есть этих путевых листов, то есть и столько и есть этих ID и столько раз сработает цикл и мы удалим все путевые листы ("record")
                }
              }

              /*
                    Теперь наша схема выглядит так (наша схема зависимостей):
                    
                              base
                              /   \
                        garage     worker
                        /    \
                    sheet     car

                    Если ты уже сравнил ее с верхней схемой, то ты успел заметить, что мы успешно удалили
                    все наши путевые листы ("records"), которые были завязаны на наши ведомости ("sheets"),
                    и, соответственно, теперь мы можем удалить наши ведомости, чем и займемся ниже
              */

              await remote // удаляем все SHEETS по этому ID гаража
                .getGlobal("connectMySQL")
                .execute(`DELETE FROM sheet WHERE ID = ${IDsAllSheets[j]}`); // MySQL: Удаляем все ведомости ("sheets") циклом
            }
          }

          /*
                    Ну что, пришло время снова глянуть на нашу схему зависимостей данных:
                    
                          base
                          /   \
                    garage     worker
                          \
                          car

                    Да, ты правильно все понял, теперь наши гаражи свободы от наших ведомостей,
                    которые ранее были удалены так как освободились от путевых листов. Теперь мы
                    можем удалить спокойно наши автомобили и не париться.
          */

          let [rowsAllCars] = await remote
            .getGlobal("connectMySQL")
            .execute(`SELECT * FROM car WHERE IDgarage = ${IDsAllGarages[i]}`); // MySQL: Узнаем, есть у наших гаражей автомобили и записываем их в массив "rowsAllCars"

          // Если массив автомобилей имеет хоть один элемент (хоть один автомобиль принадлежит нашему гаражу)
          if (rowsAllCars.length) {
            let IDsAllCars = []; // Новый массив для ID наших автомобилей

            // Снова нам известный цикл, который выдернет из наших объектов (автомобили целиком это типа объект) только их ID и положит в массив
            for (let j = 0; j < rowsAllCars.length; j++) {
              IDsAllCars.push(rowsAllCars[j]["ID"]); // Положит вот суда
            }

            // Цикл по нашему новому массиву ID автомобилей
            for (let j = 0; j < IDsAllCars.length; j++) {
              // DELETE
              await remote
                .getGlobal("connectMySQL")
                .execute(`DELETE FROM car WHERE ID = ${IDsAllCars[j]}`); // MySQL: Удаляем все автомобили
            }
          }
        }

        /*
                    Все наши автомобили успешно удалены и схема зависимостей данных в таблице MySQL
                    теперь позволяем нам удалить гаражи, чтобы мы могли удалить базы:
                    
                          base
                          /   \
                    garage     worker
        */

        await remote
          .getGlobal("connectMySQL")
          .execute(`DELETE FROM garage WHERE IDbase = ${baseID}`); // MySQL: Удаляем все гаражи, принадлежающие этой базе
      }

      /*
                  Но, не спешим радоваться, да мы удалили гаражи, но мы все еще не можем удалить базу,
                  потому что к ней завязаны наши работники:
                  
                        base
                            \
                            worker
      */

      let [rowsAllWorkers] = await remote
        .getGlobal("connectMySQL")
        .execute(`SELECT * FROM worker WHERE IDbase = ${baseID}`); // MySQL: Смотрим есть ли работники, которые принадлежат этой базе и сохраним в массив "rowsAllWorkers"

      // Если есть хоть один работник
      if (rowsAllWorkers.length) {
        let IDsAllWorkers = []; // Создаем новый массив только для ID работников

        // Наш нам известный цикл и принцип его работы, который позволяет выдернуть из объектов работников только их ID в таблице MySQL
        for (let i = 0; i < rowsAllWorkers.length; i++) {
          IDsAllWorkers.push(rowsAllWorkers[i]["ID"]); // И положить их ID в массив
        }

        // Следующий цикл бегает по массиву наших ID работников
        for (let i = 0; i < IDsAllWorkers.length; i++) {
          await remote
            .getGlobal("connectMySQL")
            .execute(`DELETE FROM worker WHERE ID = ${IDsAllWorkers[i]}`); // MySQL: Удаляем наши работников, которые принадлежат этой базе
        }
      }

      /*
                  Глянем на нашу схему зависимостей данных и победа!!! мы можем удалить нашу базу:
                  
                        base
                            \
                            ??? тут ничего нет
                  
                  Теперь она выглядит скромно:
                        base
      */

      await remote
        .getGlobal("connectMySQL")
        .execute(`DELETE FROM base WHERE ID = ${baseID}`); // MySQL: Удаляем нашу базу

      window.alert(
        `Выбранная база (${baseID}) была успешно удалена, а с ней были удалены гаражи -> ведомости (sheet) -> путевые листы (record), гаражи -> их автомобили`
      ); // Скажем пользователю программы, что он победитель по жизни и все круто у него будет

      await showAllBase();
    } else window.alert(`База не найдена`); // А если вы все еще помните, все это было вложенность в наше большое условие, в котором мы смотрели, правильный ли ID базы ввел пользователь, путем запроса на наличие в базе данных этой базы и говорим нашему дорогому пользователю, что такой базы нет
  }
}
// ____________________________________________________________ | Функция для удаления базы
// ______________________________________________________________________ | [ЛОГИКА] Состояние "Все базы"

// ______________________________________________________________________ | [ЛОГИКА] Состояние "Все гаражи"
// ____________________________________________________________ | Функция для загрузки всех гаражей из таблицы MySQL и отображения в html.table
async function ShowAllGarages() {
  const [rows] = await remote
    .getGlobal("connectMySQL")
    .execute("select * from garage"); // MySQL: Показать все гаражи из таблицы баз и сохранить результат в "rows"

  [mainAllBasesRows] = await remote
    .getGlobal("connectMySQL")
    .execute("select * from base"); // MySQL: Показать все базы из таблицы баз и сохранить результат в "mainAllBasesRows"

  for (
    let i = document.querySelector("select[name=FromBase]").options.length - 1;
    i >= 0;
    i--
  ) {
    document.querySelector("select[name=FromBase]").options[i] = null;
  } // Очищаем выпадающие списки

  for (
    let i =
      document.querySelector("select[name=FromBaseCrt]").options.length - 1;
    i >= 0;
    i--
  ) {
    document.querySelector("select[name=FromBaseCrt]").options[i] = null;
  } // Очищаем выпадающие списки

  // Если массив не пустой (базы существуют, хоть одна)
  if (mainAllBasesRows.length) {
    // Цикл на элементы массива (на каждую базу своя итерация)
    for (let i = 0; i < mainAllBasesRows.length; i++) {
      /*
      Создаем свои варианты для выпадающих списков
      */

      let newOption1 = new Option(
        mainAllBasesRows[i]["Name"],
        mainAllBasesRows[i]["ID"]
      );
      let newOption2 = new Option(
        mainAllBasesRows[i]["Name"],
        mainAllBasesRows[i]["ID"]
      );

      document.querySelector("select[name=FromBase]").options[
        document.querySelector("select[name=FromBase]").length
      ] = newOption1;

      document.querySelector("select[name=FromBaseCrt]").options[
        document.querySelector("select[name=FromBaseCrt]").length
      ] = newOption2;
    }
  }

  // __________________________________________________ | Процесс отрисовки html.table
  let construntBlock = `
    <table class="table_col">
      <colgroup>
        <col style="background: #555555" />
      </colgroup>
      <tr>
        <th>ID гаража</th>
        <th>Название гаража</th>
        <th>Название базы</th>
      </tr>
    `; // Размечаем шапку html.table

  // Если массив "rows" имеет хоть один элемент
  if (rows.length) {
    // Размечаем количество строк в таблице равное количеству элементов в массиве "rows"
    for (let i = 0; i < rows.length; i++) {
      let tempIDBase = rows[i]["IDbase"];
      let tempNameBase = "";

      for (let j = 0; j < mainAllBasesRows.length; j++) {
        if (mainAllBasesRows[j]["ID"] === tempIDBase)
          tempNameBase = mainAllBasesRows[j]["Name"];
      }

      // window.alert(temp123);

      construntBlock += `
        <tr>
          <td>${rows[i]["ID"]}</td>
          <td>${rows[i]["Name"]}</td>
          <td>${tempNameBase}</td>
        </tr>
        `;
    }
  } /* ELSE: Если массив "rows" не имеет в себе элементов */ else {
    construntBlock += `<tr><td rowspan="1" colspan="3">Нету автомобильных гаражей</td></tr>`; // Размечаем информацию о отсутствии элементов
  }
  construntBlock += `</table>`; // Заканчиваем размечать html.table
  document.querySelector(".all-garages .display-print").innerHTML =
    construntBlock; // Окончательно рисуем результаты в родительском html.div
  // __________________________________________________ | Процесс отрисовки html.table
}
// ____________________________________________________________ | Функция для загрузки всех гаражей из таблицы MySQL и отображения в html.table

// ____________________________________________________________ | Функция для изменения названия гаража
async function RenameGarage() {
  let garageID = document.querySelector(".input-id-change-garage").value;
  let newNameGarage = document.querySelector(".input-name-change-garage").value;
  let newBaseGarageIndex = document.querySelector("select[name=FromBase]")
    .options.selectedIndex;
  let newBaseGarageValue = document.querySelector("select[name=FromBase]")
    .options[newBaseGarageIndex].value;

  const [rows] = await remote
    .getGlobal("connectMySQL")
    .execute(
      `update garage set Name = '${newNameGarage}', IDbase = '${newBaseGarageValue}' where id = ${garageID}`
    ); // MySQL: Запрос на обновление названия гаража по его ID

  if (rows["affectedRows"] /* MySQL вернул успешный результат */) {
    window.alert(
      `Гараж ID:${garageID} изменил название на "${newNameGarage}" и базу на выбранную`
    );
  } else window.alert(`Гараж для переименования и переназначения не найден!`); // MySQL сообщила, что изменять нечего

  await ShowAllGarages();
}
// ____________________________________________________________ | Функция для изменения названия гаража

// ____________________________________________________________ | Функция для создания гаража
async function CreateGarage() {
  let newName = document.querySelector(".input-name-create-garage").value;
  let newGarageToBaseIndex = document.querySelector("select[name=FromBaseCrt]")
    .options.selectedIndex;
  let newGarageToBaseValue = document.querySelector("select[name=FromBase]")
    .options[newGarageToBaseIndex].value;

  await remote
    .getGlobal("connectMySQL")
    .execute(
      `INSERT INTO garage (Name, IDbase) VALUES ('${newName}', '${newGarageToBaseValue}')`
    ); // MySQL: Запрос на добавление строки в MySQL таблицу

  window.alert(`Гараж "${newName}" был создан`);

  await ShowAllGarages();
}
// ____________________________________________________________ | Функция для создания гаража

// ____________________________________________________________ | Функция для удаления гаража
async function DeleteGarage() {
  let garageID = document.querySelector(".input-id-remove-garage").value; // Получаем ID

  let decisionRequest = confirm(
    // Запрашиваем у пользователя программы подтверждение своих действий, ибо это опасно, так как все что связано с этим гаражом, будет удалено
    "Вы действительно хотите удалить гараж?\n" +
      "(Все связанные с этим гаражом данные будут удалены (ведомости (sheet) -> путевые листы (record), их автомобили))\n" +
      'Кнопка "OK" - удалит гараж ID: ' +
      garageID +
      ".\n" +
      'Кнопка "Отмена" - закроет текущий диалог (гараж не будет удален)'
  );

  // От пользователя получено подтверждение удаления гаража и все что с ним связано
  if (decisionRequest) {
    let [rowsAllGarages] = await remote
      .getGlobal("connectMySQL")
      .execute(`SELECT * FROM garage WHERE ID = ${garageID}`); // MySQL: Показать все гаражи по этому ID и сохранить в "rowsAllGarages"

    // Если массив "rowsAllGarages" имеет хотя бы один элемент
    if (rowsAllGarages.length) {
      /*
                    Гараж по этому ID найден успешно. Но как в случае с базами из функции выше,
                    удалить мы его просто так не можем. Ведь к нему жестко привязаные другие
                    данные. Просто новая схема:

                          garage
                          /     \
                        sheet     car
                          |
                        record

                    Без комментариев. Хочешь узнать как работает, посмотри функцию по удалению базы.
      */

      let [rowsAllSheets] = await remote
        .getGlobal("connectMySQL")
        .execute(`SELECT * FROM sheet WHERE IDgarage = ${garageID}`); // MySQL: Смотрим есть ли что в таблице "sheets" (то есть ведомости) завязанное на наших гаражах и запишем это в массив "rowsAllSheets"

      // Если массив "rowsAllSheets" (ведомостей) не пуст (имеет хоть один элемент)
      if (rowsAllSheets.length) {
        let IDsAllSheets = []; // Массив для ID ведомостей, которые принадлежат этому (или этим) гаражу (или гаражам, не суть, просто здесь будет не только один гараж, а типа много)

        // Устроим цикл по массиву ведомостей, потому что снова JSON, то есть опять целый объект, а нам надо лишь ID ведомостей
        for (let j = 0; j < rowsAllSheets.length; j++) {
          IDsAllSheets.push(rowsAllSheets[j]["ID"]); // Ложим ID ведомостей выдранные из объекта ведомостей, потому что целый объект нам не нужен, а лишь порядковый ID в таблице MySQL
        }
        // Устроим цикл по новому массиву, в котором у нас только ID ведомостей
        for (let j = 0; j < IDsAllSheets.length; j++) {
          let [rowsAllRecords] = await remote
            .getGlobal("connectMySQL")
            .execute(`SELECT * FROM record WHERE IDsheet = ${IDsAllSheets[j]}`); // MySQL: Смотрим есть ли данные в таблице "Record" (путевые листы) которые завязаны к нашим "sheets" (ведомостям) и сохраним их в массив "rowsAllRecords"

          // Если массив "rowsAllRecords" не пустой
          if (rowsAllRecords.length) {
            let IDsAllRecords = []; // Массив для ID путевых листов, чтобы отсеять все остальное от объекта путевых листов, нам надо только порядковые номера в таблице MySQL

            // Цикл, чтобы отсеять от целиковых объектов (объекты путевых листов) только ID
            for (let z = 0; z < rowsAllRecords.length; z++) {
              IDsAllRecords.push(rowsAllRecords[z]["ID"]); // Ложим ID в новый массив
            }

            // Цикл по новому массиву, в котором у нас только ID
            for (let z = 0; z < IDsAllRecords.length; z++) {
              await remote // удаляем все RECORDS по этому ID SHEETS
                .getGlobal("connectMySQL")
                .execute(`DELETE FROM record WHERE ID = ${IDsAllRecords[z]}`); // MySQL: Удаляем все путевые листы ("records") по ID текущей итерации цикла из нашего массива всех ID путевых листов. То есть, сколько в массиве элементов, то столько и есть этих путевых листов, то есть и столько и есть этих ID и столько раз сработает цикл и мы удалим все путевые листы ("record")
            }
          }

          await remote // удаляем все SHEETS по этому ID гаража
            .getGlobal("connectMySQL")
            .execute(`DELETE FROM sheet WHERE ID = ${IDsAllSheets[j]}`); // MySQL: Удаляем все ведомости ("sheets") циклом
        }
      }
      let [rowsAllCars] = await remote
        .getGlobal("connectMySQL")
        .execute(`SELECT * FROM car WHERE IDgarage = ${garageID}`); // MySQL: Узнаем, есть у наших гаражей автомобили и записываем их в массив "rowsAllCars"

      // Если массив автомобилей имеет хоть один элемент (хоть один автомобиль принадлежит нашему гаражу)
      if (rowsAllCars.length) {
        let IDsAllCars = []; // Новый массив для ID наших автомобилей

        // Снова нам известный цикл, который выдернет из наших объектов (автомобили целиком это типа объект) только их ID и положит в массив
        for (let j = 0; j < rowsAllCars.length; j++) {
          IDsAllCars.push(rowsAllCars[j]["ID"]); // Положит вот суда
        }

        // Цикл по нашему новому массиву ID автомобилей
        for (let j = 0; j < IDsAllCars.length; j++) {
          // DELETE
          await remote
            .getGlobal("connectMySQL")
            .execute(`DELETE FROM car WHERE ID = ${IDsAllCars[j]}`); // MySQL: Удаляем все автомобили
        }
      }

      await remote
        .getGlobal("connectMySQL")
        .execute(`DELETE FROM garage WHERE ID = ${garageID}`); // MySQL: Удаляем гараж

      window.alert(
        `Выбранный гараж (${garageID}) была успешно удален, а с ним были удалены ведомости (sheet) -> путевые листы (record), их автомобили`
      ); // Скажем пользователю программы, что он победитель по жизни и все круто у него будет
      await ShowAllGarages();
    } else window.alert(`Гараж не найден`);
  }
}
// ____________________________________________________________ | Функция для удаления гаража
// ______________________________________________________________________ | [ЛОГИКА] Состояние "Все гаражи"

// ______________________________________________________________________ | [ЛОГИКА] Состояние "Все автомобили"
// ____________________________________________________________ | Функция для загрузки всех автомобилей из таблицы MySQL и отображения в html.table
async function ShowAllAutos() {
  const [rows] = await remote
    .getGlobal("connectMySQL")
    .execute("select * from car"); // MySQL: Показать все авто из таблицы баз и сохранить результат в "rows"

  [mainAllGaragesRows] = await remote
    .getGlobal("connectMySQL")
    .execute("select * from garage");

  for (
    let i =
      document.querySelector("select[name=FromGarage]").options.length - 1;
    i >= 0;
    i--
  ) {
    document.querySelector("select[name=FromGarage]").options[i] = null;
  } // Очищаем выпадающие списки

  for (
    let i =
      document.querySelector("select[name=FromGarageCrt]").options.length - 1;
    i >= 0;
    i--
  ) {
    document.querySelector("select[name=FromGarageCrt]").options[i] = null;
  } // Очищаем выпадающие списки

  if (mainAllGaragesRows.length) {
    for (let j = 0; j < mainAllGaragesRows.length; j++) {
      let newOption1 = new Option(
        mainAllGaragesRows[j]["Name"],
        mainAllGaragesRows[j]["ID"]
      );
      let newOption2 = new Option(
        mainAllGaragesRows[j]["Name"],
        mainAllGaragesRows[j]["ID"]
      );

      document.querySelector("select[name=FromGarage]").options[
        document.querySelector("select[name=FromGarage]").length
      ] = newOption1;

      document.querySelector("select[name=FromGarageCrt]").options[
        document.querySelector("select[name=FromGarageCrt]").length
      ] = newOption2;
    }
  }

  // __________________________________________________ | Процесс отрисовки html.table
  let construntBlock = `
    <table class="table_col">
      <colgroup>
        <col style="background: #555555" />
      </colgroup>
      <tr>
        <th>ID автомобиля</th>
        <th>Модель</th>
        <th>Номер</th>
        <th>Гараж</th>
      </tr>
    `; // Размечаем шапку html.table

  if (rows.length) {
    for (let i = 0; i < rows.length; i++) {
      let tempIDGarage = rows[i]["IDgarage"];
      let tempNameGarage = "";

      for (let j = 0; j < mainAllGaragesRows.length; j++) {
        if (mainAllGaragesRows[j]["ID"] == tempIDGarage)
          tempNameGarage = mainAllGaragesRows[j]["Name"];
      }

      construntBlock += `
        <tr>
          <td>${rows[i]["ID"]}</td>
          <td>${rows[i]["Model"]}</td>
          <td>${rows[i]["Number"]}</td>
          <td>${tempNameGarage}</td>
        </tr>
        `;
    }
  } /* ELSE: Если массив "rows" не имеет в себе элементов */ else {
    construntBlock += `<tr><td rowspan="1" colspan="4">Нету автомобилей</td></tr>`; // Размечаем информацию о отсутствии элементов
  }
  construntBlock += `</table>`; // Заканчиваем размечать html.table
  document.querySelector(".all-autos .display-print").innerHTML =
    construntBlock; // Окончательно рисуем результаты в родительском html.div
  // __________________________________________________ | Процесс отрисовки html.table
}
// ____________________________________________________________ | Функция для загрузки всех автомобилей из таблицы MySQL и отображения в html.table

// ____________________________________________________________ | Функция для изменения автомобиля
async function RenameVehicle() {
  let vehID = document.querySelector(".input-id-change-auto").value;
  let vehModel = document.querySelector(".input-model-change-auto").value;
  let vehNomer = document.querySelector(".input-nomer-change-auto").value;
  let newVehicleGarageIndex = document.querySelector("select[name=FromGarage]")
    .options.selectedIndex;
  let newVehicleGarageValue = document.querySelector("select[name=FromGarage]")
    .options[newVehicleGarageIndex].value;

  const [rows] = await remote
    .getGlobal("connectMySQL")
    .execute(
      `update car set Model = '${vehModel}', Number = '${vehNomer}', IDgarage = '${newVehicleGarageValue}' WHERE id = ${vehID}`
    );

  if (rows["affectedRows"] /* MySQL вернул успешный результат */)
    window.alert(`Автомобиль ID:${vehID} потерпел изменения`);
  else window.alert(`Автомобиль по ID не найден для изменений`);

  await ShowAllAutos();
}
// ____________________________________________________________ | Функция для изменения автомобиля

// ____________________________________________________________ | Функция для создания автомобиля
async function CreateVehicle() {
  let newModel = document.querySelector(".input-model-create-auto").value;
  let newNomer = document.querySelector(".input-nomer-create-auto").value;
  let newVehicleToGarageIndex = document.querySelector(
    "select[name=FromGarageCrt]"
  ).options.selectedIndex;
  let newVehicleToGarageValue = document.querySelector(
    "select[name=FromGarageCrt]"
  ).options[newVehicleToGarageIndex].value;

  await remote
    .getGlobal("connectMySQL")
    .execute(
      `insert into car (Model, Number, IDgarage) values ('${newModel}', '${newNomer}', '${newVehicleToGarageValue}')`
    );

  window.alert(`Автомобиль "${newNomer}" был создан`);

  await ShowAllAutos();
}
// ____________________________________________________________ | Функция для создания автомобиля

// ____________________________________________________________ | Функция для удаления автомобиля
async function RemoveVehicle() {
  let vehID = document.querySelector(".input-id-remove-auto").value;

  let decisionRequest = confirm(
    // Запрашиваем у пользователя программы подтверждение своих действий, ибо это опасно, так как все что связано с этим гаражом, будет удалено
    "Вы действительно хотите удалить автомобиль?\n" +
      "(Все связанные с этим автомобилем данные будут удалены (путевые листы (record)))\n" +
      'Кнопка "OK" - удалит автомобиль ID: ' +
      vehID +
      ".\n" +
      'Кнопка "Отмена" - закроет текущий диалог (автомобиль не будет удален)'
  );

  if (decisionRequest) {
    let [rowsAllAutos] = await remote
      .getGlobal("connectMySQL")
      .execute(`SELECT * FROM car WHERE ID = ${vehID}`); // MySQL: Показать все автомобили по этому ID и сохранить в "rowsAllAutos"

    if (rowsAllAutos.length) {
      let [rowsAllRecords] = await remote
        .getGlobal("connectMySQL")
        .execute(`SELECT * FROM record where IDcar = ${vehID}`);

      if (rowsAllRecords.length) {
        let IDsAllRecords = []; // Массив для ID путевых листов, чтобы отсеять все остальное от объекта путевых листов, нам надо только порядковые номера в таблице MySQL

        // Цикл, чтобы отсеять от целиковых объектов (объекты путевых листов) только ID
        for (let z = 0; z < rowsAllRecords.length; z++) {
          IDsAllRecords.push(rowsAllRecords[z]["ID"]); // Ложим ID в новый массив
        }

        // Цикл по новому массиву, в котором у нас только ID
        for (let z = 0; z < IDsAllRecords.length; z++) {
          await remote // удаляем все RECORDS по этому ID SHEETS
            .getGlobal("connectMySQL")
            .execute(`DELETE FROM record WHERE ID = ${IDsAllRecords[z]}`); // MySQL: Удаляем все путевые листы ("records") по ID текущей итерации цикла из нашего массива всех ID путевых листов. То есть, сколько в массиве элементов, то столько и есть этих путевых листов, то есть и столько и есть этих ID и столько раз сработает цикл и мы удалим все путевые листы ("record")
        }
      }

      await remote
        .getGlobal("connectMySQL")
        .execute(`DELETE FROM car WHERE ID = ${vehID}`);

      window.alert(`Автомобиль ID:${vehID} удален`);

      await ShowAllAutos();
    }
  }
}
// ____________________________________________________________ | Функция для удаления автомобиля
// ______________________________________________________________________ | [ЛОГИКА] Состояние "Все автомобили"

// ______________________________________________________________________ | [ЛОГИКА] Состояние "Виды ГСМ"
// ____________________________________________________________ | Функция для загрузки всех видов ГСМ
async function ShowAllGSM() {
  const [rows] = await remote
    .getGlobal("connectMySQL")
    .execute("select * from gsm"); // MySQL: Показать все виды гсм из таблицы баз и сохранить результат в "rows"

  // __________________________________________________ | Процесс отрисовки html.table
  let construntBlock = `
    <table class="table_col">
      <colgroup>
        <col style="background: #555555" />
      </colgroup>
      <tr>
        <th>ID ГСМ</th>
        <th>Название</th>
        <th>Вес (кг)</th>
      </tr>
    `; // Размечаем шапку html.table

  if (rows.length) {
    for (let i = 0; i < rows.length; i++) {
      construntBlock += `
        <tr>
          <td>${rows[i]["ID"]}</td>
          <td>${rows[i]["Name"]}</td>
          <td>${rows[i]["ForKilo"]}</td>
        </tr>
        `;
    }
  } /* ELSE: Если массив "rows" не имеет в себе элементов */ else {
    construntBlock += `<tr><td rowspan="1" colspan="3">Нету видов ГСМ</td></tr>`; // Размечаем информацию о отсутствии элементов
  }
  construntBlock += `</table>`; // Заканчиваем размечать html.table
  document.querySelector(".types-fuels-and-lubs .display-print").innerHTML =
    construntBlock; // Окончательно рисуем результаты в родительском html.div
  // __________________________________________________ | Процесс отрисовки html.table
}
// ____________________________________________________________ | Функция для загрузки всех видов ГСМ

// ____________________________________________________________ | Функция для редактирования ГСМ
async function RenameGSM() {
  let idGSM = document.querySelector(".input-id-change-gsm").value;
  let nameGSM = document.querySelector(".input-name-change-gsm").value;
  let vesGSM = document.querySelector(".input-ves-change-gsm").value;

  const [rows] = await remote
    .getGlobal("connectMySQL")
    .execute(
      `update gsm set Name = '${nameGSM}', 	ForKilo = '${vesGSM}' WHERE id = ${idGSM}`
    );

  if (rows["affectedRows"] /* MySQL вернул успешный результат */)
    window.alert(`ГСМ ID:${idGSM} потерпел изменения`);
  else window.alert(`ГСМ по ID не найден для изменений`);

  await ShowAllGSM();
}
// ____________________________________________________________ | Функция для редактирования ГСМ

// ____________________________________________________________ | Функция для создания ГСМ
async function CreateGSM() {
  let nameGSM = document.querySelector(".input-name-create-gsm").value;
  let vesGSM = document.querySelector(".input-ves-create-gsm").value;

  await remote
    .getGlobal("connectMySQL")
    .execute(
      `insert into gsm (Name, ForKilo) values ('${nameGSM}', '${vesGSM}')`
    );

  window.alert(`ГСМ:${nameGSM} создан`);

  await ShowAllGSM();
}
// ____________________________________________________________ | Функция для создания ГСМ

// ____________________________________________________________ | Функция для удаления ГСМ
async function RemoveGSM() {
  let idGSM = document.querySelector(".input-id-remove-gsm").value;

  let decisionRequest = confirm(
    // Запрашиваем у пользователя программы подтверждение своих действий, ибо это опасно, так как все что связано с этим гаражом, будет удалено
    "Вы действительно хотите удалить этот вид ГСМ?\n" +
      "(Все связанные с этим видом ГСМ данные будут удалены (путевые листы (record)))\n" +
      'Кнопка "OK" - удалит этот вид ГСМ ID: ' +
      idGSM +
      ".\n" +
      'Кнопка "Отмена" - закроет текущий диалог (Вид ГСМ не будет удален)'
  );

  if (decisionRequest) {
    let [rowsAllGSM] = await remote
      .getGlobal("connectMySQL")
      .execute(`select * from gsm where id = ${idGSM}`);

    if (rowsAllGSM.length) {
      let [rowsAllRecords] = await remote
        .getGlobal("connectMySQL")
        .execute(`SELECT * FROM record where IDgsm = ${idGSM}`);

      if (rowsAllRecords.length) {
        let IDsAllRecords = []; // Массив для ID путевых листов, чтобы отсеять все остальное от объекта путевых листов, нам надо только порядковые номера в таблице MySQL

        // Цикл, чтобы отсеять от целиковых объектов (объекты путевых листов) только ID
        for (let z = 0; z < rowsAllRecords.length; z++) {
          IDsAllRecords.push(rowsAllRecords[z]["ID"]); // Ложим ID в новый массив
        }

        // Цикл по новому массиву, в котором у нас только ID
        for (let z = 0; z < IDsAllRecords.length; z++) {
          await remote // удаляем все RECORDS по этому ID SHEETS
            .getGlobal("connectMySQL")
            .execute(`DELETE FROM record WHERE ID = ${IDsAllRecords[z]}`); // MySQL: Удаляем все путевые листы ("records") по ID текущей итерации цикла из нашего массива всех ID путевых листов. То есть, сколько в массиве элементов, то столько и есть этих путевых листов, то есть и столько и есть этих ID и столько раз сработает цикл и мы удалим все путевые листы ("record")
        }
      }

      await remote
        .getGlobal("connectMySQL")
        .execute(`DELETE FROM gsm WHERE ID = ${idGSM}`);

      window.alert(`ГСМ ID:${idGSM} удален`);

      await ShowAllGSM();
    }
  }
}
// ____________________________________________________________ | Функция для удаления ГСМ
// ______________________________________________________________________ | [ЛОГИКА] Состояние "Виды ГСМ"

// ______________________________________________________________________ | [ЛОГИКА] Состояние "Работники"
// ____________________________________________________________ | Функция для загрузки всех сотрудников
async function ShowAllWorkers() {
  const [rows] = await remote
    .getGlobal("connectMySQL")
    .execute(`SELECT * FROM worker`);

  [mainAllBasesRows] = await remote
    .getGlobal("connectMySQL")
    .execute("select * from base"); // MySQL: Показать все базы из таблицы баз и сохранить результат в "mainAllBasesRows"

  for (
    let i =
      document.querySelector("select[name=FromChangeBase]").options.length - 1;
    i >= 0;
    i--
  ) {
    document.querySelector("select[name=FromChangeBase]").options[i] = null;
  } // Очищаем выпадающие списки

  for (
    let i =
      document.querySelector("select[name=FromCreateBase]").options.length - 1;
    i >= 0;
    i--
  ) {
    document.querySelector("select[name=FromCreateBase]").options[i] = null;
  } // Очищаем выпадающие списки

  // Если массив не пустой (базы существуют, хоть одна)
  if (mainAllBasesRows.length) {
    // Цикл на элементы массива (на каждую базу своя итерация)
    for (let i = 0; i < mainAllBasesRows.length; i++) {
      /*
      Создаем свои варианты для выпадающих списков
      */

      let newOption1 = new Option(
        mainAllBasesRows[i]["Name"],
        mainAllBasesRows[i]["ID"]
      );
      let newOption2 = new Option(
        mainAllBasesRows[i]["Name"],
        mainAllBasesRows[i]["ID"]
      );

      document.querySelector("select[name=FromChangeBase]").options[
        document.querySelector("select[name=FromChangeBase]").length
      ] = newOption1;

      document.querySelector("select[name=FromCreateBase]").options[
        document.querySelector("select[name=FromCreateBase]").length
      ] = newOption2;
    }
  }

  // __________________________________________________ | Процесс отрисовки html.table
  let construntBlock = `
    <table class="table_col">
      <colgroup>
        <col style="background: #555555" />
      </colgroup>
      <tr>
        <th>ID сотрудника</th>
        <th>Фамилия, инициалы</th>
        <th>Должность</th>
        <th>Название базы</th>
      </tr>
    `; // Размечаем шапку html.table

  if (rows.length) {
    for (let i = 0; i < rows.length; i++) {
      let tempIDBase = rows[i]["IDbase"];
      let tempNameBase = "";

      for (let j = 0; j < mainAllBasesRows.length; j++) {
        if (mainAllBasesRows[j]["ID"] === tempIDBase)
          tempNameBase = mainAllBasesRows[j]["Name"];
      }

      construntBlock += `
        <tr>
          <td>${rows[i]["ID"]}</td>
          <td>${rows[i]["FIO"]}</td>
          <td>${rows[i]["Function"] === 1 ? `Водитель` : `Подписант`}</td>
          <td>${tempNameBase}</td>
        </tr>
        `;
    }
  } /* ELSE: Если массив "rows" не имеет в себе элементов */ else {
    construntBlock += `<tr><td rowspan="1" colspan="4">Нету сотрудников</td></tr>`; // Размечаем информацию о отсутствии элементов
  }
  construntBlock += `</table>`; // Заканчиваем размечать html.table
  document.querySelector(".all-works .display-print").innerHTML =
    construntBlock; // Окончательно рисуем результаты в родительском html.div
  // __________________________________________________ | Процесс отрисовки html.table
}
// ____________________________________________________________ | Функция для загрузки всех сотрудников

// ____________________________________________________________ | Функция для редактирования сотрудника
async function RenameWorkers() {
  let workerID = document.querySelector(".input-id-change-worker").value;
  let workerFIO = document.querySelector(".input-fio-change-worker").value;

  let newWorkerFunctionIndex = document.querySelector(
    "select[name=FromFunctions]"
  ).options.selectedIndex;
  let newWorkerFunctionValue = document.querySelector(
    "select[name=FromFunctions]"
  ).options[newWorkerFunctionIndex].value;

  let newWorkerBaseIndex = document.querySelector("select[name=FromChangeBase]")
    .options.selectedIndex;
  let newWorkerBaseValue = document.querySelector("select[name=FromChangeBase]")
    .options[newWorkerBaseIndex].value;

  const [rows] = await remote
    .getGlobal("connectMySQL")
    .execute(
      `UPDATE worker SET FIO = '${workerFIO}', worker.Function = '${newWorkerFunctionValue}', IDbase = '${newWorkerBaseValue}' WHERE ID = ${workerID}`
    );

  if (rows["affectedRows"] /* MySQL вернул успешный результат */)
    window.alert(`Сотрудник ID:${workerID} потерпел изменения`);
  else window.alert(`Сотрудник по ID не найден для изменений`);

  await ShowAllWorkers();
}
// ____________________________________________________________ | Функция для редактирования сотрудника

// ____________________________________________________________ | Функция для создания сотрудника
async function CreateWorkers() {
  let workerFIO = document.querySelector(".input-fio-create-worker").value;

  let newWorkerFunctionIndex = document.querySelector(
    "select[name=FromFunctionsCrt]"
  ).options.selectedIndex;
  let newWorkerFunctionValue = document.querySelector(
    "select[name=FromFunctionsCrt]"
  ).options[newWorkerFunctionIndex].value;

  let newWorkerBaseIndex = document.querySelector("select[name=FromCreateBase]")
    .options.selectedIndex;
  let newWorkerBaseValue = document.querySelector("select[name=FromCreateBase]")
    .options[newWorkerBaseIndex].value;

  await remote
    .getGlobal("connectMySQL")
    .execute(
      `insert into worker (FIO, worker.Function, IDbase) values ('${workerFIO}', '${newWorkerFunctionValue}', '${newWorkerBaseValue}')`
    );

  window.alert(`Сотрудник:${workerFIO} создан`);

  await ShowAllWorkers();
}
// ____________________________________________________________ | Функция для создания сотрудника

// ____________________________________________________________ | Функция для удаления сотрудника
async function RemoveWorkers() {
  let workerID = document.querySelector(".input-id-remove-worker").value;

  const [rowsWorker] = await remote
    .getGlobal("connectMySQL")
    .execute(`SELECT * FROM worker where id = ${workerID}`);

  if (rowsWorker.length) {
    let funcs = [];

    if (rowsWorker[0]["Function"] === 1) {
      funcs[0] = `Водитель`;
      funcs[1] = `Путевые листы (records)`;
    } else if (rowsWorker[0]["Function"] === 2) {
      funcs[0] = `Подписант`;
      funcs[1] = `Ведомости (sheets)`;
    }

    let decisionRequest = confirm(`
    Вы действительно хотите удалить этого сотрудника?\n
    Должность: ${funcs[0]}\n
    Внимание!:\n
    \n
    Все связанные с ним "${funcs[1]}" будут уничтожены!\n
    \n
    Нажатие кнопки "OK" - удалит сотрудника.\n
    Нажатие кнопки "Отмена" - закроет диалог (сотрудник не будет удален).
    `);

    if (decisionRequest) {
      // водитель
      if (rowsWorker[0]["Function"] === 1) {
        const [rowsRecords] = await remote
          .getGlobal("connectMySQL")
          .execute(`SELECT * FROM record where IDdriver = ${workerID}`);

        if (rowsRecords.length) {
          let IDsAllRecords = [];

          for (let i = 0; i < rowsRecords.length; i++) {
            IDsAllRecords.push(rowsRecords[i]["ID"]);
          }

          for (let i = 0; i < IDsAllRecords.length; i++) {
            await remote
              .getGlobal("connectMySQL")
              .execute(`DELETE FROM record WHERE ID = ${IDsAllRecords[i]}`);
          }
        }
      } /* подписант */ else if (rowsWorker[0]["Function"] === 2) {
        const [rowsSheets] = await remote
          .getGlobal("connectMySQL")
          .execute(`SELECT * FROM sheet where IDsigner = ${workerID}`);

        if (rowsSheets.length) {
          let IDsAllSheets = [];

          for (let i = 0; i < rowsSheets.length; i++) {
            IDsAllSheets.push(rowsSheets[i]["ID"]);
          }

          for (let i = 0; i < IDsAllSheets.length; i++) {
            await remote
              .getGlobal("connectMySQL")
              .execute(`DELETE FROM sheet WHERE ID = ${IDsAllSheets[i]}`);
          }
        }
      }

      await remote
        .getGlobal("connectMySQL")
        .execute(`DELETE FROM worker WHERE ID = ${workerID}`);

      await ShowAllWorkers();
    }
  }
}
// ____________________________________________________________ | Функция для удаления сотрудника
// ______________________________________________________________________ | [ЛОГИКА] Состояние "Работники"

// ______________________________________________________________________ | [ЛОГИКА] Состояние "Ведомости"
// ____________________________________________________________ | Функция для загрузки всех ведомостей
async function ShowAllSheets() {
  const [rows] = await remote
    .getGlobal("connectMySQL")
    .execute("select * from sheet");

  [mainAllGaragesRows] = await remote
    .getGlobal("connectMySQL")
    .execute("select * from garage");

  [mainAllWorkersRows] = await remote
    .getGlobal("connectMySQL")
    .execute(`select * from worker WHERE worker.Function = 2`);

  for (
    let i =
      document.querySelector("select[name=FromGarageSheet]").options.length - 1;
    i >= 0;
    i--
  ) {
    document.querySelector("select[name=FromGarageSheet]").options[i] = null;
  } // Очищаем выпадающие списки

  for (
    let i =
      document.querySelector("select[name=FromPodpisantSheet]").options.length -
      1;
    i >= 0;
    i--
  ) {
    document.querySelector("select[name=FromPodpisantSheet]").options[i] = null;
  } // Очищаем выпадающие списки

  for (
    let i =
      document.querySelector("select[name=FromGarageSheetCrt]").options.length -
      1;
    i >= 0;
    i--
  ) {
    document.querySelector("select[name=FromGarageSheetCrt]").options[i] = null;
  } // Очищаем выпадающие списки

  for (
    let i =
      document.querySelector("select[name=FromPodpisantSheetCrt]").options
        .length - 1;
    i >= 0;
    i--
  ) {
    document.querySelector("select[name=FromPodpisantSheetCrt]").options[i] =
      null;
  } // Очищаем выпадающие списки

  if (mainAllGaragesRows.length) {
    for (let j = 0; j < mainAllGaragesRows.length; j++) {
      let newOption1 = new Option(
        mainAllGaragesRows[j]["Name"],
        mainAllGaragesRows[j]["ID"]
      );
      let newOption2 = new Option(
        mainAllGaragesRows[j]["Name"],
        mainAllGaragesRows[j]["ID"]
      );

      document.querySelector("select[name=FromGarageSheet]").options[
        document.querySelector("select[name=FromGarageSheet]").length
      ] = newOption1;

      document.querySelector("select[name=FromGarageSheetCrt]").options[
        document.querySelector("select[name=FromGarageSheetCrt]").length
      ] = newOption2;
    }
  }

  if (mainAllWorkersRows.length) {
    for (let j = 0; j < mainAllWorkersRows.length; j++) {
      let newOption1 = new Option(
        mainAllWorkersRows[j]["FIO"],
        mainAllWorkersRows[j]["ID"]
      );
      let newOption2 = new Option(
        mainAllWorkersRows[j]["FIO"],
        mainAllWorkersRows[j]["ID"]
      );

      document.querySelector("select[name=FromPodpisantSheet]").options[
        document.querySelector("select[name=FromPodpisantSheet]").length
      ] = newOption1;

      document.querySelector("select[name=FromPodpisantSheetCrt]").options[
        document.querySelector("select[name=FromPodpisantSheetCrt]").length
      ] = newOption2;
    }
  }

  // __________________________________________________ | Процесс отрисовки html.table
  let construntBlock = `
      <table class="table_col">
        <colgroup>
          <col style="background: #555555" />
        </colgroup>
        <tr>
          <th>ID ведомости</th>
          <th>№ ведомости</th>
          <th>Дата подписания</th>
          <th>Гараж</th>
          <th>Подписант</th>
        </tr>
      `; // Размечаем шапку html.table

  if (rows.length) {
    for (let i = 0; i < rows.length; i++) {
      let tempIDGarage = rows[i]["IDgarage"];
      let tempNameGarage = "";

      let tempIDWorker = rows[i]["IDsigner"];
      let tempFIOWorker = "";

      for (let j = 0; j < mainAllGaragesRows.length; j++) {
        if (mainAllGaragesRows[j]["ID"] == tempIDGarage)
          tempNameGarage = mainAllGaragesRows[j]["Name"];
      }

      for (let j = 0; j < mainAllWorkersRows.length; j++) {
        if (mainAllWorkersRows[j]["ID"] === tempIDWorker)
          tempFIOWorker = mainAllWorkersRows[j]["FIO"];
      }

      construntBlock += `
            <tr>
              <td>${rows[i]["ID"]}</td>
              <td>${rows[i]["NumberSheet"]}</td>
              <td>${moment(rows[i]["DateSheet"]).format("YYYY-MM-DD")}</td>
              <td>${tempNameGarage}</td>
              <td>${tempFIOWorker}</td>
            </tr>
            `;
    }
  } else {
    construntBlock += `<tr><td rowspan="1" colspan="5">Нету ведомостей</td></tr>`; // Размечаем информацию о отсутствии элементов
  }
  construntBlock += `</table>`; // Заканчиваем размечать html.table
  document.querySelector(".all-sheets .display-print").innerHTML =
    construntBlock; // Окончательно рисуем результаты в родительском html.div
  // __________________________________________________ | Процесс отрисовки html.table
}
// ____________________________________________________________ | Функция для загрузки всех ведомостей

// ____________________________________________________________ | Функция для редактирования ведомости
async function RenameSheet() {
  let idSheets = document.querySelector(".input-id-change-sheet").value;
  let nomerSheets = document.querySelector(".input-nomer-change-sheet").value;
  let dateSheets = document.querySelector(".input-date-change-sheet").value;

  let newSheetGarageIndex = document.querySelector(
    "select[name=FromGarageSheet]"
  ).options.selectedIndex;
  let newSheetGarageValue = document.querySelector(
    "select[name=FromGarageSheet]"
  ).options[newSheetGarageIndex].value;

  let newSheetPodpisantIndex = document.querySelector(
    "select[name=FromPodpisantSheet]"
  ).options.selectedIndex;
  let newSheetPodpisantValue = document.querySelector(
    "select[name=FromPodpisantSheet]"
  ).options[newSheetPodpisantIndex].value;

  const [rows] = await remote
    .getGlobal("connectMySQL")
    .execute(
      `UPDATE sheet SET NumberSheet = '${nomerSheets}', DateSheet = '${dateSheets}', IDgarage = '${newSheetGarageValue}', IDsigner = '${newSheetPodpisantValue}' WHERE ID = ${idSheets}`
    );

  if (rows["affectedRows"] /* MySQL вернул успешный результат */)
    window.alert(`Ведомость ID:${idSheets} потерпела изменения`);
  else window.alert(`Ведомость по ID не найдена для изменений`);

  await ShowAllSheets();
}
// ____________________________________________________________ | Функция для редактирования ведомости

// ____________________________________________________________ | Функция для создания ведомости
async function CreateSheet() {
  let nomerSheets = document.querySelector(".input-nomer-create-sheet").value;
  let dateSheets = document.querySelector(".input-date-create-sheet").value;

  let newSheetGarageIndex = document.querySelector(
    "select[name=FromGarageSheetCrt]"
  ).options.selectedIndex;
  let newSheetGarageValue = document.querySelector(
    "select[name=FromGarageSheetCrt]"
  ).options[newSheetGarageIndex].value;

  let newSheetPodpisantIndex = document.querySelector(
    "select[name=FromPodpisantSheetCrt]"
  ).options.selectedIndex;
  let newSheetPodpisantValue = document.querySelector(
    "select[name=FromPodpisantSheetCrt]"
  ).options[newSheetPodpisantIndex].value;

  await remote
    .getGlobal("connectMySQL")
    .execute(
      `insert into sheet (NumberSheet, DateSheet, IDgarage, IDsigner) values ('${nomerSheets}', '${dateSheets}', '${newSheetGarageValue}', '${newSheetPodpisantValue}')`
    );

  window.alert(`Ведомость:${nomerSheets} создана`);

  await ShowAllSheets();
}
// ____________________________________________________________ | Функция для создания ведомости

// ____________________________________________________________ | Функция для удаления ведомости
async function RemoveSheet() {
  let idSheets = document.querySelector(".input-id-remove-sheet").value;

  let decisionRequest = confirm(`
    Вы действительно хотите удалить эту ведомость?\n
    Внимание!:\n
    Все связанные с ней путевые листы будут уничтожены!\n
    Нажатие кнопки "OK" - удалит ведомость.\n
    Нажатие кнопки "Отмена" - закроет диалог (ведомость не будет удален).
    `);

  if (decisionRequest) {
    const [rowsSheets] = await remote
      .getGlobal("connectMySQL")
      .execute(`SELECT * FROM sheet where ID = ${idSheets}`);

    if (rowsSheets.length) {
      const [rowsRecords] = await remote
        .getGlobal("connectMySQL")
        .execute(`SELECT * FROM record where IDsheet = ${idSheets}`);

      if (rowsRecords.length) {
        let IDsAllRecords = [];

        for (let i = 0; i < rowsRecords.length; i++) {
          IDsAllRecords.push(rowsRecords[i]["ID"]);
        }

        for (let i = 0; i < IDsAllRecords.length; i++) {
          await remote
            .getGlobal("connectMySQL")
            .execute(`DELETE FROM record WHERE ID = ${IDsAllRecords[i]}`);
        }
      }

      await remote
        .getGlobal("connectMySQL")
        .execute(`DELETE FROM sheet WHERE ID = ${idSheets}`);
    }

    await ShowAllSheets();
  }
}
// ____________________________________________________________ | Функция для удаления ведомости
// ______________________________________________________________________ | [ЛОГИКА] Состояние "Ведомости"
