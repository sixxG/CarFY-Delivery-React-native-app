package carFy.delivery.controllers;

import carFy.delivery.models.contracts.ContractServiceImpl;
import carFy.delivery.models.contracts.Status;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController()
@RequestMapping("/api/v1/contracts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ContractController {
    ContractServiceImpl service;

    @GetMapping("/for-delivery")
    public ResponseEntity getContractsToDelivery(Pageable pageable) {
        try {
            return ResponseEntity.ok().body(service.getAllContractsToDelivery(pageable));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity findAll(Pageable pageable) {
        try {
            return ResponseEntity.ok().body(service.findAll(pageable));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity findById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok().body(service.findById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity findByStatus(@PathVariable String status, Pageable pageable) {
        try {
            return ResponseEntity.ok().body(service.findByStatus(Status.valueOf(status), pageable));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/take/{contractId}")
    public ResponseEntity takeContractDelivery(@PathVariable String contractId, Principal user) {
        try {
            service.takeContractDelivery(Long.valueOf(contractId), user);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/complete/{contractId}")
    public ResponseEntity completeDelivery(@PathVariable String contractId) {
        try {
            service.completeDelivery(Long.valueOf(contractId));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
