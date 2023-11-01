package carFy.delivery.sevice.Delivery;

import carFy.delivery.models.delivery.DeliveryStatisticRequest;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface DeliveryService {
    Map<String, Object> getStatisticByPeriodForDeliveryMan(DeliveryStatisticRequest request);
}
