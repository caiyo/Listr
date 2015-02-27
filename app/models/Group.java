package models;

import javax.persistence.*;

import play.db.jpa.JPA;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;

/**
 * Created by kyle on 1/21/15.
 */
@Entity
@Table(name="Listr_Group")
public class Group {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(mappedBy="group", cascade=CascadeType.REMOVE)
    private Set<ItemList> lists = new HashSet<>();

    @ManyToMany
    @JoinTable(name="listr_group_members", joinColumns=@JoinColumn(name="group_id"), 
    			inverseJoinColumns=@JoinColumn(name="user_id")) 
    private Set<User> members = new HashSet<>();
    
   @ManyToMany
   @JoinTable(name="listr_group_admin", joinColumns=@JoinColumn(name="group_id"), 
   				inverseJoinColumns=@JoinColumn(name="user_id"))  
   private Set<User> admins = new HashSet<>();

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
	
	public Set<ItemList> getLists() {
		return lists;
	}
	
	public void addList(ItemList list) {
		lists.add(list);
	}
	
	public Set<User> getMembers() {
		return members;
	}
	
	public void addMember(User member) {
		members.add(member);
	}
	public void removeMember(User member){
	    members.remove(member);
	}
	
	public Set<User> getAdmins() {
		return admins;
	}
	
	public boolean addAdmin(User admin) {
		return admins.add(admin);
	}
	
	public void removeAdmin(User admin) {
        admins.remove(admin);
    }
    
	/*
	 * STATIC METHODS
	 */

	public static Group createGroup(User user, Group group){
		group.addMember(user);
		group.addAdmin(user);
		user.addGroup(group);
		user.addAdminedGroup(group);
		JPA.em().persist(group);
		return group;
	}
	
	public static Group findById(long id){
	    return JPA.em().find(Group.class, id);
	}
}
