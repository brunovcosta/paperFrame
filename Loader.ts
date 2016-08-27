declare var $ : any;

module Loader{
	var div = $("<div class=loader>");
	var queue=0;
	export function start(){
		div.appendTo(document.body);
	}
	export function stop(){
		if(queue==0)
			div.detach();
	}
}
