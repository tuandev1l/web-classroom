package com.btl.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Cart {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn(name = "user_id")
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private User user;

  @OneToMany(mappedBy = "cart", fetch = FetchType.LAZY, cascade =
      CascadeType.REMOVE)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private List<Item> item;

  private float totalMoney;

  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;

}
