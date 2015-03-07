package controllers;

import static play.libs.Json.toJson;

import java.util.Arrays;
import java.util.Map;

import play.data.Form;
import play.db.jpa.Transactional;
import play.mvc.*;
import play.mvc.Http.Response;
import views.html.*;
import models.Account;
import models.User;

public class Application extends Controller {
	public static class Login{
    	private String userName;
		private String password;
    	
    	public Login(){
    		System.out.println("test");
    	}
    	public String getuserName() {
			return userName;
		}
		public void setuserName(String userName) {
			this.userName = userName;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
    	public String validate(){
    		if(Account.authenticate(userName, password)==null)
    			return ("Invalid userName or password");
    		return null;
    	}
    }

	public static Result index() {
        return ok(index2.render());
    }
	
	public static Result faq(){
	    return ok(faq.render());
	}
	
	public static Result help(){
	    return ok(help.render());
	}
    
	public static Result login(){
    	return ok(login.render(Form.form(Login.class)));
    }
    @Transactional
    public static Result logout(){
    	session().clear();
    	return ok();
    }
    
    public static Result signUp(){
		return ok();
	}
    
    //TODO figure out how to handle request
    @Transactional
    public static Result authenticate(){
    	Form<Login> f = Form.form(Login.class).bindFromRequest();
    	if(f.hasErrors()){
    	    System.out.println("username + pass not found");
    		return badRequest("Could not find username or password");
    	}
    	else{
    	    System.out.println("username + pass  found");
    		session().clear();
    		session("userName", f.get().userName.toLowerCase());
    		return ok(toJson(User.findByUserName(session("userName"))));
    	}
    }
    public static Result preflight(String all) {
        response().setHeader("Access-Control-Allow-Origin", "*");
        response().setHeader("Allow", "*");
        response().setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
        response().setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Referer, User-Agent");
        response().setHeader("Access-Control-Allow-Credentials", "true");
        return ok();
    }

}
