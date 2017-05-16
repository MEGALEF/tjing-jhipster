package se.useless.tjing.service.mapper;

import se.useless.tjing.domain.*;
import se.useless.tjing.service.dto.ItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Item and its DTO ItemDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, })
public interface ItemMapper extends EntityMapper <ItemDTO, Item> {
    @Mapping(source = "owner.id", target = "ownerId")
    ItemDTO toDto(Item item); 
    @Mapping(source = "ownerId", target = "owner")
    @Mapping(target = "shares", ignore = true)
    Item toEntity(ItemDTO itemDTO); 
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Item fromId(Long id) {
        if (id == null) {
            return null;
        }
        Item item = new Item();
        item.setId(id);
        return item;
    }
}
