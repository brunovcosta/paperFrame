///<reference path="./ModuleController.ts"/>
///<reference path="../HashTable.ts"/>

class Router{
	private routes : HashTable<ModuleController>;
	private mainController : ModuleController;
	params : any;
	constructor(mainController : ModuleController,routes : HashTable<ModuleController>){
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
				this.mainController.children.yield = this.routes[route];
				this.params=this.paramsFromPath(route,location.pathname);
			}
		});
		this.mainController._init();
		this.mainController.render();
	}
	init(){
		window.onpopstate = ()=>{
			this.render();
		}
		document.body.addEventListener('click', (event : any)=>{
			let tag = <HTMLAnchorElement>event.target;
			if (tag.tagName == 'A' && tag.href && event.button == 0) {
				if (tag.host == document.location.host) {
					var oldPath = document.location.pathname;
					var newPath = tag.pathname;
					event.preventDefault();
					history.pushState(null, '', newPath);
					this.render();
				}
			}
		});
		this.render();
	}
	go(path : string){
		history.pushState(null,"",path);
		this.render();
	}

}
