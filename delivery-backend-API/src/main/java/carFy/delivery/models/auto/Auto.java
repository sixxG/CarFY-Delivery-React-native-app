package carFy.delivery.models.auto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@ToString
@Builder
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cars")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Auto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String WIN_Number;
    String brand;
    String model;
    String body;
    String level;
    int year;
    int mileage;
    String color;
    String transmission;
    String drive;
    int power;
    int price;
    String status;
    String image;
    String description;
}
