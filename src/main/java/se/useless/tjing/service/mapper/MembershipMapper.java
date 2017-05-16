package se.useless.tjing.service.mapper;

import se.useless.tjing.domain.*;
import se.useless.tjing.service.dto.MembershipDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Membership and its DTO MembershipDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, PoolMapper.class, })
public interface MembershipMapper extends EntityMapper <MembershipDTO, Membership> {
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "pool.id", target = "poolId")
    MembershipDTO toDto(Membership membership); 
    @Mapping(source = "userId", target = "user")
    @Mapping(source = "poolId", target = "pool")
    Membership toEntity(MembershipDTO membershipDTO); 
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Membership fromId(Long id) {
        if (id == null) {
            return null;
        }
        Membership membership = new Membership();
        membership.setId(id);
        return membership;
    }
}
