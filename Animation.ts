class Animation{
	time : number;
	index_string : number;
	index_char : number;
	up : boolean;
	constructor(){
		this.time = 0;
		this.index_string=0;
		this.index_char=0;
		this.up = true;
	}
	//pega o object[prop] e preenche com as strings do textList com animação de digitação.
	//Há um intervalo de stay para cada string.
	propertyTypeLoop(object,prop,textList,deltaTime,stay){
		var thread = setInterval(()=>{
			this.time+=1;
			this.index_char+= this.up ? 1 : -1 ;
			if(this.index_char > textList[this.index_string].length+stay)
				this.up = false;
			if(this.index_char <= 0 ){
				this.up = true;
				this.index_string = (this.index_string+1)%textList.length;
			}
			object[prop] = textList[this.index_string].slice(0,this.index_char);
		},deltaTime);
	}
}
