///<reference path="./AJAXCall.ts" />

class Model{
	static url : string;

	name : string;

	constructor(name : string,url : string,params : any = {}){
		this.name = name;
		this.url = url;
		for (var field of Object.keys(params)){
			this[field] = params[field];
		}
	}

	static index(params : any,callback : Function){
		AJAXCall.get(this.url,params,callback);
	}
	static create(params : any,callback : Function){
		AJAXCall.post(this.url,params,callback);
	}
	destroy(callback : Function){
		AJAXCall.delete(this.url,params,callback);
	}
	pull(callback : Function){
		AJAXCall.get(this.url,params,callback);
	}
	push(callback : Function){
		AJAXCall.put(this.url,params,callback);
	}
}
