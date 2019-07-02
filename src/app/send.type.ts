export class SendType {
	id: number;
	name: string;
	categoryId: number;
	minWeight: number;
	maxWeight: number;

	constructor(id: number, name: string, categoryId: number, minWeight: number, maxWeight: number) {
		this.id = id;
		this.name = name;
		this.categoryId = categoryId;
		this.minWeight = minWeight;
		this.maxWeight = maxWeight;
	}
}