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
@Table(name="listr_item_property_value")
public class ItemPropertyValue {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    
    @ManyToOne
    @JoinColumn(name="listProperty_id")
    private ListProperty listProperty;
    @ManyToOne
    @JoinColumn(name="item_id")
    @JsonIgnore
    private Item item;
    private String value;
    
    public ItemPropertyValue (){}
    public ItemPropertyValue(String value){
        this.value=value;
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
    public ListProperty getListProperty() {
        return listProperty;
    }
    public void setListProperty(ListProperty listProperty) {
        this.listProperty = listProperty;
    }
    public Item getItem() {
        return item;
    }
    public void setItem(Item item) {
        this.item = item;
    }
    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }
    /*
     * END GETTERS AND SETTERS
     */
    public static ItemPropertyValue createItemPropertyValue(ItemPropertyValue ipv, Item item, ListProperty lp ){
        ipv.setItem(item);
        ipv.setListProperty(lp);
        JPA.em().persist(ipv);
        return ipv;
    }
}
