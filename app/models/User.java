package models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import play.db.jpa.JPA;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by kyle on 1/21/15.
 */
@Entity
@Table(name="Listr_user")
public class User {
    @Id
	private String userName;
	private String name;
	@ManyToMany (mappedBy="members")
	@JsonIgnore
	private Set<Group> groups = new HashSet<>();
	@ManyToMany (mappedBy="admins")
	@JsonIgnore
	private Set<Group> adminedGroups = new HashSet<>();

	public User(){}
	public User(String userName, String name){
	    this.userName=userName.toLowerCase();
	    this.name=name;
	}
	//GETTERS SETTERS
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Set<Group> getGroups(){
		return groups;
	}
	public void addGroup(Group group){
		adminedGroups.add(group);
	}
	public Set<Group> getAdminedGroups(){
        return groups;
    }
    public void addAdminedGroup(Group group){
        adminedGroups.add(group);
    }
	
	public boolean leaveGroup(Group groupToLeave){
	    boolean left = false;
	    if(groups.contains(groupToLeave)){
	        groups.remove(groupToLeave);
	        groupToLeave.removeMember(this);
	        left=true;
	        
	    }
	    //checks if is admin and removes if so
	    demoteFromAdmin(groupToLeave);
	    return left;
	}
	
	public boolean demoteFromAdmin(Group demotedGroup){
	    boolean demoted = false;
	    if(adminedGroups.contains(demotedGroup)){
            adminedGroups.remove(demotedGroup);
            demotedGroup.removeAdmin(this);
            demoted=true;
        }
	    return demoted;
	}
	
	//checks that user is admin of given group
	public boolean isAdmin(Group group){
	    return adminedGroups.contains(group);
	}
	public boolean isMember(Group group){
	    return groups.contains(group);
	}
/*ADMIN METHODS*/
	public boolean addUserToGroup(User userToAdd, Group group, boolean addToAdmin){
	    boolean added = false;
	    if(isAdmin(group)){
	        group.addMember(userToAdd);
	        added = true;
	        if (addToAdmin){ //if user being added to group shoud be admin of group as well
                promoteToGroupAdmin(userToAdd, group);
            }
	    }
	    return added;
	}
	public boolean promoteToGroupAdmin(User userToPromote, Group group){
	    boolean promoted = false;
	    if(isAdmin(group)){
	        promoted = group.addAdmin(userToPromote);
	        System.out.println(userToPromote.getName() + " has been made admin");
	    }
	    return promoted;
	}
	
	public boolean demoteFromGroupAdmin(User userToDemote, Group group){
	    boolean demoted = false;
	    if(isAdmin(group)){
	        demoted = userToDemote.demoteFromAdmin(group);
	    }
	    return demoted;
	}
	public boolean removeUserFromGroup (User userToRemove, Group group){
	    boolean removed = false;
	    if (isAdmin(group)){
	        removed = userToRemove.leaveGroup(group);
	        System.out.println(userToRemove.getName() + " has been removed");

	    }
	    return removed;
	}
	
/*END ADMIN METHODS*/
	
	
	//STATIC METHODS 
	public static User createUser(User user){
	    user.setUserName(user.getUserName().toLowerCase());
	    JPA.em().persist(user);
	    return user;
	}
	public static User findByUserName(String userName){
		userName = userName.toLowerCase();
		return JPA.em().find(User.class, userName);
	}
}
    