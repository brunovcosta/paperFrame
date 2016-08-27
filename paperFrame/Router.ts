///<reference path="./ModuleController.ts"/>
///<reference path="../HashTable.ts"/>

class Router{
	private routes : any;
	private mainController : ModuleController;
	params : any;
	constructor(mainController : ModuleController,routes : any){
		this.routes = routes;
		this.mainController = mainController;
	}
	private paramsFromPath(template,path){
		let retval : any = {};
		if((new RegExp(template.replace(/:\w+/,(term : string,position : number)=>{
			retval[term.substr(1)] = path.substr(position).match(/\w+/)[0];
			return "\\w+"
		}))).test(path)){
			return retval;
		}
		return {};
	}
	render(){
		Object.keys(this.routes).forEach((route : string)=>{
			var regex = new RegExp("^"+route.replace(/:\w+/g,"\\w+")+"$");
			if(regex.test(location.pathname)){
				this.mainController.children.yield = this.routes[route]();
				//Filling params
				this.params=this.paramsFromPath(route,location.pathname);
				location.search.substr(1).split(/&/).forEach((pair)=>{
					var [k,v] = pair.split("=");
					if(k!="")
						this.params[k]=decodeURI(v);
				});
			}
		});
		this.mainController._init();
		this.mainController.render();
	}
	init(){
		window.onpopstate = ()=>{
			document.body.innerHTML="";
			history.pushState(null,"","");
			this.render();
		}
		this.render();
	}
	go=(path : string)=>{
		document.body.innerHTML="";
		history.pushState(null,"",path);
		this.render();
	}

}
