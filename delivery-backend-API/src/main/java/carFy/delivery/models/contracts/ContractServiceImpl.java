package carFy.delivery.models.contracts;

import carFy.delivery.models.user.User;
import carFy.delivery.models.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.Duration;
import java.time.LocalDateTime;
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
    UserRepository userRepository;
    ContractMapper mapper;

    @Override
    public Map<String, List<ContractsDto>> getAllContractsToDelivery(Pageable pageable) {
        Map<String, List<ContractsDto>> contractsForDeliverByDay = new TreeMap<>();
        List<ContractsDto> confirmedContracts = repository.findAllByStatus(Status.CONFIRMED.getTitle())
                .stream()
                .filter(contract -> !contract.getTypeReceipt().equals("Офис"))
                .filter(contract -> contract.getDeliveryMan() == null)
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

    @Override
    public void takeContractDelivery(Long contractId, Principal user) throws Exception {
        Contract contract = repository.findById(contractId).orElseThrow();
        User deliveryman = userRepository.findByUsername(user.getName()).orElseThrow();

        List<Contract> deliverymenContractsDelivery = repository.findAllByStatus(Status.CONFIRMED.getTitle())
                .stream()
                .filter(ctr -> ctr.getDeliveryMan() != null)
                .filter(ctr -> ctr.getDeliveryMan().equals(deliveryman))
                .filter(ctr -> ctr.getDateStart().toLocalDate().equals(contract.getDateStart().toLocalDate()))
                .filter(ctr -> (Duration.between(ctr.getDateStart(), contract.getDateStart()).toMinutes() <= 60))
                .toList();

        if (deliverymenContractsDelivery.size() > 0) {
            throw new Exception("Deliveryman already has delivery for this time!");
        }

        contract.setDeliveryMan(deliveryman);
        repository.save(contract);
    }

    @Override
    public void completeDelivery(Long contractId) throws Exception {
        Contract contract = repository.findById(contractId).orElseThrow();

        if (contract.getDateStart().isAfter(LocalDateTime.now())) {
            throw new Exception("Time rental is not now!");
        }

        contract.setStatus(Status.WORKING.getTitle());
        repository.save(contract);
    }
}
