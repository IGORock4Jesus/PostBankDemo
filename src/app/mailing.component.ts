import { Component } from '@angular/core';
//import { matches } from 'validatorjs';
import { match } from 'minimatch';
import { HttpClient } from '@angular/common/http';
import { SendTypes } from './send.types';
import { SendCategory } from './send.category';
import { SendType } from './send.type';
import { FakeService } from './fake.service';
import { fail } from 'assert';


@Component({
	selector: 'mailing',
	templateUrl: './mailing.component.html',
	//styleUrls: [ './mailing.component.css']
	styles: [
		'p.helper1 { color: lightgray; width: 100px; }'
	]
})

export class MailingComponent {
	_trackNumber: string;
	_weight: number;
	categories: SendCategory[];
	_category: SendCategory;
	selectedType: SendType = null;
	types: SendType[];
	type: SendTypes;
	_postCode: string;
	_recepient: string;
	isOrganization: boolean;

	_isGood: boolean;
	validTrackNumber: boolean;
	validWeight: boolean;
	//validTrackNumber: boolean;
	validatePostCode: boolean;
	validateRecepient: boolean;

	//service: FakeService;


	constructor(private http: HttpClient) {

		//this.service = new FakeService(http);

		this.toDefault();
	}

	ngOnInit() {
		//this.http.get('default.json').subscribe((data: MailingComponent) => {
		//	this.postCode = data.postCode;
		//	this.recepient = data.recepient;
		//	this.categories = data.categories;
		//	this.trackNumber = data.trackNumber;
		//	this.weight = data.weight;
		//});
	}


	set trackNumber(n: string) {
		n = n.trim();
		var innerRegex = /(^\d{14}$)/i;
		var externalRegex = /(^[RLVCEUZ]{1}[A-Z]{1}\d{9}[A-Z]{2}$)/i;

		this._trackNumber = n;

		var el = document.getElementById('trackNumber');

		this.validTrackNumber = false;
		this.type = null;
		if (innerRegex.test(n)) {
			this.type = SendTypes.Inner;
			this.validTrackNumber = true;
		}
		else if (externalRegex.test(n)) {
			this.type = SendTypes.External;
			this.validTrackNumber = true;
		}
		if (el != null) {
			if (this.validTrackNumber) {
				el.classList.remove('is-invalid');
				el.classList.add('is-valid');
			}
			else {
				el.classList.remove('is-valid');
				el.classList.add('is-invalid');
			}
		}

		// получаем категории
		this.getCategories();
	}
	get trackNumber() {
		return this._trackNumber;
	}

	getCategories() {
		this._category = null;
		var promise = this.http.get<SendCategory[]>('/api/categories');
		var type = this.type;
		var weight = this.weight;
		promise.subscribe((categories: SendCategory[]) => {
			this.categories = categories.filter(function (c, i, a) {
				return c.type == type && c.minWeight <= weight && weight <= c.maxWeight;
			});
			if (this.categories.length != 0)
				this.category = this.categories[0];
		});
	}

	set weight(w: number) {
		this._weight = w;
		var el = document.getElementById('weight');
		var ost = w % 1;
		if (el != null) {
			if (this.validWeight = ((ost == 0) && w > 0)) {
				el.classList.remove('is-invalid');
				el.classList.add('is-valid');
			}
			else {
				el.classList.remove('is-valid');
				el.classList.add('is-invalid');
			}
		}

		this.getCategories();
		this.getTypes();
	}
	get weight() {
		return this._weight;
	}

	get isGood() {
		return this.validTrackNumber && this.validWeight; // and etc;
	}

	get typeVisible() {
		if (this.category == null)
			return false;
		const result = this.category.type == SendTypes.Inner && this.validTrackNumber;
		return result;
	}

	set category(c: SendCategory) {
		this._category = c;

		this.getTypes();
	}
	get category() {
		return this._category;
	}

	getTypes() {
		//this.selectedType = null;
		//if (this.category != null) {
		//	this.types = this.service.getTypes(this.category.id, this.weight);
		//}

		if (this.category == null) return;

		var promise = this.http.get<SendType[]>('/api/types');
		var categoryId = this.category.id;
		var weight = this.weight;
		promise.subscribe((types: SendType[]) => {
			this.types = types.filter(function (t, i, a) {
				return t.categoryId == categoryId && t.minWeight <= weight && weight <= t.maxWeight;
			});
			if (this.types.length != 0)
				this.selectedType = this.types[0];
		});
	}

	set postCode(c: string) {
		c = c.trim();
		this._postCode = c;

		this.validatePostCode = this.validateField('postCode', /\d{6}/, c);

		//var matches = c.match(/(\d{6})/);

		//console.log(matches.input);
		//for (var m in matches) {
		//	console.log(m[0]);
		//}
	}
	get postCode() {
		return this._postCode;
	}

	set recepient(r: string) {
		r = r.trim();

		this._recepient = r;

		this.validateRecepient = this.validateField('recepient', /\w+/, r);

		//console.log(this.validateRecepient);
	}
	get recepient() {
		return this._recepient;
	}

	validateField(id: string, regex: RegExp, s: string) {

		var el = document.getElementById(id);
		var result = false;
		if (el != null) {
			if (result = regex.test(s)) {
				el.classList.remove('is-invalid');
				el.classList.add('is-valid');
			}
			else {
				el.classList.remove('is-valid');
				el.classList.add('is-invalid');
			}
		}
		return result;
	}


	get saveVisible() {
		if (this.category == null)
			return false;
		if (this.category.type == SendTypes.Inner && this.selectedType == null)
			return false;
		var valid = this.validTrackNumber && this.validWeight && this.validatePostCode && this.validateRecepient;

		return valid;
	}


	save() {
		//this.http.post()

		this.toDefault();
	}

	toDefault() {
		this.isOrganization = false;
		this._isGood = false;
		this.validatePostCode = false;
		this.validateRecepient = false;
		this.validTrackNumber = false;
		this.validWeight = false;
		this.trackNumber = "";
		this.weight = 0;
		this.category = null;
		this.selectedType = null;
		this.postCode = "";
		this.recepient = "";

		this.resetElement('trackNumber');
		this.resetElement('weight');
		this.resetElement('postCode');
		this.resetElement('recepient');

		var first = document.getElementById('trackNumber');
		if (first != null) {
			console.log('try t oset focus');
			first.focus();
		}
	}

	resetElement(id: string) {
		var el = document.getElementById(id);
		if (el != null) {
			el.classList.remove('is-valid');
			el.classList.remove('is-invalid');
		}
	}
}