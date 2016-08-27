class CookieHelper{
	static get(key : string){
		var name = key + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				var substr = c.substring(name.length,c.length);
				try{
					return JSON.parse(substr);
				}catch(error){
					return substr;
				}
			}
		}
		return null;
	}
	static set(key : string,value : any, validity : number = 7 ){
		var d = new Date();
		d.setTime(d.getTime() + (validity*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = key + "=" + JSON.stringify(value) + "; " + validity;
	}
}
