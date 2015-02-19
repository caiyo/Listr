package models;
import java.util.HashMap;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import play.db.jpa.JPA;

import com.fasterxml.jackson.annotation.JsonIgnore;
/**
 * Created by kyle on 1/21/15.
 */
@Entity
@Table(name="listr_List_item")
public class Item {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    private String name;
    private boolean done;
    @ManyToOne
    @JoinColumn(name="list_id")
    @JsonIgnore
    private ItemList list;
    @ManyToOne
    @JsonIgnore
    private User creator;
    
    @OneToMany(mappedBy="item", cascade = CascadeType.REMOVE)
    private Set<ItemPropertyValue> properties;
    
    public Item(){}
    public Item(String name){
        this.name=name;
    }
    
    /*
     * GETTERS AND SETTERS
     */
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public ItemList getList() {
		return list;
	}
	public void setList(ItemList list) {
		this.list = list;
	}
	public User getCreator() {
		return creator;
	}
	public void setCreator(User creator) {
		this.creator = creator;
	}
	public boolean getDone(){
	    return done;
	}
	public void setDone(boolean done){
	    this.done=done;
	}
	public void setProperties(Set<ItemPropertyValue> properties){
	    this.properties=properties;
	}
    /*
     * END GETTERS AND SETTERS
     */
	public HashMap<String, String> getProperties(){
	    HashMap<String, String> propertyMap = new HashMap<>();
	    for(ItemPropertyValue ipv : properties){
	        propertyMap.put(ipv.getListProperty().getPropertyName(), ipv.getValue());
	    }
	    return propertyMap;
	}
	
	/*
	 * Static Methods
	 */
	
	public static Item createItem(Item item, User creator, ItemList list, Set<ItemPropertyValue> ipv){
	    item.setCreator(creator);
	    item.setList(list);
	    item.setDone(false);
	    item.setProperties(ipv);
	    for(ItemPropertyValue i : ipv){
	        ItemPropertyValue.createItemPropertyValue(i);
	    }
	    JPA.em().persist(item);
	    return item;
	}
	
	public static Item findById(long id){
        return JPA.em().find(Item.class, id);
    }
}
