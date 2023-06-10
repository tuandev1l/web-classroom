package com.btl.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String message;

  private double rate;

  @ManyToOne
  @JoinColumn(name = "user_id")
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private User user;

  @ManyToOne
  @JoinColumn(name = "book_id")
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private Book book;
  

  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;
}
