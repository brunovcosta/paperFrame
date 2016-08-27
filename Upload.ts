module Upload{
	function fileFormSubmit(evt,callback){
		evt.preventDefault();
		$.ajax({
			type     : "POST",
			contentType: false,
			url      : $(evt.target).attr('action'),
			data     : new FormData(evt.target) ,
			processData: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success  : callback
		});
	}
	function fileClick(evt) {
		$(evt.target).parent().submit();
	}

	/* Abre um FileSelector que faz upload de um arquivo para [url].
	 * Após o upload concluido, ele chamará [callback]
	 */
	export var uploadFileSelector = (url : string,data : any,callback : Function)=>{
		//adiciona um mini-form dentro do principal
		var fileForm = $("<form data-remote='true' action='"+url+"' method='post' enctype='multipart/form-data'>");
		var fileInput = $("<input type='file' class='formComponent' name='file' >");
		var listId = $("<input>");
		listId.attr("name","question[list_id]");
		listId.val(data.id);
		var fileSubmit = $("<input type='submit'>");
		fileForm.append(fileInput);
		fileForm.append(listId);
		fileInput.click();
		fileInput.change(fileClick);
		fileForm.submit(function(evt){
			evt.preventDefault();//impede qualquer ação default
			fileFormSubmit(evt,callback);
		});
	}
}
