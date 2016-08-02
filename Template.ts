class Template extends HTMLElement{
	private reference : string;
	private $scope : any;
	constructor(reference : string,$scope : any){
		this.reference = reference;
		this.$scope = $scope;
	}
}
