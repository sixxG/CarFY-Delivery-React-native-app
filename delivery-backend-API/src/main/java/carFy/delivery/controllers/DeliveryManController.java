package carFy.delivery.controllers;

import carFy.delivery.sevice.DeliveryMan.DeliveryManService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api/v1/deliverymans")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeliveryManController {
    DeliveryManService service;

    @GetMapping()
    public ResponseEntity getAllDeliveryMans() {
        try {
            return ResponseEntity.ok().body(service.getAllDeliveryMans());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
