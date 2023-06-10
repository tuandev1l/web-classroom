package exam.practice.phone;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhoneRepository extends JpaRepository<Phone, Long> {

  @Query(nativeQuery = true, value = "select * from phone where lower(name) " +
      "like ?1")
  List<Phone> filterPhone(String s);

  @Query(nativeQuery = true, value = "select * from phone where name = ?1 and " +
      "brand = ?2")
  List<Phone> findPhoneByNameAndBrand(String name, String brand);

}
