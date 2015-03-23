package Utils;

import play.Play;

import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;

import models.Account;
import models.User;

public class EmailService {
    public static void resetPassword(User user, String baseURL){
        System.out.println("Resetting password for: " + user.getUserName());
        //use getSalt method to generate random token for password rest
        String resetPasswordToken = PasswordService.getSalt();
        Account a= Account.findAccountByUserName(user.getUserName());
        a.setResetPasswordToken(resetPasswordToken);
        prepEmail(user, "Listr app password reset",
                "To reset your password, go to the following link:\n"
                + baseURL+"account/"+a.getId()+"?token="+a.getResetPasswordToken());
    }
    
    public static void sendUsername(User user){
        System.out.println("Sending username to: " + user.getEmail());
        prepEmail(user, "Listr app username request", 
                "You have requested your username\nyour username is: " + user.getUserName());
    }
    
    private static void prepEmail(User user, String subject, String body){
        String smtpHost = Play.application().configuration().getString("smtp.host");
        Integer smtpPort = Integer.parseInt(Play.application().configuration().getString("smtp.port"));
        String smtpUser = Play.application().configuration().getString("smtp.user");
        String smtpPassword = Play.application().configuration().getString("smtp.password");
        
        //SimpleEmail();
        Email email = new SimpleEmail();
        
        email.setHostName(smtpHost);
        if ( smtpPort != null && smtpPort > 1 && smtpPort < 65536 ) {
            email.setSmtpPort(smtpPort);
        }
        
        if (smtpUser!="" && smtpUser!=null ) {
            email.setAuthentication(smtpUser, smtpPassword);
        }
        
        try{
            email.setFrom(smtpUser);
            email.setSubject(subject);
            email.setMsg(body);
            email.addTo(user.getEmail());
            email.setStartTLSEnabled(true);
            email.send();
            System.out.println("mail sent");
        }catch (EmailException e){
            e.printStackTrace();
        }
        
        
        
    }
}
