import Vue from 'vue'
import {MLInstaller, MLCreate, MLanguage} from 'vue-multilanguage'

Vue.use(MLInstaller)

export default new MLCreate({
    initial: 'ukraine',
    save: process.env.NODE_ENV === 'production',
    languages: [
        new MLanguage('english').create({
            word: {
                table:'table',
                text: "text",
                number: "number",
                range: "range",
                engine: "engine type",
                type: "type",
                cylinders: "cylinders",
                fuelType: "fuel type",
                superchargedType: "supercharged types",
                engineManufacture: "en. manufacturer",
                autoEngine: "auto engine",
                autoManufacturer: "car brand",
                autoModel: "auto model",
                engineNumber: "engine number",
                empty:"empty",
                nameElements: "element name",
                releaseYear: "release year",
                from: "from",
                by: 'to',
                releaseYearFrom: "year issue, s",
                releaseYearBy: "year issue, to",
                action: "action",
                save: "save",
                update: "update",
                engineCapacity: "Engine capacity",
                powerKwt: "powerful, kWt",
                horsepower: "powerful, horsepower",
                degreeCompression: "degree of compression",
                cylindersNumber: "number of cylinders",
                flapNumber: "number of valves",
                pistonStroke: "piston stroke",
                pistonDiameter: "piston diameter",
                add: "add",
                file: 'file',
                name: 'name',
                units: "ed.",
                min: "min",
                max: "max",
                value: "value",
                author: 'author',
                source: "source",
                data: "data...",
                password: "password",
                changeTypeOfEngine: "the type of engine you want to change",
                login: "login",
                logout: "exit",
                selectBlock: "select a block: ",
                language: "language",
                filter:"filter",
                treeElem: "element tree",
                updateData: "directory",
                search: "search",
                dataChange: "data to change",
                newData: "new data",
                advancedSearch: "advanced search",
                clearAllField: "clear all field",
                parameter: 'parameter',
                deleteR: 'delete',
                changeRoot: 'select root to change',
                tree: 'tree',
                loginOnButton: 'login',
                choose: 'choose',
                title: 'name',
                numRowOnPage: 'num. row on page: ',
                mark: 'mark',
                newBlockText:'add new block',
                status:'status',
                downlandBlank:'downland blank',
                shortName:'short name',
                clearAllFilter: 'clear all filter',
                cancel:'cancel',
                dataAddSuccess:'data added successfully',
                fullName:'full name',
                importFile:'import',
                exportFile:'export file',
                clickToUpload:"click to upload",
                column:"columns",
                parameters: 'parameters',
                setParameter:'change parameters',
                rows:' row(s)',
                inccYear:'You entered the year incorrectly',
                treeStruct:'tree structure',
                noRecordsInDB:'there are no records in the database'

            },
            msg: {
                passwordErr: 'password is required!',
                usernamedErr: 'Username is required!',
                authErr: "Authorization Error",
                duplicateValue:'duplicate value'
            },
            errPage: {
                logoText: 'error',
                oopsRow: 'Oops! This page Could Not Be Found!',
                SorryRow: 'Sorry bit the page you are looking for does not exist, have been removed or name changed.',
                buttonText: 'Go to homepage'
            }
        }),

        new MLanguage('russian').create({
            word: {
                text: "текст",
                number: "число",
                range: "диапазон",
                selectBlock: "виберіть блок:  ",
                type: "тип",
                table:'таблица',
                engine: "тип двигателя",
                numRowOnPage: 'кол-во строк на странице: ',
                cylinders: "цилиндры",
                fuelType: "вид топлива",
                superchargedType: "виды наддува",
                engineManufacture: "пр. двигателей",
                autoEngine: "авто двигатель",
                autoManufacturer: "марка авто",
                autoModel: "модель авто",
                engineNumber: "номер двигателя",
                nameElements: "название элемента",
                releaseYear: "год выпуска",
                from: "от",
                empty:"пусто",
                by: 'до',
                releaseYearFrom: "год вып, с",
                downlandBlank:'скачать бланк',
                releaseYearBy: "год вып, к",
                action: "действие",
                save: "добавить запись",
                update: "обновить",
                engineCapacity: "Объем двигателя",
                powerKwt: "мощн. kWt",
                horsepower: "мощн. кон сил",
                degreeCompression: "степень зжаття",
                cylindersNumber: "кол-во цилиндров",
                flapNumber: "кол-во клапанов",
                pistonStroke: "ход поршня",
                pistonDiameter: "диаметр поршня",
                add: "добавить",
                file: 'файл',
                name: 'имя',
                units: "ед. изм ",
                min: "мин",
                max: "макс",
                value: "значение",
                author: 'автор',
                source: "источник",
                data: "данные ...",
                password: "пароль",
                changeTypeOfEngine: "тип двигателя, который хотите изменить",
                login: "войти",
                logout: "выйти",
                language: "язык",
                treeElem: "дерево элементов",
                updateData: "справочник",
                search: "поиск",
                dataChange: "данные для изменения",
                newData: "новые данные",
                advancedSearch: "улучшить поиск",
                clearAllField: "очистить все поля",
                parameter: 'параметр',
                parameters: 'параметры',
                deleteR: 'удалить',
                changeRoot: "выберите корень для изменения",
                tree: 'дерево',
                loginOnButton: 'авторизоваться',
                choose: 'выбрать',
                title: 'название',
                mark: "Обозначение",
                filter:"фильтр",
                clearAllFilter: 'очистити всі фільтры',
                newBlockText:'добавить новый блок',
                status:'статус',
                shortName:'короткое назание',
                cancel:'Отмена',
                dataAddSuccess:'данные успешно добавлены',
                fullName:'полное название',
                importFile:'импорт',
                exportFile:'экспортировать файл',
                rows:' шт.',
                clickToUpload:"нажмите, чтобы загрузить",
                column:"столбцы",
                inccYear:'Вы некорректно ввели год',
                treeStruct:'структура дерева',
                setParameter:'изменение параметров'  ,
                noRecordsInDB:'в базе нет записей'
            },
            msg: {
                passwordErr: "Пароль необходим!",
                userNamedErr: "Имя пользователя необходимо!",
                authErr: "Ошибка авторизации",
                duplicateValue:'дублированное значение'
            },
            errPage: {
                logoText: 'ошибка',
                oopsRow: "Ой! Эту страницу не удалось найти!",
                SorryRow: 'К сожалению, искомая страница не существует, была удалена или изменено имя.',
                buttonText: 'Перейти на домашнюю страницу'
            }
        }),

        new MLanguage('ukraine').create({
            word: {
                parameters: 'параметри',
                type: "тип",
                text: "текст",
                number: "число",
                numRowOnPage: 'кіл-ть рядків на сторінці: ',
                selectBlock: "выберите блок: ",
                range: "діапазон",
                table:'таблиця',
                engine: 'тип двигуна',
                cylinders: 'циліндри',
                fuelType: 'вид палива',
                superchargedType: 'види наддуву',
                engineManufacture: 'вир. двигунів',
                autoEngine: 'авто двигун',
                autoManufacturer: 'марка авто',
                autoModel: 'модель авто',
                engineNumber: 'номер двигуна',
                downlandBlank:'скачати бланк',
                rows:' шт.',
                nameElements: 'назва елементу',
                releaseYear: 'рік випуску',
                from: 'від',
                by: 'до',
                releaseYearFrom: 'рік вип, з',
                releaseYearBy: 'рік вип, до',
                action: "дія",
                save: 'додати запис',
                update: 'обновити',
                engineCapacity: 'об\'єм двигуна',
                powerKwt: 'потуж, kWt',
                horsepower: 'потуж, кін сил',
                degreeCompression: 'ступінь зжаття',
                cylindersNumber: 'к-ть циліндрів',
                flapNumber: 'к-ть клапанів',
                pistonStroke: 'хід поршня',
                empty:"порожньо",
                filter:"фільтр",
                pistonDiameter: 'діаметр поршня',
                add: 'додати',
                file: 'файл',
                name: 'ім\'я',
                units: 'од. вим',
                min: 'мін',
                max: 'макс',
                value: 'значення',
                author: 'автор',
                source: 'джерело',
                data: 'дані...',
                password: 'пароль',
                changeTypeOfEngine: 'виберіть тип двигуна, який хочете змінити',
                login: 'увійти',
                logout: 'вийти',
                language: 'мова',
                treeElem: 'дерево елементів',
                updateData: 'довідник',
                search: 'пошук',
                dataChange: 'дані для зміни',
                newData: 'нові дані',
                advancedSearch: 'покращити пошук',
                clearAllField: 'очистити всі поля',
                clearAllFilter: 'очистити всі фільтри',
                parameter: 'параметр',
                deleteR: 'видалити',
                changeRoot: 'виберіть корінь для зміни',
                tree: 'дерево',
                loginOnButton: 'вхід',
                choose: 'вибрати',
                title:'назва',
                mark:'Позначення',
                newBlockText:'додати новий блок',
                status:'статус',
                shortName:'коротка назва',
                cancel:'скасувати',
                dataAddSuccess:'дані успішно додані',
                fullName:'повна назва',
                importFile:'імпорт',
                exportFile:'експортувати файл',
                clickToUpload:"натисніть для завантаження",
                column:"стовпці",
                treeStruct:'структура дерева',
                setParameter:'зміна параметрів',
                inccYear:'Ви некоректно ввели рік',
                noRecordsInDB:'в базі немає записів'
            },
            msg: {
                passwordErr: 'Пароль необхідний!',
                userNamedErr: 'Ім\'я користувача обов\'язкове!',
                authErr: 'Помилка авторизації',
                duplicateValue:'повторюване значення',
                formatIsIncorrect:"Формат вкладених файлів невірний. Видаліть і повторно завантажте!"
            },
            errPage: {
                logoText: 'помилка',
                oopsRow: "На жаль! Цю сторінку не вдалося знайти! ",
                SorryRow: "Вибачте, що сторінки, яку ви шукаєте, не існує, її видалено або змінено ім'я.",
                buttonText: "Перейти на головну сторінку"
            }

        })

    ]
})