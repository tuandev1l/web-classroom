package exam.practice.phone;

import exam.practice.errorCatching.NotFoundPhoneException;
import exam.practice.errorCatching.PhoneExistException;
import exam.practice.phone.dtos.PhoneDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhoneService {
  private final PhoneRepository phoneRepository;

  @Autowired
  public PhoneService(PhoneRepository phoneRepository) {
    this.phoneRepository = phoneRepository;
  }

  public List<Phone> getAllPhones() {
    return this.phoneRepository.findAll();
  }

  public Phone getPhone(long id) {
    return this.phoneRepository.findById(id).orElseThrow(() -> new NotFoundPhoneException("There is no phone with this ID " + id));
  }

  public void createPhone(PhoneDto phoneDto) {
    List<Phone> phones =
        this.phoneRepository.findPhoneByNameAndBrand(phoneDto.getName(),
            phoneDto.getBrand());
    if (phones.size() > 0) {
      throw new PhoneExistException("This phone has already existed!");
    }

    Phone phone = new Phone();
    phone.setName(phoneDto.getName());
    phone.setBrand(phoneDto.getBrand());
    phone.setDate(phoneDto.getDate());
    phone.setSold(phoneDto.isSold());
    this.phoneRepository.save(phone);
  }

  public Phone updatePhone(long id, PhoneDto phoneDto) {
    Phone phone = this.getPhone(id);
    phone.setName(phoneDto.getName());
    phone.setBrand(phoneDto.getBrand());
    phone.setDate(phoneDto.getDate());
    phone.setSold(phoneDto.isSold());
    this.phoneRepository.save(phone);
    return phone;

  }

  public void deletePhone(long id) {
    this.phoneRepository.deleteById(id);
  }

  public List<Phone> filterPhone(String s) {
    return this.phoneRepository.filterPhone(s);
  }


}
