package com.btl.demo.entity;

import com.btl.demo.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "orders")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private User user;

  @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private List<Item> item;

  private float totalMoney;

  private LocalDate expectDelivered;

  @Enumerated(EnumType.STRING)
  private Status status;

  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;
}
