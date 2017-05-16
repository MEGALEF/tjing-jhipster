package se.useless.tjing.repository;

import se.useless.tjing.domain.Pool;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;

import java.util.List;

/**
 * Spring Data JPA repository for the Pool entity.
 */
@SuppressWarnings("unused")
public interface PoolRepository extends JpaRepository<Pool,Long>  {

}
