animate = (function(){
	var time = 0;
	var index_string=0;
	var index_char=0;
	var up = true;
	return {
		//pega o object[prop] e preenche com as strings do textList com animação de digitação.
		//Há um intervalo de stay para cada string.
		propertyTypeLoop: function(object,prop,textList,deltaTime,stay){
			var thread = setInterval(function(){
				time+=1;
				index_char+= up ? 1 : -1 ;
				if(index_char > textList[index_string].length+stay)
					up = false;
				if(index_char <= 0 ){
					up = true;
					index_string = (index_string+1)%textList.length;
				}
				object[prop] = textList[index_string].slice(0,index_char);
			},deltaTime);
		},
	}
}());
