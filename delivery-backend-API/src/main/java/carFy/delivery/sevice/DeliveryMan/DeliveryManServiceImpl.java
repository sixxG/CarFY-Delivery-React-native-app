package carFy.delivery.sevice.DeliveryMan;

import carFy.delivery.models.user.Role;
import carFy.delivery.models.user.UserDto;
import carFy.delivery.models.user.UserMapper;
import carFy.delivery.models.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeliveryManServiceImpl implements DeliveryManService {

    UserRepository userRepository;
    UserMapper mapper;

    @Override
    public List<UserDto> getAllDeliveryMans() {
        return userRepository.findAllByRole(Role.DELIVERY_MAN)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }
}
