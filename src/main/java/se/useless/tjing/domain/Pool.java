package se.useless.tjing.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Pool.
 */
@Entity
@Table(name = "pool")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pool implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "pool")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Membership> memberships = new HashSet<>();

    @OneToMany(mappedBy = "pool")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Share> shares = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Pool name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Pool description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Membership> getMemberships() {
        return memberships;
    }

    public Pool memberships(Set<Membership> memberships) {
        this.memberships = memberships;
        return this;
    }

    public Pool addMemberships(Membership membership) {
        this.memberships.add(membership);
        membership.setPool(this);
        return this;
    }

    public Pool removeMemberships(Membership membership) {
        this.memberships.remove(membership);
        membership.setPool(null);
        return this;
    }

    public void setMemberships(Set<Membership> memberships) {
        this.memberships = memberships;
    }

    public Set<Share> getShares() {
        return shares;
    }

    public Pool shares(Set<Share> shares) {
        this.shares = shares;
        return this;
    }

    public Pool addShares(Share share) {
        this.shares.add(share);
        share.setPool(this);
        return this;
    }

    public Pool removeShares(Share share) {
        this.shares.remove(share);
        share.setPool(null);
        return this;
    }

    public void setShares(Set<Share> shares) {
        this.shares = shares;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Pool pool = (Pool) o;
        if (pool.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pool.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pool{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
