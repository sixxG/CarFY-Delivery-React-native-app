package carFy.delivery.models.auto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;

@Data
@ToString
@Builder
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AutoDto {
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
