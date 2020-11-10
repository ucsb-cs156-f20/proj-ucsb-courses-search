package com.ucsb.demonextjsspringtodoapp.repositories;

import com.ucsb.demonextjsspringtodoapp.entities.Admin;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends CrudRepository<Admin, Long> {
  public List<Admin> findByEmail(String email);
}
