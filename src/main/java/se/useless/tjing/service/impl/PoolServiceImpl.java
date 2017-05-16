package se.useless.tjing.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.query.JpaQueryCreator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.jpa.impl.JPAQuery;

import se.useless.tjing.domain.Pool;
import se.useless.tjing.domain.QMembership;
import se.useless.tjing.domain.QPool;
import se.useless.tjing.domain.QUser;
import se.useless.tjing.repository.PoolRepository;
import se.useless.tjing.service.PoolService;
import se.useless.tjing.service.dto.PoolDTO;
import se.useless.tjing.service.mapper.PoolMapper;

/**
 * Service Implementation for managing Pool.
 */
@Service
@Transactional
public class PoolServiceImpl implements PoolService{
	
	@Autowired
	EntityManager em;

    private final Logger log = LoggerFactory.getLogger(PoolServiceImpl.class);
    
    private final PoolRepository poolRepository;

    private final PoolMapper poolMapper;

    public PoolServiceImpl(PoolRepository poolRepository, PoolMapper poolMapper) {
        this.poolRepository = poolRepository;
        this.poolMapper = poolMapper;
    }

    /**
     * Save a pool.
     *
     * @param poolDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PoolDTO save(PoolDTO poolDTO) {
        log.debug("Request to save Pool : {}", poolDTO);
        Pool pool = poolMapper.toEntity(poolDTO);
        pool = poolRepository.save(pool);
        PoolDTO result = poolMapper.toDto(pool);
        return result;
    }

    /**
     *  Get all the pools.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PoolDTO> findAll() {
        log.debug("Request to get all Pools");
        List<PoolDTO> result = poolRepository.findAll().stream()
            .map(poolMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one pool by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PoolDTO findOne(Long id) {
        log.debug("Request to get Pool : {}", id);
        Pool pool = poolRepository.findOne(id);
        PoolDTO poolDTO = poolMapper.toDto(pool);
        return poolDTO;
    }

    /**
     *  Delete the  pool by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pool : {}", id);
        poolRepository.delete(id);
    }
    
    @Override
    public List<PoolDTO> getAllPoolsForUser(Long userId){
    	QPool pool = QPool.pool;
    	QMembership membership = QMembership.membership;
    	QUser user = QUser.user;
    	
    	JPAQuery<Pool> query = new JPAQuery(em);
    	query.from(pool).join(pool.memberships, membership).join(membership.user, user).where(user.id.eq(userId));
    	
    	return poolMapper.toDto(query.fetch());
    }
}
