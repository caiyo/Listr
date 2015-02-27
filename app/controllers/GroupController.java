package controllers;

import static play.libs.Json.toJson;
import models.Group;
import models.User;
import play.data.DynamicForm;
import play.data.Form;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;

@Security.Authenticated(Secured.class)
public class GroupController extends Controller {
    
    @Transactional
    public static Result actionRouter (String groupId) {
        String action =request().getQueryString("action");
        switch(action){
            case "addUser" :
                return addUserToGroup(groupId);
            case "promoteUser" :
                return promoteUserToAdmin(groupId);
            case "removeUser" :
                return removeUserFromGroup(groupId);
            case "demoteUser" :
                return demoteUserFromAdmin(groupId);
            default:
                return badRequest();
        }
    }
    @Transactional
    public static Result createGroup(){
        User currentUser = User.findByUserName(request().username());
        Form<Group> f = Form.form(Group.class).bindFromRequest();
        System.out.println(f);
        //Group.createGroup(currentUser, f.get());
        return ok(toJson(Group.createGroup(currentUser, f.get())));
    }
    
    @Transactional
    private static Result addUserToGroup(String groupId){
        User currentUser = User.findByUserName(request().username());
        Group group = Group.findById(Long.parseLong(groupId));
        DynamicForm f = Form.form().bindFromRequest();
        User userToAdd = User.findByUserName(f.get("username"));
        boolean admin = Boolean.parseBoolean(f.get("isAdmin"));
        if( userToAdd == null){
            return badRequest("Error adding " + f.get("username") + " to " + group.getName());
        }
        if(currentUser.addUserToGroup(userToAdd, group, admin))
          //TODO change what is returned in http response
         return ok(toJson(userToAdd));
        else{
            return badRequest("Cannot add user to " + group.getName());
        }
    }
    
    @Transactional
    private static Result promoteUserToAdmin(String groupId){
        User currentUser = User.findByUserName(request().username());
        DynamicForm f = Form.form().bindFromRequest();
        User userToPromote = User.findByUserName(f.get("username"));
        Group group = Group.findById(Long.parseLong(groupId));
        if(currentUser.promoteToGroupAdmin(userToPromote, group))
        //TODO change what is returned in http response
           return ok(toJson(userToPromote));
        return badRequest("Error promoting " + userToPromote.getUserName() + "to admin");
    }
    
    @Transactional
    private static Result demoteUserFromAdmin(String groupId){
        User currentUser = User.findByUserName(request().username());
        DynamicForm f = Form.form().bindFromRequest();
        User userToDemote = User.findByUserName(f.get("username"));
        Group group = Group.findById(Long.parseLong(groupId));
        if(currentUser.demoteFromGroupAdmin(userToDemote, group))
            return ok(toJson(userToDemote));
        return badRequest("Error demoting " + userToDemote.getUserName() + " from admin");
    }
    
    @Transactional
    private static Result removeUserFromGroup(String groupId){
        System.out.println("trying to remove user");
        User currentUser = User.findByUserName(request().username());
        DynamicForm f = Form.form().bindFromRequest();
        User userToRemove = User.findByUserName(f.get("username"));
        Group group = Group.findById(Long.parseLong(groupId));
        //TODO change what is returned in http response
        if(currentUser.removeUserFromGroup(userToRemove, group))
            return ok();
        return badRequest("Error removing " + userToRemove.getUserName() + "from " + group.getName());
    }
    
    @Transactional
    public static Result getGroups(){        
        User currentUser = User.findByUserName(request().username());
        return ok(toJson(currentUser.getGroups()));
    }

}
