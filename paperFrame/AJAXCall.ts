///<reference path="../Loader.ts"/>

class AJAXCall{
	static toParams(node : string=null,obj : any){
		if(obj && typeof(obj)==="object"){
			return Object.keys(obj).map((key : string)=>{
				if(node){
					return this.toParams(node+"["+key+"]",obj[key]);
				}else{
					return this.toParams(key,obj[key]);
				}
			}).join("&");
		}else{
			return node+"="+encodeURI(obj);
		}
	}
	static http(method : string,url : string,params : any, callback : Function) {
		Loader.start();
		$.ajax({
			url: url,
			type: method,
			crossDomain: true,
			data: params,
			dataType: "json",
			success: (data : any)=>{
				Loader.stop();
				callback(data);
			}
		});
		//Loader.start();
		//var xhr = new XMLHttpRequest();
		//xhr.open(method, url, true);
		//xhr.withCredentials = true;
		//xhr.onreadystatechange = ()=>{
		//	Loader.stop();
		//	if (xhr.readyState != 4 || xhr.status != 200) return;
		//	if(xhr.responseText){
		//		callback(JSON.parse(xhr.responseText));
		//	}else{
		//		callback();
		//	}
		//};

		//xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
		//xhr.send(JSON.stringify(params));
		//return xhr;
	}
	static get(path : string,params : any, callback : Function){
		this.http("GET",path,params,callback);
	}
	static post(path : string,params : any, callback : Function){
		this.http("POST",path,params,callback);
	}
	static put(path : string,params : any, callback : Function){
		this.http("PUT",path,params,callback);
	}
	static destroy(path : string,params : any, callback : Function){
		this.http("DELETE",path,params,callback);
	}
}
