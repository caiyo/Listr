package controllers;

import static play.libs.Json.toJson;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import models.Group;
import models.Item;
import models.ItemList;
import models.ItemPropertyValue;
import models.ListProperty;
import models.User;
import play.data.Form;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;

@Security.Authenticated(Secured.class)
public class ListController extends Controller {
    @Transactional
    public static Result createList(String groupId){
        User currentUser = User.findByUserName(request().username());
        Group group = Group.findById(Long.parseLong(groupId));
        String req = "req_"; //flag used to check if form data is a 'required' checkbox
        if(currentUser.isMember(group)){
            Set<ListProperty> listProperties = new HashSet<>();
            Map<String,String> formData = Form.form().bindFromRequest().data();
            ItemList list = new ItemList(formData.get("name"));
            for(Map.Entry<String, String> data : formData.entrySet()){
                    //doesnt get the name form data and checks that
                    //data is not a checkbox (prefixed by 'req_')
                   if(!data.getKey().equals("name") 
                      && data.getValue()!=null && !data.getValue().isEmpty()
                      && !data.getKey().contains(req)){
                       listProperties.add(new ListProperty(data.getValue(),                                                                   
                                           formData.containsKey(req+data.getKey())));
                   }
            }
            return ok(toJson(ItemList.createList(currentUser, group, list, listProperties)));
        }
        return unauthorized("must be part of group to add list");
    }
    
    @Transactional
    public static Result addItem(String listId){
        User currentUser = User.findByUserName(request().username());
        ItemList list = ItemList.findById(Long.parseLong(listId));
        Set<ListProperty> listProps = list.getProperties();
        Set<ItemPropertyValue> itemPropVals = new HashSet<>();
        if(currentUser.isMember(list.getGroup())){
            Map<String,String> formData = Form.form().bindFromRequest().data();
            Item item = new Item(formData.get("name"));
            for(ListProperty lp : listProps){
                String propVal = formData.get(lp.getPropertyName());
                if((lp.isRequired() && !(propVal==null || propVal.isEmpty()))
                    || !lp.isRequired()){
                    ItemPropertyValue  ipv= new ItemPropertyValue(propVal,
                                                                    item, lp);
                    itemPropVals.add(ipv);
                }
                else{
                    badRequest("1 or more of the fields cannot be null");
                }

            }
            return ok(toJson(Item.createItem(item, currentUser, list, itemPropVals)));
        }
        return unauthorized("User is not part of group"); 
    }
    
    //TODO complete update list item
    @Transactional
    public static Result updateListItem(String listId, String itemId){
        Item item = Item.findById(Long.parseLong(itemId));
        ItemList list = ItemList.findById(Long.parseLong(listId));
        if(list.containsItem(item)){
            
        }
        return ok(toJson(item));
    }
    
    @Transactional
    public static Result checkOffItem(String listId, String itemId){
        User currentUser = User.findByUserName(request().username());
        Item item = Item.findById(Long.parseLong(itemId));
        ItemList list = ItemList.findById(Long.parseLong(listId));
        if(currentUser.isMember(list.getGroup()) && list.containsItem(item)){
            item.setDone(!item.getDone()); //checks/unchecks item based on current status
            return ok(toJson(item));
        }
        return badRequest("item not in list or doesnt exist");
    }
    
    @Transactional
    public static Result deleteList(String listId){
        User currentUser = User.findByUserName(request().username());
        ItemList list = ItemList.findById(Long.parseLong(listId));
        if(list.getCreater() == currentUser){
            ItemList.deleteList(list);
            return ok();
        }
        return unauthorized("must be creater to delete");
    }
    
    @Transactional
    public static Result getListsinGroup(String groupId){
        User currentUser = User.findByUserName(request().username());
        Group group = Group.findById(Long.parseLong(groupId));
        if(currentUser.isMember(group)){
            return ok(toJson(group.getLists()));
        }
        return unauthorized("Not part of group");
    }
    
    @Transactional
    public static Result getAllLists(){
        HashSet<ItemList> lists = new HashSet<>();
        User currentUser = User.findByUserName(request().username());
        for(Group g : currentUser.getGroups()){
            lists.addAll(g.getLists());
        }
        return ok(toJson(lists));
    }
}
