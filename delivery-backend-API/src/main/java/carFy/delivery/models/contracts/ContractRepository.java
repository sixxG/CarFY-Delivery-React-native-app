package carFy.delivery.models.contracts;

import carFy.delivery.models.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContractRepository extends JpaRepository<Contract, Long> {
    Page<Contract> findAllByStatus(String status, Pageable pageable);
    List<Contract> findAllByStatus(String status);

    List<Contract> findAllByStatusAndDeliveryMan(String status, User deliveryman);
}
