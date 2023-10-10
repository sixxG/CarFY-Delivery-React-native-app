package carFy.delivery.models.contracts;

import carFy.delivery.models.auto.Auto;
import carFy.delivery.models.auto.AutoDto;
import carFy.delivery.models.auto.AutoMapper;
import carFy.delivery.models.auto.AutoRepository;
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
public class ContractServiceImpl implements ContractService{

    ContractRepository repository;
    ContractMapper mapper;

    @Override
    public Page<ContractsDto> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(mapper::toDto);
    }

    @Override
    public ContractsDto findById(Long id) {
        return repository.findById(id).map(mapper::toDto).orElseThrow();
    }

    @Override
    public Page<ContractsDto> findByStatus(Status status, Pageable pageable) {
        return repository.findAllByStatus(status.getTitle(), pageable).map(mapper::toDto);
    }

    @Override
    public ContractsDto save(ContractsDto dto) throws Exception {
        if (dto != null || dto.getId() == null) {
            Contract savedContract = repository.save(mapper.toEntity(dto));
            return mapper.toDto(savedContract);
        }
        else {
            throw new Exception();
        }
    }

    @Override
    public ContractsDto update(ContractsDto dto) throws Exception {
        if (dto.getId() != null) {
            Contract savedContract = repository.save(mapper.toEntity(dto));
            return mapper.toDto(savedContract);
        } else {
            throw new Exception();
        }
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
