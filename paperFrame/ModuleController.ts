///<reference path="./DOMQuery.ts" />
///<reference path="./Scope.ts" />

class ModuleController{
	public static routeFunction : Function = null;
	public static templateMap : any = null;
	public container : HTMLElement;
	public template : any;
	public children : any;
	public $scope : Scope;
	public constructor(container : HTMLElement = null, template : any){
		this.container = container;
		this.template = template;
		this.children={};
	}
	public render(){
		if(this.container){
			this.container.innerHTML=this.template(this.$scope.getStore());
			this.preProcBars();
			this.pfIf();
			this.pfPartial();
			this.pfLink();
			this.pfEvents();
			this.pfModel();
			this.pfInclude();
			Object.keys(this.children).forEach((key : string)=>{
				let child : ModuleController = this.children[key];
				child.render();
			});
		}
	}
	private eval(cmd : string,elem : HTMLElement, evt : any){
		let values : any[] = Object.keys(this.$scope.getStore()).map((key)=>{
			return this.$scope.get(key);
		});
		let keys : string[] = Object.keys(this.$scope.getStore());
		return Function.apply(elem,keys.concat("event").concat(cmd)).apply(elem,values.concat(evt));
	}
	_init(){
		this.init();
		Object.keys(this.children).forEach((key : string)=>{
			this.children[key]._init();
		});
	}
	init(){}

	private preProcBars(){
		this.container.innerHTML = this.container.innerHTML.replace(/{{/g,"<span class='pf-react'>").replace(/}}/g,"</span>")
		$(this.container).find(".pf-react").each((index : number , elem : HTMLElement)=>{
			$(elem).attr("data-value",elem.innerHTML);
			elem.innerHTML = this.eval("return "+$(elem).attr("data-value"),elem,undefined);
			this.$scope.onChange(()=>{
				elem.innerHTML = this.eval("return "+$(elem).attr("data-value"),elem,undefined);
			});
		});

	}

	//pf-include: include another template inside with own controller
	private pfInclude(){
		$(this.container).find("[pf-include]").each((index : number , elem : HTMLElement)=>{
			let controller : ModuleController = this.children[$(elem).attr("pf-include")];
			if(controller)
				controller.container = elem;
		});
	}
	//pf-link: bypass <a> tags and generate custom route on click
	private pfLink(){
		$(this.container).find("[pf-link]").each((elementIndex : number,elem : any)=>{
			elem.href = $(elem).attr("pf-link");
			$(elem).click((evt)=>{
				if(ModuleController.routeFunction){
					ModuleController.routeFunction($(elem).attr("pf-link"));
					evt.stopPropagation();
					evt.preventDefault();
				}
			});
		});
	}
	//pf-partial: renders another template inside the marked element
	private pfPartial(){
		if(!ModuleController.templateMap)return;
		$(this.container).find("[pf-partial]").each((elementIndex : number,elem : any)=>{
			elem.innerHTML=ModuleController.templateMap[$(elem).attr("pf-partial")](this.$scope.getStore());
		});
	}
	//pf-click, pf-keyup, pf-keypress, pf-change, pf-hover: binds events giving scope
	private pfEvents(){
		let events : string[] = ["click","keyup","keypress","change"];
		$(events).each((evtIndex : number,evt : string)=>{
			$(this.container).find("[pf-"+evt+"]").each((elementIndex : number,elem : any)=>{
				let cmd : string = $(elem).attr("pf-"+evt);
				let keys : string[] = Object.keys(this.$scope.getStore());
				let values : any[] = Object.keys(this.$scope.getStore()).map((key)=>{
					return this.$scope.get(key);
				});
				elem["on"+evt]= (event)=>{Function.apply(elem,keys.concat("event").concat(cmd)).apply(elem,values.concat(event))};
			});
		});
		$(this.container).find("[pf-hover]").each((elementIndex : number,elem : any)=>{
			let cmd : string = $(elem).attr("pf-hover");
			let keys : string[] = Object.keys(this.$scope.getStore());
			let values : any[] = Object.keys(this.$scope.getStore()).map((key)=>{
				return this.$scope.get(key);
			});
			elem["onmouseover"]= (event)=>{Function.apply(elem,keys.concat("event").concat(cmd)).apply(elem,values.concat(event))};
		});
	}
	//pf-if: remove elements unless the given condition is satisfied
	private pfIf(){
		$(this.container).find("[pf-if]").each((elementIndex : number,elem : any)=>{
			let cmd : string = $(elem).attr("pf-if");
			if(!this.eval(cmd,elem,undefined))
				elem.remove();
		});
	}
	//pf-model: set bind between input change and scope variables
	private pfModel(){
		$(this.container).find("[pf-model]").each((elementIndex : number,elem : any)=>{
			var path = $(elem).attr("pf-model");

			var indexAccess = (obj : any,is : any, value : any = undefined) => {
				if (typeof is == 'string')
					return indexAccess(obj,is.split('.'), value);
				else if (is.length==1 && value!==undefined)
					return obj[is[0]] = value;
				else if (is.length==0)
					return obj;
				else
					return indexAccess(obj[is[0]],is.slice(1), value);
			}
			$(elem).val(indexAccess(this.$scope.getStore(),path));
			$(elem).change(()=>{
				indexAccess(this.$scope.getStore(),path,$(elem).val());
			});
		});
	}
}
