module InputHelper{
	function setSelectionRange(input, selectionStart, selectionEnd) {
	  if (input.setSelectionRange) {
		input.focus();
		input.setSelectionRange(selectionStart, selectionEnd);
	  }
	  else if (input.createTextRange) {
		var range = input.createTextRange();
		range.collapse(true);
		range.moveEnd('character', selectionEnd);
		range.moveStart('character', selectionStart);
		range.select();
	  }
	}
	function surround(elem,beforeString,afterString){
		var startPos = elem.selectionStart;
		var endPos = elem.selectionEnd;
		var selectedText = elem.value.slice(startPos,endPos);
		var beforeText = elem.value.slice(0,startPos);
		var afterText = elem.value.slice(startPos+selectedText.length,elem.value.length);
		elem.value = beforeText+beforeString+selectedText+afterString+afterText;
		setSelectionRange(elem,endPos+beforeString.length,endPos+beforeString.length);
	}
	export var autocomplete=(evt : any)=>{
		var key = String.fromCharCode(evt.which || evt.keyCode);
		if(key=="$"){
			evt.preventDefault();
			surround(evt.target,"$","$");
		}
		if(key=="{"){
			evt.preventDefault();
			surround(evt.target,"{","}");
		}
		if(key=="("){
			evt.preventDefault();
			surround(evt.target,"(",")");
		}
		if(key=="["){
			evt.preventDefault();
			surround(evt.target,"[","]");
		}
		if(key=="'"){
			evt.preventDefault();
			surround(evt.target,"'","'");
		}
		if(key=="\""){
			evt.preventDefault();
			surround(evt.target,"\"","\"");
		}
		if(key=="|"){
			evt.preventDefault();
			surround(evt.target,"|","|");
		}
	}
}
