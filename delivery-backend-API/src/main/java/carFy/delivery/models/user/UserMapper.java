package carFy.delivery.models.user;

import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDto toDto(User entity) {
        if (entity == null) {
            return null;
        }
        UserDto dto = new UserDto();
        dto.setId(entity.getId());
        dto.setFio(entity.getFio());
        dto.setBirthDate(entity.getBirthDate());
        dto.setAddress(entity.getAddress());
        dto.setPhone(entity.getPhone());
        dto.setDriverLicense(entity.getDriverLicense());
        dto.setImg(entity.getImg());

        return dto;
    }
    public User toEntity(UserDto dto) {
        if (dto == null) {
            return null;
        }
        User entity = new User();
        entity.setId(dto.getId());
        entity.setFio(dto.getFio());
        entity.setBirthDate(dto.getBirthDate());
        entity.setAddress(dto.getAddress());
        entity.setPhone(dto.getPhone());
        entity.setDriverLicense(dto.getDriverLicense());
        entity.setImg(dto.getImg());

        return entity;
    }
}
