package carFy.delivery.models.auto;

import org.springframework.stereotype.Component;

@Component
public class AutoMapper {
    AutoDto toDto(Auto entity) {
        if (entity == null) {
            return null;
        }
        AutoDto dto = new AutoDto();
        dto.setId(entity.getId());
        dto.setWIN_Number(entity.getWIN_Number());
        dto.setBrand(entity.getBrand());
        dto.setModel(entity.getModel());
        dto.setBody(entity.getBody());
        dto.setLevel(entity.getLevel());
        dto.setYear(entity.getYear());
        dto.setMileage(entity.getMileage());
        dto.setColor(entity.getColor());
        dto.setTransmission(entity.getTransmission());
        dto.setDrive(entity.getDrive());
        dto.setPower(entity.getPower());
        dto.setPrice(entity.getPrice());
        dto.setStatus(entity.getStatus());
        dto.setImage(entity.getImage());
        dto.setDescription(entity.getDescription());

        return dto;
    }
    Auto toEntity(AutoDto dto) {
        if (dto == null) {
            return null;
        }
        Auto entity = new Auto();
        entity.setId(dto.getId());
        entity.setWIN_Number(dto.getWIN_Number());
        entity.setBrand(dto.getBrand());
        entity.setModel(dto.getModel());
        entity.setBody(dto.getBody());
        entity.setLevel(dto.getLevel());
        entity.setYear(dto.getYear());
        entity.setMileage(dto.getMileage());
        entity.setColor(dto.getColor());
        entity.setTransmission(dto.getTransmission());
        entity.setDrive(dto.getDrive());
        entity.setPower(dto.getPower());
        entity.setPrice(dto.getPrice());
        entity.setStatus(dto.getStatus());
        entity.setImage(dto.getImage());
        entity.setDescription(dto.getDescription());

        return entity;
    }
}