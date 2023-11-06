package carFy.delivery.models.contracts;

import carFy.delivery.models.auto.Auto;
import carFy.delivery.models.auto.AutoRepository;
import carFy.delivery.models.user.User;
import carFy.delivery.models.user.UserDto;
import carFy.delivery.models.user.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ContractMapper {

    AutoRepository autoRepository;
    UserRepository userRepository;

    ContractsDto toDto(Contract entity) {
        if (entity == null) {
            return null;
        }
        ContractsDto dto = new ContractsDto();
        dto.setId(entity.getId());
        dto.setFioManager((entity.getFioManager()));
        dto.setAdditionalOptions(entity.getAdditionalOptions());
        dto.setDateStart(entity.getDateStart());
        dto.setDateEnd(entity.getDateEnd());
        dto.setTypeReceipt(entity.getTypeReceipt());
        dto.setTypeReturn(entity.getTypeReturn());
        dto.setStatus(entity.getStatus());
        dto.setNote(entity.getNote());
        dto.setPrice(entity.getPrice());
        dto.setDeliveryPrice(entity.getPriceDelivery());

        if (entity.getAuto() != null) {
            dto.setAutoId(entity.getAuto().getId());
        } else {
            return null;
        }

        if (entity.getUser() != null) {
            UserDto customer = new UserDto();
            customer.setId(entity.getUser().getId());
            customer.setFio(entity.getUser().getFio());
            customer.setBirthDate(entity.getUser().getBirthDate());
            customer.setAddress(entity.getUser().getAddress());
            customer.setPhone(entity.getUser().getPhone());
            customer.setDriverLicense(entity.getUser().getDriverLicense());
            customer.setImg(entity.getUser().getImg());
            dto.setCustomer(customer);
        } else {
            return null;
        }

        if (entity.getDeliveryMan() != null) {
            dto.setDeliveryManId(entity.getDeliveryMan().getId());
        } else {
            dto.setDeliveryManId(null);
        }

        return dto;
    }

    Contract toEntity(ContractsDto dto) {
        if (dto == null) {
            return null;
        }

        Contract entity = new Contract();
        entity.setId(dto.getId());
        entity.setFioManager((dto.getFioManager()));
        entity.setAdditionalOptions(dto.getAdditionalOptions());
        entity.setDateStart(dto.getDateStart());
        entity.setDateEnd(dto.getDateEnd());
        entity.setTypeReceipt(dto.getTypeReceipt());
        entity.setTypeReturn(dto.getTypeReturn());
        entity.setStatus(dto.getStatus());
        entity.setNote(dto.getNote());
        entity.setPrice(dto.getPrice());
        entity.setPriceDelivery(dto.getDeliveryPrice());

        if (dto.getAutoId() != null) {
            Auto auto = autoRepository.findById(dto.getAutoId()).orElse(null);
            entity.setAuto(auto);
        } else {
            return null;
        }

        if (dto.getCustomer() != null) {
            User user = userRepository.findById(dto.getCustomer().getId()).orElse(null);
            entity.setUser(user);
        } else {
            return null;
        }

        if (dto.getDeliveryManId() != null) {
            User deliveryMan = userRepository.findById(dto.getDeliveryManId()).orElse(null);
            entity.setDeliveryMan(deliveryMan);
        } else {
            entity.setDeliveryMan(null);
        }


        return entity;
    }
}
