package carFy.delivery.sevice.DeliveryMan;

import carFy.delivery.config.MyPasswordEncoder;
import carFy.delivery.models.contracts.Contract;
import carFy.delivery.models.contracts.ContractMapper;
import carFy.delivery.models.contracts.ContractRepository;
import carFy.delivery.models.contracts.ContractsDto;
import carFy.delivery.models.contracts.Status;
import carFy.delivery.models.delivery.ChangePasswordRequest;
import carFy.delivery.models.user.Role;
import carFy.delivery.models.user.User;
import carFy.delivery.models.user.UserDto;
import carFy.delivery.models.user.UserMapper;
import carFy.delivery.models.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeliveryManServiceImpl implements DeliveryManService {

    UserRepository userRepository;
    ContractRepository contractRepository;
    ContractMapper contractMapper;
    UserMapper mapper;
    MyPasswordEncoder myPasswordEncoder;

    @Override
    public List<UserDto> getAllDeliveryMans() {
        return userRepository.findAllByRole(Role.DELIVERY_MAN)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto getDeliveryManByLogin(String login) {
        User deliveryman = userRepository.findByUsername(login).orElseThrow();
        return  mapper.toDto(deliveryman);
    }

    @Override
    public UserDto updateDeliverymanData(UserDto dto) throws Exception {
        if (dto.getId() == null || dto.getId().equals(0L)) {
            throw new Exception("user with id " + dto.getId() + " not found!");
        }

        User deliveryman = userRepository.findById(dto.getId()).orElseThrow();
        deliveryman.setFio(dto.getFio());
        deliveryman.setPhone(dto.getPhone());
        userRepository.save(deliveryman);

        return mapper.toDto(deliveryman);
    }

    @Override
    public void changePassword(ChangePasswordRequest request, Principal user) throws Exception {
        User deliveryman = userRepository.findByUsername(user.getName()).orElseThrow();

        String oldPassword = String.valueOf(request.getOldPassword());
        String newPassword = String.valueOf(request.getNewPassword());

        boolean result = myPasswordEncoder.passwordEncoder().matches(oldPassword, deliveryman.getPassword());

        if (!result) {
            throw new Exception("old password is incorrect");
        } else {
            deliveryman.setPassword(myPasswordEncoder.passwordEncoder().encode(newPassword));
            userRepository.save(deliveryman);
        }
    }

    @Override
    public Map<String, List<ContractsDto>> getActiveDelivery(Principal user) {
        User deliveryman = userRepository.findByUsername(user.getName()).orElseThrow();
        List<Contract> activeContract = contractRepository.findAllByStatusAndDeliveryMan(Status.CONFIRMED.getTitle(), deliveryman);

        Map<String, List<ContractsDto>> contractsForDeliverByDay = new TreeMap<>();
        List<ContractsDto> confirmedContracts = contractRepository.findAllByStatusAndDeliveryMan(Status.CONFIRMED.getTitle(), deliveryman)
                .stream()
                .map(contractMapper::toDto)
                .toList();

        for (ContractsDto dto: confirmedContracts) {
            if (contractsForDeliverByDay.get(dto.getDateStart().toLocalDate().toString()) == null) {
                List<ContractsDto> contracts = new ArrayList<>();
                contracts.add(dto);
                contractsForDeliverByDay.put(dto.getDateStart().toLocalDate().toString(), contracts);
            } else {
                List<ContractsDto> contracts = contractsForDeliverByDay.get(dto.getDateStart().toLocalDate().toString());
                contracts.add(dto);
                contractsForDeliverByDay.put(dto.getDateStart().toLocalDate().toString(), contracts);
            }
        }

        return contractsForDeliverByDay;
    }
}
