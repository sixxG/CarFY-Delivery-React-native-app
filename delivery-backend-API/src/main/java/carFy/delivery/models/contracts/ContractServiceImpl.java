package carFy.delivery.models.contracts;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ContractServiceImpl implements ContractService{

    ContractRepository repository;
    ContractMapper mapper;

    @Override
    public Map<String, List<ContractsDto>> getAllContractsToDelivery(Pageable pageable) {
        Map<String, List<ContractsDto>> contractsForDeliverByDay = new TreeMap<>();
        List<ContractsDto> confirmedContracts = repository.findAllByStatus(Status.CONFIRMED.getTitle())
                .stream()
                .filter(contract -> !contract.getTypeReceipt().equals("Офис"))
                .map(mapper::toDto)
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
