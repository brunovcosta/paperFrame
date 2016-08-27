declare var MathJax : any;

module MathRenderer{
	export function transformRender(element : HTMLElement, callback : Function=()=>{}){
		if(typeof(MathJax)!="undefined"){
			MathJax.Hub.PreProcess(element);
			MathJax.Hub.Reprocess(element,()=>{
				callback(true);
			});
		}else{
			callback(false);
		}
	}
	export function compileRender(rawText : string,callback : Function = ()=>{}){
		let tempArea : any = document.createElement("div");
		tempArea.innerHTML = rawText;
		tempArea.style.opacity=0
		tempArea.style.position="fixed";
		document.body.appendChild(tempArea);
		transformRender(tempArea,()=>{
			callback(tempArea.innerHTML);
			document.body.removeChild(tempArea);
		})
	}
}
