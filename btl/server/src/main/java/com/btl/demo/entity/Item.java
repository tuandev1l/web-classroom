package com.btl.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class Item {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "book_id")
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private Book book;
  private Long quantity;

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "order_id")
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private Order order;

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "cart_id")
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private Cart cart;

  @OneToOne
  @JoinColumn(name = "comment_id")
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private Comment comment;

  private Boolean isCommented = false;

  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;
}
