package carFy.delivery.models.contracts;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface ContractService {

    Map<String, List<ContractsDto>> getAllContractsToDelivery(Pageable pageable);
    Page<ContractsDto> findAll(Pageable pageable);

    ContractsDto findById(Long id);

    Page<ContractsDto> findByStatus(Status status, Pageable pageable);

    ContractsDto save(ContractsDto dto) throws Exception;

    ContractsDto update(ContractsDto dto) throws Exception;

    void delete(Long id);
}
