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
        return ok(toJson(Group.createGroup(currentUser, f.get())));
    }
    
    @Transactional
    private static Result addUserToGroup(String groupId){
        User currentUser = User.findByUserName(request().username());
        Group group = Group.findById(Long.parseLong(groupId));
        DynamicForm f = Form.form().bindFromRequest();
        User userToAdd = User.findByUserName(f.get("username"));
        boolean admin = Boolean.parseBoolean(f.get("isAdmin"));
        if(userToAdd == null){
            return badRequest("username: " + f.get("username") + " doesn't exist");
        }
        if(userToAdd.isMember(group))
            return badRequest(userToAdd.getUserName() + " is already a member of this group");
        if(currentUser.addUserToGroup(userToAdd, group, admin))
         return ok(toJson(userToAdd));
        else{
            return unauthorized("Must be an admin to add users to groups");
        }
    }
    
    @Transactional
    private static Result promoteUserToAdmin(String groupId){
        User currentUser = User.findByUserName(request().username());
        DynamicForm f = Form.form().bindFromRequest();
        User userToPromote = User.findByUserName(f.get("username"));
        Group group = Group.findById(Long.parseLong(groupId));
        if(userToPromote==currentUser)
            return badRequest("Cannot promote yourself from admin");
        if(currentUser.promoteToGroupAdmin(userToPromote, group))
           return ok(toJson(userToPromote));
        return unauthorized("Must be an admin to promote to admin");
    }
    
    @Transactional
    private static Result demoteUserFromAdmin(String groupId){
        User currentUser = User.findByUserName(request().username());
        DynamicForm f = Form.form().bindFromRequest();
        User userToDemote = User.findByUserName(f.get("username"));
        Group group = Group.findById(Long.parseLong(groupId));
        if(userToDemote==currentUser)
            return badRequest("Cannot demote yourself from admin");
        if(currentUser.demoteFromGroupAdmin(userToDemote, group))
            return ok(toJson(userToDemote));
        return unauthorized("Must be an admin to demote from admin");
    }
    
    @Transactional
    private static Result removeUserFromGroup(String groupId){
        System.out.println("trying to remove user");
        User currentUser = User.findByUserName(request().username());
        DynamicForm f = Form.form().bindFromRequest();
        User userToRemove = User.findByUserName(f.get("username"));
        Group group = Group.findById(Long.parseLong(groupId));
        if(userToRemove==currentUser)
            return badRequest("Cannot remove yourself from admin");
        if(currentUser.removeUserFromGroup(userToRemove, group))
            return ok();
        return unauthorized("Must be an admin to remove users from a group");
    }
    
    @Transactional
    public static Result getGroups(){        
        User currentUser = User.findByUserName(request().username());
        return ok(toJson(currentUser.getGroups()));
    }

    @Transactional
    public static Result getGroup(String groupId){
        User currentUser = User.findByUserName(request().username());
        Group g = Group.findById(Long.parseLong(groupId));
        if(g==null){
            return badRequest("Group doesn't exist");
        }
        if(currentUser.isMember(g)){
            return ok(toJson(g));
        }
        return unauthorized("Not Authorized");
    }
    
    @Transactional
    public static Result updateGroupName(String groupId){
        User currentUser = User.findByUserName(request().username());
        Group g = Group.findById(Long.parseLong(groupId));
        DynamicForm f = Form.form().bindFromRequest();
        String newName=f.get("name");
        if(g==null){
            return badRequest("Group doesn't exist");
        }
        if(currentUser.isAdmin(g)){
            if(newName !=null && !newName.trim().isEmpty()){
                g.setName(newName);
                return ok(toJson(g));
            }
            else{
                return badRequest("Name cannot be empty");
            }
            
        }
        return unauthorized("Not Authorized");
    }
    
    //User must be an admin of a group to delete it
    @Transactional
    public static Result deleteGroup(String groupId){
        User currentUser = User.findByUserName(request().username());
        Group g = Group.findById(Long.parseLong(groupId));
        if(g==null){
            return badRequest("Group doesn't exist");
        }
        if(currentUser.isAdmin(g)){
            Group.deleteGroup(g);
            return ok(toJson(g));
        }
        return unauthorized("Not Authorized");
    }
}
