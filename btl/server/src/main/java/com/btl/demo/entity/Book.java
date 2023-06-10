package com.btl.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
//@Audited
public class Book {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "booktype_id")
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private BookType type;

  private String title, author, description;
  private LocalDate published;
  private int numberOfPages;
  private float money;
  private String image;

  @JsonIgnore
  @OneToMany(mappedBy = "book", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private List<Comment> comment;

  @JsonIgnore
  @OneToMany(mappedBy = "book", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private List<Item> item;

  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;

}
