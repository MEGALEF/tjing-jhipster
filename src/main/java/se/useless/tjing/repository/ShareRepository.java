package se.useless.tjing.repository;

import se.useless.tjing.domain.Share;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Share entity.
 */
@SuppressWarnings("unused")
public interface ShareRepository extends JpaRepository<Share,Long> {

}
