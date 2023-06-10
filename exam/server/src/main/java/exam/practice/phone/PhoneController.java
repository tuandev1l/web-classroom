package exam.practice.phone;

import exam.practice.phone.dtos.PhoneDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("phones")
public class PhoneController {
  private final PhoneService phoneService;

  @Autowired
  public PhoneController(PhoneService phoneService) {
    this.phoneService = phoneService;
  }

  @GetMapping("")
  public List<Phone> getAllPhone() {
    return this.phoneService.getAllPhones();
  }

  @GetMapping("/{id}")
  public Phone getPhone(@PathVariable long id) {
    return this.phoneService.getPhone(id);
  }

  @PostMapping("")
  public void createPhone(@Valid @RequestBody PhoneDto phoneDto) {
    this.phoneService.createPhone(phoneDto);
  }

  @PutMapping("/{id}")
  public Phone updatePhone(@PathVariable long id,
                           @Valid @RequestBody PhoneDto phoneDto) {
    return this.phoneService.updatePhone(id, phoneDto);
  }

  @DeleteMapping("/{id}")
  public void deletePhone(@PathVariable long id) {
    this.phoneService.deletePhone(id);
  }

  @GetMapping("/filter")
  public List<Phone> filterPhone(@RequestParam("search") String s) {
    System.out.println(s);
    return this.phoneService.filterPhone("%" + s + "%");
  }

}
