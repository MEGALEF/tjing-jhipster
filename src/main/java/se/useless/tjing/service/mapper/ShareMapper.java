package se.useless.tjing.service.mapper;

import se.useless.tjing.domain.*;
import se.useless.tjing.service.dto.ShareDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Share and its DTO ShareDTO.
 */
@Mapper(componentModel = "spring", uses = {ItemMapper.class, PoolMapper.class, })
public interface ShareMapper extends EntityMapper <ShareDTO, Share> {
    @Mapping(source = "item.id", target = "itemId")
    @Mapping(source = "pool.id", target = "poolId")
    ShareDTO toDto(Share share); 
    @Mapping(source = "itemId", target = "item")
    @Mapping(source = "poolId", target = "pool")
    Share toEntity(ShareDTO shareDTO); 
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Share fromId(Long id) {
        if (id == null) {
            return null;
        }
        Share share = new Share();
        share.setId(id);
        return share;
    }
}
