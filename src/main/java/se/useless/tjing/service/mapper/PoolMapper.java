package se.useless.tjing.service.mapper;

import se.useless.tjing.domain.*;
import se.useless.tjing.service.dto.PoolDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Pool and its DTO PoolDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PoolMapper extends EntityMapper <PoolDTO, Pool> {
    
    @Mapping(target = "memberships", ignore = true)
    @Mapping(target = "shares", ignore = true)
    Pool toEntity(PoolDTO poolDTO); 
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Pool fromId(Long id) {
        if (id == null) {
            return null;
        }
        Pool pool = new Pool();
        pool.setId(id);
        return pool;
    }
}
