package exam.practice.phone;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
public class Phone {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String brand;
  private Date date;
  private boolean isSold;

  public Phone(String name, String brand, Date date, boolean isSold) {
    this.name = name;
    this.brand = brand;
    this.date = date;
    this.isSold = isSold;
  }
}
