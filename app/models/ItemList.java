package models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import play.db.jpa.JPA;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by kyle on 1/21/15.
 */
@Entity
@Table(name="listr_list")
public class ItemList {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    
    private String name;

    @ManyToOne
    @JoinColumn(name="group_id")
    @JsonIgnore
    private Group group;

    @OneToMany(mappedBy="list", cascade = CascadeType.REMOVE)
    private Set<Item> items = new HashSet<>();
    
    @ManyToOne
    @JsonIgnore
    private User creater;
    
    @OneToMany(mappedBy="list", cascade = CascadeType.REMOVE)
    private Set<ListProperty> properties;
    
    public ItemList (){}
    public ItemList(String name){
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

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public Set<Item> getItems() {
		return items;
	}

	public void setItems(Set<Item> items) {
		this.items = items;
	}

	public User getCreater() {
		return creater;
	}

	public void setCreater(User creater) {
		this.creater = creater;
	}
	
	public void setProperties(Set<ListProperty> properties){
	    this.properties = properties;
	}
	
	public Set<ListProperty> getProperties(){
	    return properties;
	}
/*
 *END GETTERS AND SETTERS
 */
	public boolean containsItem(Item item){
	    return items.contains(item);
	}
	
	public static ItemList createList(User creater, Group group, ItemList list, Set<ListProperty> properties){
	    list.setCreater(creater);
	    list.setGroup(group);
	    JPA.em().persist(list);
	    for(ListProperty lp : properties){
	        ListProperty.createListProperty(lp, list);
	    }
	    list.setProperties(properties);
	    return list;
	}
	
	public static void deleteList(ItemList list){
	    JPA.em().remove(list);
	}
	public static ItemList findById(long id){
	    return JPA.em().find(ItemList.class, id);
	}
}
