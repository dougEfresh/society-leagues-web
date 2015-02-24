package com.society.test;

import com.society.leagues.Main;
import com.society.leagues.client.ApiFactory;
import com.society.leagues.client.api.MatchApi;
import com.society.leagues.client.api.domain.Role;
import com.society.leagues.client.api.admin.*;
import com.society.leagues.client.api.domain.*;
import com.society.leagues.client.api.domain.division.Division;
import com.society.leagues.client.api.domain.division.DivisionType;
import com.society.leagues.client.api.domain.division.LeagueType;
import com.society.leagues.dao.*;
import com.society.leagues.dao.DivisionDao;
import com.society.leagues.dao.SeasonDao;
import com.society.leagues.dao.TeamDao;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.*;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Main.class,TestBase.class})
public class MatchTest extends TestBase implements MatchAdminApi {
    @Autowired MatchDao api;
    @Autowired SeasonDao seasonApi;
    @Autowired DivisionDao divisionApi;
    @Autowired TeamDao teamApi;

    @Before
    public void setup() throws Exception {
        super.setup();
    }

    @Test
    public void testCreate() {
        Division division = new Division(DivisionType.EIGHT_BALL_THURSDAYS);
        division = divisionApi.create(division);
        assertNotNull(division);

        Season season = new Season(UUID.randomUUID().toString(),new Date(),20);
        season = seasonApi.create(season);
        assertNotNull(season);
        Team home = new Team(UUID.randomUUID().toString());
        Team away = new Team(UUID.randomUUID().toString());
        home = teamApi.create(home);
        assertNotNull(home);
        away = teamApi.create(away);
        assertNotNull(away);

        Match match = new Match();
        match.setDivision(division);
        match.setSeason(season);
        match.setHome(home);
        match.setAway(away);
        match.setMatchDate(new Date());
        match = api.create(match);
        assertNotNull(match);
        assertNotNull(match.getId());
    }

    @Override
    public Match create(Match match) {
        return api.create(match);
    }

    @Test
    public void testModify() throws Exception {
        Division division = new Division(DivisionType.EIGHT_BALL_THURSDAYS);
        division = divisionApi.create(division);
        assertNotNull(division);

        Season season = new Season(UUID.randomUUID().toString(),new Date(),20);
        season = seasonApi.create(season);
        assertNotNull(season);
        Team home = new Team(UUID.randomUUID().toString());
        Team away = new Team(UUID.randomUUID().toString());
        home = teamApi.create(home);
        assertNotNull(home);
        away = teamApi.create(away);
        assertNotNull(away);

        Match match = new Match();
        match.setDivision(division);
        match.setSeason(season);
        match.setHome(home);
        match.setAway(away);
        match.setMatchDate(new Date());
        match = api.create(match);
        assertNotNull(match);
        assertNotNull(match.getId());

        match.setHome(away);

        match = api.modify(match);
        assertNotNull(match);

        assertEquals(match.getHome().getId(),match.getAway().getId());
    }

    @Override
    public Match modify(Match match) {
        return api.modify(match);
    }
}
