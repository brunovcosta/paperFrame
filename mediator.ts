class Mediator{
	private hub : any;
	constructor(){
		this.hub = {};
	}
	subscribe(channel : string ,callback : ()=>{}){
		if(this.hub[channel].constructor==Array){
			this.hub[channel].push(callback);
		}else{
			this.hub = [callback];
		}
	}
	publish(channel : string ,data : any){
		if(this.hub[channel].constructor==Array){
			for(var index in this.hub[channel])
				this.hub[channel](data);
		}else{
			this.hub[channel]=[];
		}
	}
} 
