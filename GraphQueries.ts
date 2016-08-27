module GraphQueries{
	 function addNeibohrs(array,elem){
		if(elem.children.length>0)
			for(var t=0;t<elem.children.length;t++)
				array.push(elem.children[t]);
		if(elem.parentElement)
			array.push(elem.parentElement);
	}
	export function bfsSearch(elem,clazz){
		if(elem.className.toString().split(' ').indexOf(clazz)>-1){
			return elem;
		}else{
			var visited  = [];
			var to_visit = [];
			visited.push(elem);
			addNeibohrs(to_visit,elem);

			while(to_visit.length>0){
				var current = to_visit.shift();
				visited.push(current);

				if(current.className.toString().split(' ').indexOf(clazz)>-1){
					return current;
				}else{
					addNeibohrs(to_visit,current);
				}
				to_visit = to_visit.filter(function(el){
					return visited.indexOf(el)==-1;
				});
			}
			return null;
		}
	}
}
