class ClipboardHelper{
	static initImageClipboard(url : string,callback : Function){
		var blobToFormData = (blob)=>{
			var formData = new FormData();
			formData.append("file",blob, "clipboard.png");
			return formData;
		}
		window.addEventListener("paste", (evt : any):any=>{
			var items = evt.clipboardData.items;

			for (let index: number=0;index<items.length;index+=1) {
				let item = items[index];
				if (item.kind === 'file') {
					let blob = item.getAsFile();
					$.ajax({
						type     : "POST",
						contentType: false,
						url      : url,
						data     : blobToFormData(blob) ,
						processData: false,
						success  : callback
					});
				}else{
				}
			}
		})
	}
	static copyToClipboard(text : string) {
		if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
			var textarea = document.createElement("textarea");
			textarea.textContent = text;
			textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
			document.body.appendChild(textarea);
			textarea.select();
			try {
				return document.execCommand("copy");  // Security exception may be thrown by some browsers.
			} catch (ex) {
				console.warn("Copy to clipboard failed.", ex);
				return false;
			} finally {
				document.body.removeChild(textarea);
			}
		}
	}
}
