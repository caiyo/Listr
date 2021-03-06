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

    @Transactional
    public static Result actionRouter(String action){
        switch(action) {
            case "requestResetPassword":
                return ok(resetPasswordRequest.render(null));
            case "getUsername":
                return ok(usernameRequest.render(null));
            default:
                return redirect(routes.Application.index());
        }
    }
    @Transactional
    public static Result resetPasswordForm(String id, String token){
        Account a = Account.findAccountById(Long.parseLong(id));
        if(a.getResetPasswordToken()!=null && a.getResetPasswordToken().equals(token))
            return ok(resetPasswordForm.render(a,null));
        else
            return redirect(routes.Application.index());
    }

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

	

	/*
	 * Read
	 */
    @Security.Authenticated(Secured.class)
	@Transactional
	public static Result getAccountUser(){
		User user = User.findByUserName(request().username());
		return ok(toJson(user));
	}
    
    //sends out email with url to reset password
    //possibly make asynch
    @Transactional
    public static Result resetPasswordRequest(){
        DynamicForm df = Form.form().bindFromRequest();
        User u = User.findByUserName(df.get("username"));
        if(u!=null){
            String baseURL = routes.Application.index().absoluteURL(request());
            EmailService.resetPassword(u,baseURL);
            return redirect(routes.Application.index());    
        }
        else
            return badRequest(resetPasswordRequest.render("Username doesn't exist"));
    }
    
    //resets password and clears out email token so it can't be used again
    @Transactional
    public static Result resetPassword(String id){
        DynamicForm df = Form.form().bindFromRequest();
        String password = df.get("password");
        String confirmPassword = df.get("confirmPassword");
        Account a = Account.findAccountById(Long.parseLong(id));
        if(password.equals(confirmPassword)){
            a.setResetPasswordToken(null);
            a.setPassword(password);
            return redirect(routes.Application.index());
        }
        return badRequest(resetPasswordForm.render(a,"Password and confirm password must match"));
    }
    
    //emails username to entered email address
    @Transactional
    public static Result getUsername(){
        DynamicForm df = Form.form().bindFromRequest();
        User u = User.findByEmail(df.get("email"));
        if(u!=null){
            EmailService.sendUsername(u);
            return redirect(routes.Application.index());    
        }
        else
            return badRequest(usernameRequest.render("No account exists with the email address entered"));
    }
    
}
