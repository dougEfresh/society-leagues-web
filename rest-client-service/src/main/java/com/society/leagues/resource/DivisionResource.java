package com.society.leagues.resource;

import com.society.leagues.client.api.DivisionClientApi;
import com.society.leagues.client.api.domain.division.Division;
import com.society.leagues.dao.DivisionDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@SuppressWarnings("unused")
public class DivisionResource extends ApiResource implements DivisionClientApi {

    @Autowired DivisionDao dao;

    @Override
    public Division get(Integer id) {
        return dao.get(id);
    }

    @Override
    public List<Division> list() {
        return dao.list();
    }
}
