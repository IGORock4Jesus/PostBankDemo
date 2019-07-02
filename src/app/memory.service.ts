import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Inject } from '@angular/core';
import { SendCategory } from './send.category';
import { SendTypes } from './send.types';
import { SendType } from './send.type';

export class MemoryService implements InMemoryDbService {
    createDb(reqInfo?: import("angular-in-memory-web-api").RequestInfo): {} | import("rxjs").Observable<{}> | Promise<{}> {
		return {
			categories: [
					new SendCategory(1, "Посылки", SendTypes.Inner, 1, 20000),
					new SendCategory(2, "ЕМС", SendTypes.Inner, 1, 30000),
					new SendCategory(3, "Международные послыки", SendTypes.External, 1, 10000),
					new SendCategory(4, "Международные ЕМС", SendTypes.External, 1, 20000)
			],
			types: [
				new SendType(1, "Посылка стандарт", 1, 1, 10000),
				new SendType(2, "Посылка нестандарт", 1, 10001, 20000),
				new SendType(3, "ЕМС обыкновенное", 2, 1, 5000),
				new SendType(4, "ЕМС оптимальное", 2, 1, 30000)
			]
		}
    }

}
