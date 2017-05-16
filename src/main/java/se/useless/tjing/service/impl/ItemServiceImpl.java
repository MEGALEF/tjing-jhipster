package se.useless.tjing.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.jpa.impl.JPAQuery;

import se.useless.tjing.domain.Item;
import se.useless.tjing.domain.QItem;
import se.useless.tjing.domain.QMembership;
import se.useless.tjing.domain.QPool;
import se.useless.tjing.domain.QShare;
import se.useless.tjing.domain.User;
import se.useless.tjing.repository.ItemRepository;
import se.useless.tjing.service.ItemService;
import se.useless.tjing.service.dto.ItemDTO;
import se.useless.tjing.service.mapper.ItemMapper;

/**
 * Service Implementation for managing Item.
 */
@Service
@Transactional
public class ItemServiceImpl implements ItemService{
	
	@Autowired
	EntityManager em;

    private final Logger log = LoggerFactory.getLogger(ItemServiceImpl.class);
    
    private final ItemRepository itemRepository;

    private final ItemMapper itemMapper;

    public ItemServiceImpl(ItemRepository itemRepository, ItemMapper itemMapper) {
        this.itemRepository = itemRepository;
        this.itemMapper = itemMapper;
    }

    /**
     * Save a item.
     *
     * @param itemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ItemDTO save(ItemDTO itemDTO) {
        log.debug("Request to save Item : {}", itemDTO);
        Item item = itemMapper.toEntity(itemDTO);
        item = itemRepository.save(item);
        ItemDTO result = itemMapper.toDto(item);
        return result;
    }

    /**
     *  Get all the items.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ItemDTO> findAll() {
        log.debug("Request to get all Items");
        List<ItemDTO> result = itemRepository.findAll().stream()
            .map(itemMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one item by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ItemDTO findOne(Long id) {
        log.debug("Request to get Item : {}", id);
        Item item = itemRepository.findOne(id);
        ItemDTO itemDTO = itemMapper.toDto(item);
        return itemDTO;
    }

    /**
     *  Delete the  item by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Item : {}", id);
        itemRepository.delete(id);
    }

	@Override
	public List<ItemDTO> getAvailableItems(Optional<User> currentUser) {
		QItem item = QItem.item;
		QShare share = QShare.share;
		QPool pool = QPool.pool;
		QMembership membership = QMembership.membership;
		
		//"Get all items shared with groups I am a member of"
		JPAQuery<Item> query = new JPAQuery(em);
		query.from(item).join(item.shares, share)
				.join(share.pool, pool)
				.join(pool.memberships, membership)
				.where(membership.user.id.eq(currentUser.get().getId()));
		List<Item> result = query.distinct().fetch();
		
		return itemMapper.toDto(result);	
	}

	@Override
	public List<ItemDTO> getUserItems(Long id) {
		QItem item = QItem.item;
		
		JPAQuery<Item> query = new JPAQuery(em);
		query.from(item).where(item.owner.id.eq(id));
		
		return itemMapper.toDto(query.fetch());
	}
}
