package carFy.delivery.sevice.DeliveryMan;

import carFy.delivery.models.contracts.ContractsDto;
import carFy.delivery.models.delivery.ChangePasswordRequest;
import carFy.delivery.models.user.UserDto;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@Service
public interface DeliveryManService {
    List<UserDto> getAllDeliveryMans();

    UserDto getDeliveryManByLogin(String login);

    UserDto updateDeliverymanData(UserDto dto) throws Exception;

    void changePassword(ChangePasswordRequest request, Principal user) throws Exception;

    Map<String, List<ContractsDto>> getActiveDelivery(Principal user);
}
