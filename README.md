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

1. Класс Product

Основной класс реализует паттерн «Фабрика» с экземплярами которого взаимодействует пользователь.
Реализует методы для взаимодействия с конкретным товаром.

Конструктор принимает такие аргументы:
1. id: string - уникальный индификатор товара
2. title: string - название товара
3. image: string - ссылка на изображение товара
4. price: number - цена товара
5. description: string - описание товара
6. category: string - категория товара

2. Класс EventEmitter
 
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

1. Класс Cart
Реализует паттерн «Реестр».
Содержит состояние корзины пользователя и управляет ее состоянием. "Записывает" товары в корзину, удаляет и создает заказ из выбранных пользователем товаров.
Ключевой метод createOrder() - "собирает" и создает заказ пользователя

!Компоненты представления

1. Класс StoreUI
Реализует паттерн «Единая точка входа»
Выводит в контейнере список товаров.

2. Класс ModalUI
Реализует паттерн «Одиночка»
Отображает модальные окна и закрывает модальные окна.

!Ключевые типы данных

interface FormElements extends HTMLFormElement {
	address: HTMLInputElement;
	phone: HTMLInputElement;
	email: HTMLInputElement;
}

interface IProduct {
	id: string;
	title: string;
	image: string;
	price: number;
	description: string;
	category: string;
}

type TypePayment = 'online' | 'card';

interface Order {
 payment: TypePayment;
 email: string;
 phone: string;
 address: string;
 total: number;
 items: Product['id'][];
}

enum Events {
 ADD_PRODUCT: 'cart:add-product',
 REMOVE_PRODUCT: 'cart:remove-product',
 CREATE_ORDER: 'cart:create_order',
 OPEN_PREVIEW: 'product:open-preview'
}

![image](https://github.com/Basarus/web-larek-frontend/assets/74671944/14b1d3f9-c578-4def-886a-37065707132c)





