package se.useless.tjing.service;

import se.useless.tjing.service.dto.PoolDTO;
import java.util.List;

/**
 * Service Interface for managing Pool.
 */
public interface PoolService {

    /**
     * Save a pool.
     *
     * @param poolDTO the entity to save
     * @return the persisted entity
     */
    PoolDTO save(PoolDTO poolDTO);

    /**
     *  Get all the pools.
     *  
     *  @return the list of entities
     */
    List<PoolDTO> findAll();

    /**
     *  Get the "id" pool.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PoolDTO findOne(Long id);

    /**
     *  Delete the "id" pool.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
    
    List<PoolDTO> getAllPoolsForUser(Long userId);
}
