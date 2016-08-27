///<reference path="./AJAXCall.ts" />
///<reference path="../CookieHelper.ts" />

//Thi is the authentication system. Each instance of this class holds an authentication
class Authentication{
	private token :string;
	private signinPath : string;
	user : any;

	constructor(signinPath : string){
		this.signinPath = signinPath;
		this.token=CookieHelper.get("token");
	}
	signin(login : string,password : string,callback : Function){
		AJAXCall.post(this.signinPath,{login: login,password: password},(token : string)=>{
			this.token = token;
			callback();
		});
	}
	signout(callback){
		AJAXCall.destroy(this.signinPath+"/"+this.token,{},()=>{
			this.token = null;
			this.user = null;
			callback();
		});
	}
	signed(){
		return !!this.token;
	}
	validate(callback : Function){
		if(this.token){
			AJAXCall.get(this.signinPath,{token: this.token},(user : any)=>{
				if(user){
					this.user = user;
					callback(true);
				}else{
					this.user = null;
					this.token=null;
					CookieHelper.set("token",null);
					callback(false);
				}
			});
		}else{
			callback(false);
		}
	}
}
