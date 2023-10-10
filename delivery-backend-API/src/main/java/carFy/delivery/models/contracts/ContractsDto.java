package carFy.delivery.models.contracts;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContractsDto {
    Long id;
    String fioManager;
    String additionalOptions;
    LocalDateTime dateStart;
    String typeReceipt;
    LocalDateTime dateEnd;
    String typeReturn;
    String status;
    String note;

    Long autoId;
    Long userId;
}
