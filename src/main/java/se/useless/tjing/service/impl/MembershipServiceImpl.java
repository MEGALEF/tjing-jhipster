package se.useless.tjing.service.impl;

import se.useless.tjing.service.MembershipService;
import se.useless.tjing.domain.Membership;
import se.useless.tjing.repository.MembershipRepository;
import se.useless.tjing.service.dto.MembershipDTO;
import se.useless.tjing.service.mapper.MembershipMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Membership.
 */
@Service
@Transactional
public class MembershipServiceImpl implements MembershipService{

    private final Logger log = LoggerFactory.getLogger(MembershipServiceImpl.class);
    
    private final MembershipRepository membershipRepository;

    private final MembershipMapper membershipMapper;

    public MembershipServiceImpl(MembershipRepository membershipRepository, MembershipMapper membershipMapper) {
        this.membershipRepository = membershipRepository;
        this.membershipMapper = membershipMapper;
    }

    /**
     * Save a membership.
     *
     * @param membershipDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MembershipDTO save(MembershipDTO membershipDTO) {
        log.debug("Request to save Membership : {}", membershipDTO);
        Membership membership = membershipMapper.toEntity(membershipDTO);
        membership = membershipRepository.save(membership);
        MembershipDTO result = membershipMapper.toDto(membership);
        return result;
    }

    /**
     *  Get all the memberships.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MembershipDTO> findAll() {
        log.debug("Request to get all Memberships");
        List<MembershipDTO> result = membershipRepository.findAll().stream()
            .map(membershipMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one membership by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MembershipDTO findOne(Long id) {
        log.debug("Request to get Membership : {}", id);
        Membership membership = membershipRepository.findOne(id);
        MembershipDTO membershipDTO = membershipMapper.toDto(membership);
        return membershipDTO;
    }

    /**
     *  Delete the  membership by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Membership : {}", id);
        membershipRepository.delete(id);
    }
}
