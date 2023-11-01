package carFy.delivery.sevice.Delivery;

import carFy.delivery.models.contracts.Contract;
import carFy.delivery.models.contracts.ContractRepository;
import carFy.delivery.models.contracts.Status;
import carFy.delivery.models.delivery.DeliveryStatisticRequest;
import carFy.delivery.models.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeliveryServiceImpl implements DeliveryService {

    UserRepository userRepository;
    ContractRepository contractRepository;

    @Override
    public Map<String, Object> getStatisticByPeriodForDeliveryMan(DeliveryStatisticRequest request) {
        Map<String, Object> response = new HashMap<>();

        List<Contract> finishedContract = contractRepository.findAllByStatus(Status.COMPLETED.getTitle());
        List<Contract> completedContractsForDeliveryMan = finishedContract
                .stream()
                .filter(contract -> contract.getDeliveryMan().getId().equals(request.getDeliveryId()))
                .filter(contract -> contract.getDateStart().toLocalDate().isAfter(request.getDateStart()))
                .toList();

        double summaryPrice = 0d;
        for (Contract contract: completedContractsForDeliveryMan) {
            summaryPrice += contract.getPriceDelivery();
        }

        response.put("countContracts", completedContractsForDeliveryMan.size());
        response.put("summaryPriceDelivery", summaryPrice);

        return response;
    }
}
