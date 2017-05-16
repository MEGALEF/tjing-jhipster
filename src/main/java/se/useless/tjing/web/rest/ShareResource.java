package se.useless.tjing.web.rest;

import com.codahale.metrics.annotation.Timed;
import se.useless.tjing.service.ShareService;
import se.useless.tjing.web.rest.util.HeaderUtil;
import se.useless.tjing.service.dto.ShareDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Share.
 */
@RestController
@RequestMapping("/api")
public class ShareResource {

    private final Logger log = LoggerFactory.getLogger(ShareResource.class);

    private static final String ENTITY_NAME = "share";
        
    private final ShareService shareService;

    public ShareResource(ShareService shareService) {
        this.shareService = shareService;
    }

    /**
     * POST  /shares : Create a new share.
     *
     * @param shareDTO the shareDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new shareDTO, or with status 400 (Bad Request) if the share has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/shares")
    @Timed
    public ResponseEntity<ShareDTO> createShare(@RequestBody ShareDTO shareDTO) throws URISyntaxException {
        log.debug("REST request to save Share : {}", shareDTO);
        if (shareDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new share cannot already have an ID")).body(null);
        }
        ShareDTO result = shareService.save(shareDTO);
        return ResponseEntity.created(new URI("/api/shares/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /shares : Updates an existing share.
     *
     * @param shareDTO the shareDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated shareDTO,
     * or with status 400 (Bad Request) if the shareDTO is not valid,
     * or with status 500 (Internal Server Error) if the shareDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/shares")
    @Timed
    public ResponseEntity<ShareDTO> updateShare(@RequestBody ShareDTO shareDTO) throws URISyntaxException {
        log.debug("REST request to update Share : {}", shareDTO);
        if (shareDTO.getId() == null) {
            return createShare(shareDTO);
        }
        ShareDTO result = shareService.save(shareDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, shareDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /shares : get all the shares.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of shares in body
     */
    @GetMapping("/shares")
    @Timed
    public List<ShareDTO> getAllShares() {
        log.debug("REST request to get all Shares");
        return shareService.findAll();
    }

    /**
     * GET  /shares/:id : get the "id" share.
     *
     * @param id the id of the shareDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shareDTO, or with status 404 (Not Found)
     */
    @GetMapping("/shares/{id}")
    @Timed
    public ResponseEntity<ShareDTO> getShare(@PathVariable Long id) {
        log.debug("REST request to get Share : {}", id);
        ShareDTO shareDTO = shareService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(shareDTO));
    }

    /**
     * DELETE  /shares/:id : delete the "id" share.
     *
     * @param id the id of the shareDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/shares/{id}")
    @Timed
    public ResponseEntity<Void> deleteShare(@PathVariable Long id) {
        log.debug("REST request to delete Share : {}", id);
        shareService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
