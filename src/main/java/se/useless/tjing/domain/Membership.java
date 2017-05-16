package se.useless.tjing.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Membership.
 */
@Entity
@Table(name = "membership")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Membership implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Pool pool;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public Membership user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Pool getPool() {
        return pool;
    }

    public Membership pool(Pool pool) {
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
        Membership membership = (Membership) o;
        if (membership.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), membership.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Membership{" +
            "id=" + getId() +
            "}";
    }
}
