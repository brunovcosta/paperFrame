///<reference path="./AJAXCall.ts" />

class Model{
	private table_name:string;
	private schema:any;
	private store:any;

	public static base_url:string;

	public constructor(table_name:string,params:any={}){
		this.table_name=table_name;
		Object.keys(params).forEach((key)=>{
			this.set(key,params[key]);
		});
	}
	public get(field:string):any{
		return this.store[field];
	}
	public set(field:string,value:any):void{
		if(typeof value === this.schema[field]){
			this.store[field] = value;
		}else{
			throw new TypeError("invalid format");
		}
	}
	public modelUrl():string{
		return Model.base_url+"/"+this.table_name;
	}
	public thisUrl():string{
		return this.modelUrl()+"/"+this.store["id"];
	}
	public save(callback:Function):void{
		AJAXCall.http((this.store["id"]?"PUT":"POST"),this.thisUrl(),this.store,callback);
	}
	public destroy(callback:Function):void{
		AJAXCall.http(this.store["id"],this.thisUrl(),this.store,callback);
	}

}
