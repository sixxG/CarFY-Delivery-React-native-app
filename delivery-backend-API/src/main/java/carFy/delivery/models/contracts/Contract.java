package carFy.delivery.models.contracts;

import carFy.delivery.models.auto.Auto;
import carFy.delivery.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@ToString
@Builder
@Entity
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "contracts")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String fioManager;
    String additionalOptions;
    LocalDateTime dateStart;
    String typeReceipt;
    LocalDateTime dateEnd;
    String typeReturn;
    double price;
    String status;
    String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    private Auto auto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private User user;
}
