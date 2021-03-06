package se.useless.tjing.repository;

import se.useless.tjing.domain.Item;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Item entity.
 */
@SuppressWarnings("unused")
public interface ItemRepository extends JpaRepository<Item,Long> {

    @Query("select item from Item item where item.owner.login = ?#{principal.username}")
    List<Item> findByOwnerIsCurrentUser();

}
