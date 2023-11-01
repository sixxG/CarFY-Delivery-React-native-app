package carFy.delivery.sevice.DeliveryMan;

import carFy.delivery.models.user.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DeliveryManService {
    List<UserDto> getAllDeliveryMans();
}
