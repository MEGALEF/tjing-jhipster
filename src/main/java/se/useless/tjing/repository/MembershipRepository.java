package se.useless.tjing.repository;

import se.useless.tjing.domain.Membership;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Membership entity.
 */
@SuppressWarnings("unused")
public interface MembershipRepository extends JpaRepository<Membership,Long> {

    @Query("select membership from Membership membership where membership.user.login = ?#{principal.username}")
    List<Membership> findByUserIsCurrentUser();

}
