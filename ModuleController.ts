declare var $ : any ;
declare var JST : any ;

class ModuleController{
	container : HTMLElement;
	template : any;
	children : any;
	$scope : any;
	public constructor(container : HTMLElement = null, template : any){
		this.container = container;
		this.template = template;
		this.$scope={};
		this.children={};
	}
	public render(){
		if(this.container){
			this.container.innerHTML=this.template(this.$scope);
			this.bindIf();
			this.bindProc();
			this.bindPartials();
			this.includeProc();
			Object.keys(this.children).forEach((key : string)=>{
				let child : ModuleController = this.children[key];
				child.render();
			});
		}
	}
	private includeProc(){
		$(this.container).find("[pf-include]").each((index : number , pfElement : HTMLElement)=>{
			let controller : ModuleController = this.children[$(pfElement).attr("pf-include")];
			if(controller)
				controller.container = pfElement;
		});
	}
	private bindPartials(){
		$(this.container).find("[pf-partial]").each((index : number , pfElement : HTMLElement)=>{
			pfElement.innerHTML = JST[$(pfElement).attr("pf-partial")](this.$scope);
		});
	}
	private bindProc(){
		let events : string[] = ["click","keyup","keypress","change"];
		$(events).each((evtIndex : number,evt : string)=>{
			$(this.container).find("[pf-"+evt+"]").each((elementIndex : number,pfElement : any)=>{
				let cmd : string = $(pfElement).attr("pf-"+evt);
				let keys : string[] = Object.keys(this.$scope);
				let values : any[] = Object.keys(this.$scope).map((key)=>{
					return this.$scope[key];
				});
				pfElement["on"+evt]= ()=>{Function.apply(pfElement,keys.concat(cmd)).apply(pfElement,values)};
			});
		});
	}
	private bindIf(){
		$(this.container).find("[pf-if]").each((elementIndex : number,pfElement : any)=>{
			let base : any = this.$scope;
			let value : string = $(pfElement).attr("pf-if");
			for (var key of value.split(".")){
				if(base)
					base = base[key];
				else{
					pfElement.remove();
					return;
				}

			}
			if(!base){
				pfElement.remove();
			}
		});
	}
	init(){}
}
