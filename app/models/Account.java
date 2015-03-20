package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NoResultException;
import javax.persistence.Table;
import javax.persistence.Transient;

import play.data.validation.ValidationError;
import play.db.jpa.JPA;
import Utils.PasswordService;

@Entity
@Table(name="Listr_Account")
public class Account {
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private String password;
	@Transient
	private String confirmPassword;
	private String salt;
	@ManyToOne
	@JoinColumn(name="user_name")
	private User user;
	private String resetPasswordToken;
	
	public Account(){}
	public Account(String password, String confirmPassword, String username, String name, String email){
	    this.password=password;
	    this.confirmPassword = confirmPassword;
	    user = new User(username, name, email);
	}
	
	//Validates that new account has correct/necessary data
	public List<ValidationError> validate(){
		 List<ValidationError> errors = new ArrayList<ValidationError>();
		if(user!=null){
		    if (user.getUserName() == null || user.getUserName().trim().equals("")){
	            errors.add(new ValidationError("userNameNull", "Please enter a username"));
	        }
		    else if(User.findByUserName(user.getUserName()) !=null){
	             errors.add(new ValidationError("userNameTaken", "This username is already taken"));
	        }
	            
	        if (user.getName() == null || user.getName().trim().equals("")){
	            errors.add(new ValidationError("name", "Please enter your name"));
	        }
	        
	        if(user.getEmail() == null || user.getEmail().trim().equals("")){
	        	errors.add(new ValidationError("email", "Please enter an email address"));
	        }
	        else if(User.findByEmail(user.getEmail())!=null){
	        	errors.add(new ValidationError("emailTaken", "This email is already taken"));
	        }
		}
		if (password == null || password.trim().equals("")){
			errors.add(new ValidationError("password empty", "Password cannot be empty"));

		}
		else if (!password.equals(confirmPassword)){
            errors.add(new ValidationError("password", "Password and confirm password must match"));
            
        }
		System.out.println(errors.isEmpty());
		return errors.isEmpty() ? null : errors;
	}
	
	/*
	 * GETTERS AND SETTERS
	 */
	public long getId(){
		return id;
	}
	public void setId(long id){
		this.id=id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getConfirmPassword() {
		return confirmPassword;
	}
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	public String getSalt() {
		return salt;
	}
	public void setSalt(String salt) {
		this.salt = salt;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
	    
	}
	public String getResetPasswordToken(){
	    return resetPasswordToken;
	}
	public void setResetPasswordToken(String resetPasswordToken){
	    this.resetPasswordToken=resetPasswordToken;
	}


	/*
	 * Static Methods
	 */
	public static Account createAccount(Account account){
		String salt = PasswordService.getSalt();
		String password;
		
		password = PasswordService.hashPasword(account.getPassword(), salt);
		account.setPassword(password);
		account.setSalt(salt);
		
		User.createUser(account.getUser());
		JPA.em().persist(account);
		return account;
	}
	public static Account authenticate(String userName, String password){
	    System.out.println("authenticating");
		if(userName==null)
		    return null;
		Account account = Account.findAccountByUserName(userName);
		if (account != null){
			String hashPass = PasswordService.hashPasword(password, account.getSalt());
			Account queriedAccount;
			try{
			    queriedAccount = JPA.em().createQuery("from Account where user_name=? and password=?", Account.class).setParameter(1, userName).setParameter(2, hashPass).getSingleResult();
			}catch(NoResultException e){
	            queriedAccount = null;
	        }
	        return queriedAccount;
		}
		else
			return null;
	}
	
	public static Account findAccountByUserName(String userName){
	    Account queriedAccount;
	    try{
	        queriedAccount = JPA.em().createQuery("from Account where user_name=?", Account.class).setParameter(1, userName.toLowerCase()).getSingleResult();
	    }catch(NoResultException e){
	        queriedAccount = null;
	    }
	    return queriedAccount;
	}
}
