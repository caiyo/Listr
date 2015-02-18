package controllers;

import play.data.Form;
import play.db.jpa.Transactional;
import play.mvc.*;
import views.html.*;
import models.Account;

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
        return ok(index.render("Your new application is ready."));
    }
    
	public static Result login(){
    	return ok(login.render(Form.form(Login.class)));
    }
    @Transactional
    public static Result logout(){
    	session().clear();
    	flash("success", "You've been logged out");
    	return redirect(routes.Application.index());
    }
    
    public static Result signUp(){
		return ok(signup.render(Form.form(Account.class)));
	}
    
    //TODO figure out how to handle request
    @Transactional
    public static Result authenticate(){
    	Form<Login> f = Form.form(Login.class).bindFromRequest();
    	if(f.hasErrors()){
    	    System.out.println("username + pass not found");
    		return badRequest();
    	}
    	else{
    	    System.out.println("username + pass  found");
    		session().clear();
    		session("userName", f.get().userName.toLowerCase());
    		
    		return ok();
    	}
    }
    

}
