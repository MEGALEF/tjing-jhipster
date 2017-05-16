package se.useless.tjing.service.impl;

import se.useless.tjing.service.ShareService;
import se.useless.tjing.domain.Share;
import se.useless.tjing.repository.ShareRepository;
import se.useless.tjing.service.dto.ShareDTO;
import se.useless.tjing.service.mapper.ShareMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Share.
 */
@Service
@Transactional
public class ShareServiceImpl implements ShareService{

    private final Logger log = LoggerFactory.getLogger(ShareServiceImpl.class);
    
    private final ShareRepository shareRepository;

    private final ShareMapper shareMapper;

    public ShareServiceImpl(ShareRepository shareRepository, ShareMapper shareMapper) {
        this.shareRepository = shareRepository;
        this.shareMapper = shareMapper;
    }

    /**
     * Save a share.
     *
     * @param shareDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ShareDTO save(ShareDTO shareDTO) {
        log.debug("Request to save Share : {}", shareDTO);
        Share share = shareMapper.toEntity(shareDTO);
        share = shareRepository.save(share);
        ShareDTO result = shareMapper.toDto(share);
        return result;
    }

    /**
     *  Get all the shares.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ShareDTO> findAll() {
        log.debug("Request to get all Shares");
        List<ShareDTO> result = shareRepository.findAll().stream()
            .map(shareMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one share by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ShareDTO findOne(Long id) {
        log.debug("Request to get Share : {}", id);
        Share share = shareRepository.findOne(id);
        ShareDTO shareDTO = shareMapper.toDto(share);
        return shareDTO;
    }

    /**
     *  Delete the  share by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Share : {}", id);
        shareRepository.delete(id);
    }
}
