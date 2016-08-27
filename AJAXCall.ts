declare var $ : any;

class AJAXCall{
	static get(path : string,params : any, callback : Function){
		$.ajax({
			url: path,
			type: "GET",
			data: params,
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: callback
		});
	}
	static post(path : string,params : any, callback : Function){
		$.ajax({
			url: path,
			type: "POST",
			data: params,
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: callback
		});
	}
	static put(path : string,params : any, callback : Function){
		$.ajax({
			url: path,
			type: "PUT",
			data: params,
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: callback
		});
	}
	static delete(path : string,params : any, callback : Function){
		$.ajax({
			url: path,
			type: "DELETE",
			data: params,
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: callback
		});
	}
}
