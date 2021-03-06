package models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import play.db.jpa.JPA;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="listr_list_property")
public class ListProperty {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    
    @ManyToOne
    @JoinColumn(name="list_id")
    @JsonIgnore
    private ItemList list;
    
    private String propertyName;
    
    private boolean isRequired;
    
    private int orderValue;
    
    public ListProperty(){}
    public ListProperty(String propertyName, boolean isRequired, int orderValue){
        this.propertyName=propertyName;
        this.isRequired=isRequired;
        this.orderValue=orderValue;
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
    public ItemList getList() {
        return list;
    }
    public void setList(ItemList list) {
        this.list = list;
    }
    public String getPropertyName() {
        return propertyName;
    }
    public void setPropertyName(String propertyName) {
        this.propertyName = propertyName;
    }
    public boolean isRequired() {
        return isRequired;
    }
    public void setRequired(boolean isRequired) {
        this.isRequired = isRequired;
    }
    public int getOrderValue(){
        return orderValue;
    }
    /*
     * END GETTERS AND SETTERS
     */
    public static ListProperty createListProperty(ListProperty prop, ItemList list){
        prop.setList(list);
        JPA.em().persist(prop);
        return prop;
    }
}
