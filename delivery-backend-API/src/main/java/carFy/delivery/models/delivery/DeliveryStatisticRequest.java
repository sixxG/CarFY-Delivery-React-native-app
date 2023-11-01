package carFy.delivery.models.delivery;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.LocalDate;

@Data
@EqualsAndHashCode
@ToString
public class DeliveryStatisticRequest {
    Long deliveryId;
    LocalDate dateStart;
    LocalDate dateEnd;
}
