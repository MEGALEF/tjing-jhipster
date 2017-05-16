package se.useless.tjing.service;

import se.useless.tjing.service.dto.ShareDTO;
import java.util.List;

/**
 * Service Interface for managing Share.
 */
public interface ShareService {

    /**
     * Save a share.
     *
     * @param shareDTO the entity to save
     * @return the persisted entity
     */
    ShareDTO save(ShareDTO shareDTO);

    /**
     *  Get all the shares.
     *  
     *  @return the list of entities
     */
    List<ShareDTO> findAll();

    /**
     *  Get the "id" share.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ShareDTO findOne(Long id);

    /**
     *  Delete the "id" share.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
