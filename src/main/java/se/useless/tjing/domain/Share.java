package se.useless.tjing.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Share.
 */
@Entity
@Table(name = "share")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Share implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    private Item item;

    @ManyToOne
    private Pool pool;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Item getItem() {
        return item;
    }

    public Share item(Item item) {
        this.item = item;
        return this;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Pool getPool() {
        return pool;
    }

    public Share pool(Pool pool) {
        this.pool = pool;
        return this;
    }

    public void setPool(Pool pool) {
        this.pool = pool;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Share share = (Share) o;
        if (share.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), share.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Share{" +
            "id=" + getId() +
            "}";
    }
}
