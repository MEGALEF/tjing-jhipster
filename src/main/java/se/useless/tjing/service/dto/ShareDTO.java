package se.useless.tjing.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Share entity.
 */
public class ShareDTO implements Serializable {

    private Long id;

    private Long itemId;

    private Long poolId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
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

        ShareDTO shareDTO = (ShareDTO) o;
        if(shareDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shareDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ShareDTO{" +
            "id=" + getId() +
            "}";
    }
}
