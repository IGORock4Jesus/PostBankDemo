import { SendTypes } from "./send.types";
import { SendType } from "./send.type";

export class SendCategory {
	id: number;
	name: string;
	type: SendTypes;
	minWeight: number;
	maxWeight: number;

	constructor(id: number, name: string, type: SendTypes, minWeight:number,maxWeight:number) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.minWeight = minWeight;
		this.maxWeight = maxWeight;
	}
}