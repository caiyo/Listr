package controllers;



import java.util.List;
import java.util.Map.Entry;

import models.Account;
import models.User;
import play.data.DynamicForm;
import play.data.Form;
import play.data.validation.ValidationError;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
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
		Account newAccount = new Account(df.get("password"), df.get("confirmPassword"),df.get("userName"), df.get("name"));
		System.out.println(df.toString());
		
		List<ValidationError> error = newAccount.validate();
		if(error != null){
		    for(ValidationError e :  error){
                System.out.println(e.key() + " " +e.message());
            }
            return badRequest("ERRORS");
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

	/*
	 * Update
	 */
	
	/*
	 * Delete
	 */
}
