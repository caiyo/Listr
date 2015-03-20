package controllers;



import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

import Utils.EmailService;
import models.Account;
import models.User;
import play.data.DynamicForm;
import play.data.Form;
import play.data.validation.ValidationError;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.*;
import static play.libs.Json.toJson;

public class AccountController extends Controller {

/*************************
 *********API*************
 *************************/	

	/*
	 * Create
	 */
    @Transactional
	public static Result createAccount(){
		//Form<Account> f = Form.form(Account.class).bindFromRequest();
		DynamicForm df = Form.form().bindFromRequest();
		Account newAccount = new Account(df.get("password"), df.get("confirmPassword"),df.get("userName"), df.get("name"), df.get("email"));
		System.out.println(df.toString());
		
		List<ValidationError> error = newAccount.validate();
		if(error != null){
		    List<String> errorResponse = new ArrayList<>();
		    for(ValidationError e :  error){
		        errorResponse.add(e.message());
                System.out.println(e.key() + " " +e.message());
            }
            return badRequest(toJson(errorResponse));
		}
		else{
		    Account account = Account.createAccount(newAccount);
		    return ok(toJson(account.getUser()));
		}
	}

	@Transactional
	public static Result actionRouter(){
	    String action = request().getQueryString("action");
	    switch(action) {
	        case "resetPassword":
	            return ok(resetPasswordRequest.render(null));
	        case "getUsername":
	            return ok(usernameRequest.render(null));
	        default:
	            return badRequest();
	    }
	}

	/*
	 * Read
	 */
    @Security.Authenticated(Secured.class)
	@Transactional
	public static Result getAccountUser(){
		User user = User.findByUserName(request().username());
		return ok(toJson(user));
	}
    
    @Transactional
    public static Result resetPassword(){
        DynamicForm df = Form.form().bindFromRequest();
        User u = User.findByUserName(df.get("username"));
        if(u!=null){
            EmailService.resetPassword(u);
            return redirect(routes.Application.index());    
        }
        else
            return badRequest(resetPasswordRequest.render("Username doesn't exist"));
    }
    @Transactional
    public static Result getUsername(){
        DynamicForm df = Form.form().bindFromRequest();
        User u = User.findByEmail(df.get("email"));
        if(u!=null){
            EmailService.sendUsername(u);
            return redirect(routes.Application.index());    
        }
        else
            return badRequest(usernameRequest.render("Username doesn't exist"));
    }
    
}
