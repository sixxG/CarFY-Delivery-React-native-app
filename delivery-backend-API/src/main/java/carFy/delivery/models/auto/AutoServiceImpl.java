package carFy.delivery.models.auto;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AutoServiceImpl implements AutoService{

    AutoRepository repository;
    AutoMapper mapper;

    @Override
    public Page<AutoDto> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(mapper::toDto);
    }

    @Override
    public AutoDto findById(Long id) {
        return repository.findById(id).map(mapper::toDto).orElseThrow();
    }

    @Override
    public AutoDto save(AutoDto dto) throws Exception {
        if (dto != null || dto.getId() == null) {
            Auto savedAuto = repository.save(mapper.toEntity(dto));
            return mapper.toDto(savedAuto);
        }
        else {
            throw new Exception();
        }
    }

    @Override
    public AutoDto update(AutoDto dto) throws Exception {
        if (dto.getId() != null) {
            Auto savedAuto = repository.save(mapper.toEntity(dto));
            return mapper.toDto(savedAuto);
        } else {
            throw new Exception();
        }
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
