import { ensureElement } from '../../../utils/utils';
import { Component } from '../../base/Component';

interface IProductActions {
	onClick: (event: MouseEvent) => void;
}

export interface IProductUI<T> {
    index: number;
	title: string;
	description: string;
	price: string;
	image: string;
	category: string;
	status: T;
}

export class ProductUI<T> extends Component<IProductUI<T>> {
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _description: HTMLElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: IProductActions
	) {
		super(container);
		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._button = container.querySelector(`.${blockName}__button`);
		this._description = container.querySelector(`.${blockName}__description`);
		this._price = container.querySelector(`.${blockName}__price`);
		this._category = container.querySelector(`.${blockName}__category`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set category(value: string) {
		this.setText(this._category, value);
	}

	get category(): string {
		return this._category.textContent || '';
	}

	set price(value: string) {
		this.setText(this._price, value + ' синапсов');
	}

	get price(): string {
		return this._price.textContent || '0 синапсов';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string | string[]) {
		if (Array.isArray(value)) {
			this._description.replaceWith(
				...value.map((str) => {
					const descTemplate = this._description.cloneNode() as HTMLElement;
					this.setText(descTemplate, str);
					return descTemplate;
				})
			);
		} else {
			this.setText(this._description, value);
		}
	}
}

export type CatalogItemStatus = {
	status: boolean;
};

export class CatalogItem extends ProductUI<CatalogItemStatus> {
	protected _status: HTMLElement;

	constructor(container: HTMLElement, actions?: IProductActions) {
		super('card', container, actions);
		this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
	}

	set status({ status }: CatalogItemStatus) {
		this.setText(this._button, status ? 'Уже в корзине' : 'В корзину');
		this._button.disabled = status
	}
}

export type BasketItemStatus = {
	index: number;
};

export class BasketItem extends ProductUI<BasketItemStatus> {
	protected _index: HTMLElement;

	constructor(container: HTMLElement, actions?: IProductActions) {
		super('card', container, actions);
		this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
	}

	set index(value: number) {
		this.setText(this._index, value.toString());
	}
}
