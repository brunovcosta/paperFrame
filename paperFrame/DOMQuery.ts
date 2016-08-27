declare var $ : any;
class DOMQuery{
	static find(query : string){
		return $(query);
	}
}
