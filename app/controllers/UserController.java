package controllers;

import static play.libs.Json.toJson;
import Utils.EmailService;
import models.Group;
import models.User;
import play.data.DynamicForm;
import play.data.Form;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;

@Security.Authenticated(Secured.class)
public class UserController extends Controller {
    
    
    
}
