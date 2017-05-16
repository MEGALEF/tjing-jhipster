package se.useless.tjing.web.rest;

import se.useless.tjing.TjingApp;

import se.useless.tjing.domain.Share;
import se.useless.tjing.repository.ShareRepository;
import se.useless.tjing.service.ShareService;
import se.useless.tjing.service.dto.ShareDTO;
import se.useless.tjing.service.mapper.ShareMapper;
import se.useless.tjing.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ShareResource REST controller.
 *
 * @see ShareResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TjingApp.class)
public class ShareResourceIntTest {

    @Autowired
    private ShareRepository shareRepository;

    @Autowired
    private ShareMapper shareMapper;

    @Autowired
    private ShareService shareService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restShareMockMvc;

    private Share share;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ShareResource shareResource = new ShareResource(shareService);
        this.restShareMockMvc = MockMvcBuilders.standaloneSetup(shareResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Share createEntity(EntityManager em) {
        Share share = new Share();
        return share;
    }

    @Before
    public void initTest() {
        share = createEntity(em);
    }

    @Test
    @Transactional
    public void createShare() throws Exception {
        int databaseSizeBeforeCreate = shareRepository.findAll().size();

        // Create the Share
        ShareDTO shareDTO = shareMapper.toDto(share);
        restShareMockMvc.perform(post("/api/shares")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shareDTO)))
            .andExpect(status().isCreated());

        // Validate the Share in the database
        List<Share> shareList = shareRepository.findAll();
        assertThat(shareList).hasSize(databaseSizeBeforeCreate + 1);
        Share testShare = shareList.get(shareList.size() - 1);
    }

    @Test
    @Transactional
    public void createShareWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shareRepository.findAll().size();

        // Create the Share with an existing ID
        share.setId(1L);
        ShareDTO shareDTO = shareMapper.toDto(share);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShareMockMvc.perform(post("/api/shares")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shareDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Share> shareList = shareRepository.findAll();
        assertThat(shareList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllShares() throws Exception {
        // Initialize the database
        shareRepository.saveAndFlush(share);

        // Get all the shareList
        restShareMockMvc.perform(get("/api/shares?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(share.getId().intValue())));
    }

    @Test
    @Transactional
    public void getShare() throws Exception {
        // Initialize the database
        shareRepository.saveAndFlush(share);

        // Get the share
        restShareMockMvc.perform(get("/api/shares/{id}", share.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(share.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingShare() throws Exception {
        // Get the share
        restShareMockMvc.perform(get("/api/shares/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShare() throws Exception {
        // Initialize the database
        shareRepository.saveAndFlush(share);
        int databaseSizeBeforeUpdate = shareRepository.findAll().size();

        // Update the share
        Share updatedShare = shareRepository.findOne(share.getId());
        ShareDTO shareDTO = shareMapper.toDto(updatedShare);

        restShareMockMvc.perform(put("/api/shares")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shareDTO)))
            .andExpect(status().isOk());

        // Validate the Share in the database
        List<Share> shareList = shareRepository.findAll();
        assertThat(shareList).hasSize(databaseSizeBeforeUpdate);
        Share testShare = shareList.get(shareList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingShare() throws Exception {
        int databaseSizeBeforeUpdate = shareRepository.findAll().size();

        // Create the Share
        ShareDTO shareDTO = shareMapper.toDto(share);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restShareMockMvc.perform(put("/api/shares")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shareDTO)))
            .andExpect(status().isCreated());

        // Validate the Share in the database
        List<Share> shareList = shareRepository.findAll();
        assertThat(shareList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteShare() throws Exception {
        // Initialize the database
        shareRepository.saveAndFlush(share);
        int databaseSizeBeforeDelete = shareRepository.findAll().size();

        // Get the share
        restShareMockMvc.perform(delete("/api/shares/{id}", share.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Share> shareList = shareRepository.findAll();
        assertThat(shareList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Share.class);
        Share share1 = new Share();
        share1.setId(1L);
        Share share2 = new Share();
        share2.setId(share1.getId());
        assertThat(share1).isEqualTo(share2);
        share2.setId(2L);
        assertThat(share1).isNotEqualTo(share2);
        share1.setId(null);
        assertThat(share1).isNotEqualTo(share2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShareDTO.class);
        ShareDTO shareDTO1 = new ShareDTO();
        shareDTO1.setId(1L);
        ShareDTO shareDTO2 = new ShareDTO();
        assertThat(shareDTO1).isNotEqualTo(shareDTO2);
        shareDTO2.setId(shareDTO1.getId());
        assertThat(shareDTO1).isEqualTo(shareDTO2);
        shareDTO2.setId(2L);
        assertThat(shareDTO1).isNotEqualTo(shareDTO2);
        shareDTO1.setId(null);
        assertThat(shareDTO1).isNotEqualTo(shareDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(shareMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(shareMapper.fromId(null)).isNull();
    }
}
