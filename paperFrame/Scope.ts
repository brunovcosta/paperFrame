class Scope{
	private schema:any;
	private store:any;
	private listeners:Function[];
	public constructor(schema:any={}){
		this.schema = schema;
		this.store={};
		this.listeners=[];
	}
	public get(field:string):any{
		return this.store[field];
	}
	public set(field:string,value:any):void{
		if(value!==null && value!==undefined && value.constructor === this.schema[field]){
			this.store[field] = value;
			this.callListeners();
		}else{
			debugger
			throw new TypeError("Invalid format");
		}
	}
	public clear(field:string):void{
		this.store[field]=null;
		this.callListeners();
	}
	public remove(field:string,value:number):void{
		if(Array === this.schema[field]){
			this.store[field].splice(value,1);
			this.callListeners();
		}else{
			debugger
			throw new TypeError("Invalid format");
		}
	}
	public push(field:string,value:any):void{
		if(Array === this.schema[field]){
			this.store[field].push(value);
			this.callListeners();
		}else{
			throw new TypeError("Invalid format");
		}
	}
	public getStore():any{
		return this.store;
	}
	private callListeners():void{
		this.listeners.forEach((callback:Function)=>{
			callback();
		});
	}
	public onChange(callback:Function):void{
		this.listeners.push(callback);
	}
}
