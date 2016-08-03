///<reference path="./ModuleController.ts"/>
///<reference path="../HashTable.ts"/>

class Router{
	private routes : HashTable<ModuleController>;
	private mainController : ModuleController;
	constructor(mainController : ModuleController,routes : HashTable<ModuleController>){
		this.routes = routes;
		this.mainController = mainController;
	}
	render(){
		if(this.routes[location.pathname]){
			this.mainController.children.yield = this.routes[location.pathname];
		}
		this.mainController.init();
		this.mainController.render();
	}
	init(){
		window.onpopstate = ()=>{
			this.render();
		}
		this.render();
	}

}
