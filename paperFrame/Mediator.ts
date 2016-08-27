class Mediator{
	private hub : any;
	public constructor(){
		this.hub = {};
	}
	public subscribe(channel : string ,callback : Function){
		if(this.hub[channel].constructor==Array){
			this.hub[channel].push(callback);
		}else{
			this.hub = [callback];
		}
	}
	public publish(channel : string ,data : any){
		if(this.hub[channel].constructor==Array){
			for(var index in this.hub[channel])
				this.hub[channel](data);
		}else{
			this.hub[channel]=[];
		}
	}
} 
