export default class UtilsService {
    static myInstance:any = null;
	public maxColumnWidth = 400;
    static getInstance(maxColumnWidth = 400) {
        if (this.myInstance == null) {
          this.myInstance = new this(maxColumnWidth);
        }
        return this.myInstance;
      }

    constructor(maxColumnWidth = 400) {
		this.maxColumnWidth = maxColumnWidth;;
	}

    public uuidv4 = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8
			return v.toString(16)
		})
	}
	public randomKey = () => {
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
	}

	public getTextWidth = (text: string, font?: string) =>{
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		if (context) {
			context.font = font || getComputedStyle(document.body).font;
			const calculated = Math.round((context.measureText(text).width * 1.05) + 10); // pad here? 10
			return Math.min(calculated, this.maxColumnWidth); 
		} else {
			return 0;
		}
	  }
	
	public getGridWidths = (obj: any, headers?: any[]) => {
		const columnWidths: number[]= [];
		const keys = Object.keys(obj[0] || [])
		let gridWidth = 0;
		for (let j = 0; j < keys.length; j++) {
			let textWidth = 0;
			const firstItem = obj[0][keys[j]];
			if (headers && headers[j]) {
				textWidth = this.getTextWidth(headers[j]);
			} else if (typeof firstItem === 'object' && firstItem?.TYPE && firstItem?.TYPE === 'CHECKBOX') {
				textWidth = 20;
			} else {
				textWidth = this.getTextWidth(keys[j]);
			}
			if (typeof columnWidths[j] !== 'number' || textWidth > columnWidths[j]) {
				columnWidths[j] = textWidth + 40; // 35;
			}
			for (let k = 0; k < obj.length; k++) {
				const item = obj[k][keys[j]];
				let textWidth = 0;
				if (typeof item === 'string') {
					textWidth = this.getTextWidth(item);
				} else if (typeof item === 'number') {
					textWidth = this.getTextWidth(item.toString());
				} else if (typeof item === 'boolean') {
					textWidth = this.getTextWidth(item.toString());
				} else if (typeof item === 'object' && item?.TYPE && item?.TYPE === 'CHECKBOX') {
					textWidth = 20;
				} else if (typeof item === 'object' && item !== null && typeof item !== 'undefined') {
					if (!item.TYPE) {
						textWidth = this.getTextWidth(JSON.stringify(item));
					}
				}
				if (typeof columnWidths[j] !== 'number' || textWidth > columnWidths[j]) {
					columnWidths[j] = textWidth
				}
			}
		}
		for (let j = 0; j < keys.length; j++) {
			gridWidth += columnWidths[j];
		}
		return {gridWidth, columnWidths};

	}

}