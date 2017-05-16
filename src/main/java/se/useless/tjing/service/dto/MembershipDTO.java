package se.useless.tjing.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Membership entity.
 */
public class MembershipDTO implements Serializable {

    private Long id;

    private Long userId;

    private Long poolId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPoolId() {
        return poolId;
    }

    public void setPoolId(Long poolId) {
        this.poolId = poolId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MembershipDTO membershipDTO = (MembershipDTO) o;
        if(membershipDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), membershipDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MembershipDTO{" +
            "id=" + getId() +
            "}";
    }
}
