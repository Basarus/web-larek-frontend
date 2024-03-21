# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

!Базовый код

1. Класс Component<T>

Абстрактный класс, является базовым классом для компонентов интерфейса,  реализует методы для управления компонентами (изменения текста/изображения, переключение класса и рендер).
Класс является дженериком и в переменной Т принимает тип данных компонентов.

Конструктор принимает элемент с которым будет происходить взаимодействие.
Класс имеет такие методы:

- setText, setImage, toggleClass для изменения состояния элементов.
- render для заполнения свойств элемента и получения его в формате HTMLElement.

2. Класс Model<T>

Абстрактный класс, для того что бы компонент можно было отличить от простых объектов с данными, реализует методы отслеживания изменений компонентов.
Конструктор принимает компонент для отслеживания.

Класс имеет такие методы:

- emitChanges сообщает об изменение модели

3. Класс EventEmitter

Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков
о наступлении события.
Класс имеет методы on ,  off ,  emit  — для подписки на событие, отписки от события и уведомления
подписчиков о наступлении события соответственно.
Дополнительно реализованы методы  onAll и  offAll  — для подписки на все события и сброса всех
подписчиков.
Интересным дополнением является метод  trigger , генерирующий заданное событие с заданными
аргументами. Это позволяет передавать его в качестве обработчика события в другие классы. Эти
классы будут генерировать события, не будучи при этом напрямую зависимыми от
класса  EventEmitter.

!Компоненты и модели данных (бизнес-логика)

1. Класс AppState

Осуществляет управление состоянием всего приложения (корзина, заказ, главная страница).
Ключевые методы:

- addProductInBasket добавить товар в корзину.
- removeProductFromBasket удалить товар из корзины.
- getBasket получить список товаров.
- setPreview установить превью товара.
- setCatalog установить товары в каталог.
- getTotalPrice получить стоимость всех товаров из корзины.
- clearBasket очистить корзину.
- setOrderField установить значения поля заказа.
- validateOrder валидация полей заказа.
- clearOrder очистить поля заказа.

!Компоненты представления

1. Класс BasketUI
Класс наследуемый от абстрактного класса Component.
Выполняет функцию отображения корзины в контейнере.
Конструктор на вход принимает HTMLElement (шаблон корзины) и EventEmitter для взаимодействия с другими компонентами.
Ключевые свойства и методы:
- items список товаров в корзине
- total общая стоимость товаров в корзине

2. Класс ModalUI
Класс наследуемый от абстрактного класса Component.
Выполняет функцию отображения модального окна.
Конструктор на вход принимает HTMLElement (который нужно отобразить в модальном окне) и EventEmitter для взаимодействия с другими компонентами.
Ключевые свойства и методы:
- content компонент который отображается в модальном окне
- open() открыть модальное окно
- close() закрыть модальное окно
- render() отобразить модальное окно в компоненте

3. Класс PageUI
Класс наследуемый от абстрактного класса Component.
Выполняет функцию отображения главной страницы приложения.
Конструктор на вход принимает HTMLElement (body) и EventEmitter для взаимодействия с другими компонентами.
Ключевые свойства и методы:
- counter счетчик товаров в корзине
- catalog католог с карточками товаров
- locked состояние блокировки прокрутки страницы

4. Класс ProductUI
Абстрактный класс наследуемый от абстрактного класса Component.
Выполняет функцию шаблона продукта, управления им и отображением.
Конструктор на вход принимает имя стиля компонента, контейнер шаблона (HTMLElement) и action функции при нажатии кнопки.
Ключевые свойства и методы:
- id уникальный индификатор продукта
- title название продукта
- category категория продукта
- price цена продукта
- image ссылка на изображение продукта
- description описание продукта

4.1 Класс BasketItemUI
Класс наследуемый от абстрактного класса ProductUI для отображения товаров в корзине.
Ключевой метод index - для нумерации продукта в корзине
Конструктор на вход принимает имя стиля компонента, контейнер шаблона (HTMLElement) и action функции при нажатии кнопки.

5. OrderUI
Класс наследуемый от абстрактного класса Form.
Выполняет функцию отображения заказа в контейнере и управления им.
Конструктор на вход принимает HTMLElement (шаблон страницы заказа) и action - действия на кнопку.
Если в шаблоне присутствуют кнопки с специальным стилем button_alt то реагирует на их изменение (по типу радио).
Ключевые свойства и методы:
- phone номер телефона заказчика
- email электронная почта заказчика
- address физический адрес заказчика
- payment выбранный способ оплаты заказчиком

6. SuccessUI
Класс наследуемый от абстрактного класса Component.
Выполняет функцию отображения результата выполнения заказа.
Конструктор на вход принимает HTMLElement (шаблон окна результата) и action функция кнопки
Ключевые свойства и методы:
- title заголовок окна.
- description описание результата.

7. Класс Form<T>
Абстрактный класс наследуемый от абстрактного класса Component для создания формы, ее отображения и управления.
Конструктор на вход принимает HTMLFormElement и EventEmitter для взаимодействия с другими компонентами.
Ключевые свойства и методы:
- valid переключатель доступности кнопки submit формы
- errors ошибки полученные при валидации формы
- render() метод для отображения формы в контейнере
- onInputChange() метод реагирующий на изменение инпутов формы


Для управления формами проекта, реализует методы для отслеживания изменения состояний свойств, рендера и отправка формы.
Конструктор принимает элемент с которым будет происходить взаимодействие и функцию вызывающаяся для события submit.

Класс имеет такие методы:

- onInputChange для отслеживания изменения свойств формы.
- render для заполнения свойств элемента и получения его в формате HTMLElement.

!Ключевые типы данных

interface IBasketView {
 items: HTMLElement[];
 total: number;
}

interface IProductActions {
 onClick: (event: MouseEvent) => void;
}

interface IProductUI<T> {
    index: number;
 title: string;
 description: string;
 price: string;
 image: string;
 category: string;
 status: T;
}

type CatalogChangeEvent = {
 catalog: IProduct[];
};

interface IFormState {
 valid: boolean;
 errors: string[];
}

interface IModalData {
    content: HTMLElement;
}

interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

interface ISuccess {
 title: string;
 description: string;
}

interface ISuccessActions {
 onClick: () => void;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
 id: string[];
 total: number;
 error?: string;
}

export interface IProduct {
 id: string;
 title: string;
 image: string;
 price: number | null;
 description: string;
 category: string;
}

export interface Products {
 total: number;
 items: IProduct[];
}

export interface IOrder {
 payment: string;
 email: string;
 phone: string;
 address: string;
 total: number;
 items: string[];
}

export interface IWebLakerApi {
 getProducts: () => Promise<Products>;
 getProduct: (id: string) => Promise<IProduct>;
 createOrder: (order: IOrder) => Promise<IOrderResult>;
}

!Ивенты

const Events = {
 ['ITEMS_CHANGED']: 'items:changed',
 ['ADD_PRODUCT']: 'cart:add-product',
 ['REMOVE_PRODUCT']: 'cart:remove-product',
 ['CREATE_ORDER']: 'cart:create_order',
 ['OPEN_PREVIEW']: 'product:open-preview',
 ['CHANGED_PREVIEW']: 'product:changed-preview',
 ['BASKET_OPEN']: 'cart:open',
 ['FORM_ERRORS_CHANGE']: 'formErrors:changed',
 ['ORDER_OPEN'] : 'order:open',
 ['SET_PAYMENT_TYPE'] : 'order:setPaymentType',
 ['MODAL_OPEN'] : 'modal:open',
 ['MODAL_CLOSE'] : 'modal:close',
};

![image](https://github.com/Basarus/web-larek-frontend/assets/74671944/43e14269-26ea-47d9-bbff-3c0653044824)
