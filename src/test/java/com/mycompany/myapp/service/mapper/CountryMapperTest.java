package com.mycompany.myapp.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class CountryMapperTest {

    private CountryMapper countryMapper;

    @BeforeEach
    public void setUp() {
        countryMapper = new CountryMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(countryMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(countryMapper.fromId(null)).isNull();
    }
}
